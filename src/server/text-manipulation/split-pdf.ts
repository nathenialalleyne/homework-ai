import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import { uploadSplitFile } from '../gcp/upload-file';
import createFileGCPStorage from '../gcp/create-file';
import { randomUUID } from 'crypto';
import chunkText from './chunk-text';
import { embedFiles } from '@/utils/openai';
import { pinecone } from '@/utils/pinecone';
import {upsertEmbedding} from '../embeddings/pinecone-functions'
import { embedPrompt } from '../embeddings/embed-prompt';

export default async function splitPDF(inputPDFPath: string): Promise<{fileName: string, fullDocumentText: string, randomID: string} | undefined> {
    const pagesPerSection = 5;
    const randomID = Math.random().toString(36).substring(7);
    try {
        const inputPDFBuffer = await fs.promises.readFile(inputPDFPath);
        const pdfDoc = await PDFDocument.load(inputPDFBuffer);
        const totalPages = pdfDoc.getPageCount();
        const numSections = Math.ceil(totalPages / pagesPerSection);

        const sectionPromises = [];

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
            sectionPromises.push(uploadSplitFile(Buffer.from(sectionPDFBytes), sectionFileName));
        }

        // Wait for all section uploads to complete before returning
        const files = await Promise.all(sectionPromises);

        const fullDocumentText = joinText(files as string[])
        const documentID = randomUUID()
        const fileName = `${documentID}.txt`


        console.log('fullDocumentText', fullDocumentText)
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