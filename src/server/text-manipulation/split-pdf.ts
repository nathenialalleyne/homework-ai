import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import uploadFile from '../gcp/upload-file';
import createFileGCPStorage from '../gcp/create-file';
import { randomUUID } from 'crypto';
import chunkText from './chunk-text';
import { embedFiles } from '@/utils/openai';
import { pinecone } from '@/utils/pinecone';
import {upsertEmbedding} from '../embeddings/pinecone-functions'
import { embedPrompt } from '../embeddings/embed-prompt';
import downloadFile from '../gcp/get-file';
import deleteFile from '../gcp/delete-gcps-files';
import OCRFileContent from '../gcp/ocr-file-content';

export default async function splitPDF(inputPDF: Buffer): Promise<{fileName: string, fullDocumentText: string, randomID: string} | undefined> {
    const pagesPerSection = 5;
    const randomID = Math.random().toString(36).substring(7);
    try {
        const pdfDoc = await PDFDocument.load(inputPDF);
        const totalPages = pdfDoc.getPageCount();
        const numSections = Math.ceil(totalPages / pagesPerSection);

        const sectionPromises: Array<{ buffer: Buffer, sectionName: string }> = [];

        for (let sectionIndex = 0; sectionIndex < numSections; sectionIndex++) {
            const startPage = sectionIndex * pagesPerSection + 1;
            const endPage = Math.min((sectionIndex + 1) * pagesPerSection, totalPages);

            const sectionPDF = await PDFDocument.create();

            for (let pageIndex = startPage - 1; pageIndex < endPage; pageIndex++) {
                const [copiedPage] = await sectionPDF.copyPages(pdfDoc, [pageIndex]);
                sectionPDF.addPage(copiedPage);
            }

            const sectionPDFBytes = await sectionPDF.save();

            const sectionFileName = `${randomID}_${sectionIndex}.pdf`;

            sectionPromises.push({buffer: Buffer.from(sectionPDFBytes), sectionName: sectionFileName});
        }

        console.log(sectionPromises)

        const runConcurrently = async () => {
            const promise = await Promise.all(sectionPromises.map(async (obj: { buffer: Buffer, sectionName: string }) => {
                await createFileGCPStorage('pdf-source-storage-bucket', obj.sectionName, obj.buffer);
                const fileContent = await OCRFileContent(`gs://pdf-source-storage-bucket/${obj.sectionName}`, obj.sectionName, randomUUID(), 'application/pdf');
                await deleteFile(obj.sectionName, 'pdf-source-storage-bucket');

                return fileContent;
            }));

            return promise 
        };

        const files = await runConcurrently();

        console.log('finished running concurrently')


        const fullDocumentText = joinText(files as string[])
        console.log(fullDocumentText)
        const documentID = randomUUID()
        console.log(documentID)
        const fileName = `${documentID}.txt`
        console.log(fileName)


        await createFileGCPStorage('pdf-source-storage-bucket', fileName, fullDocumentText);

        return {fileName: fileName, fullDocumentText: fullDocumentText, randomID: randomID}
    } catch (error) {
        console.error(`Error splitting PDF: ${error}`, error);
    }
}

function joinText(texts: string[]) {
    const separateArray = (array: string[]) => {
        const newArray = [];
        for (let p in array) {
            newArray.push(JSON.parse(array?.[p]!));
        }
        return newArray;
    };

    const parsedArray = separateArray(texts);

    const fullText = parsedArray.map((item) => {
        if (item?.responses && item.responses[0]?.fullTextAnnotation) {
            return item.responses[0].fullTextAnnotation.text.replace(/\n/g, ' ');
        }
        
        return '';
    });

    console.log(fullText);

    const joined = fullText.join(' ');

    return joined;
}
