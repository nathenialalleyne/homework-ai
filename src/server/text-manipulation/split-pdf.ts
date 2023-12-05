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

        console.log('running')
        for (let sectionIndex = 0; sectionIndex < numSections; sectionIndex++) {
            console.log('running ' + sectionIndex + ' times')
            const startPage = sectionIndex * pagesPerSection + 1;
            const endPage = Math.min((sectionIndex + 1) * pagesPerSection, totalPages);

            const sectionPDF = await PDFDocument.create();

            for (let pageIndex = startPage - 1; pageIndex < endPage; pageIndex++) {
                const [copiedPage] = await sectionPDF.copyPages(pdfDoc, [pageIndex]);
                sectionPDF.addPage(copiedPage);
            }

            const sectionPDFBytes = await sectionPDF.save();

            const sectionFileName = `${randomID}_${sectionIndex}.pdf`;

            console.log(sectionPDFBytes)
            sectionPromises.push({buffer: Buffer.from(sectionPDFBytes), sectionName: sectionFileName});
        }


        const runConcurrently = async () => {
            console.log('running concurrently')
            const promise = await Promise.all(sectionPromises.map(async (obj: { buffer: Buffer, sectionName: string }) => {
                await createFileGCPStorage('pdf-source-storage-bucket', obj.sectionName, obj.buffer);
                const fileContent = await OCRFileContent(`gs://pdf-source-storage-bucket/${obj.sectionName}`, obj.sectionName, randomUUID(), 'application/pdf');
                await deleteFile(obj.sectionName, 'pdf-source-storage-bucket');
                return fileContent;
            }));

            return promise 
        };

        const files = await runConcurrently();



        const fullDocumentText = joinText(files as string[])
        const documentID = randomUUID()
        const fileName = `${documentID}.txt`

        console.log('fullDocumentText: ', fullDocumentText)
        console.log('done')

        return {fileName: fileName, fullDocumentText: fullDocumentText, randomID: randomID}
    } catch (error) {
        console.error(`Error splitting PDF: ${error}`, error);
    }
}

function joinText(texts: string[]) {
    const seperateArray = (array: any[]) => {
        const newArray = []
        for (let p in array) {
            newArray.push(JSON.parse(array[p]))
        }
        return newArray
    }

    const parsedArray = seperateArray(texts)

    const fullText = parsedArray.map((item) => {
        return item.responses[0].fullTextAnnotation.text.replace(/\n/g, ' ');
    })

    const joined = fullText.join(' ')
    
    return joined
}