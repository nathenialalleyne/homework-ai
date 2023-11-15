import queue from "@/utils/queue-config";
import BeeQueue from "bee-queue";
import uploadFile from "@/server/gcp/upload-file"
import { NextApiRequest} from "next"
import splitPDF from "@/server/text-manipulation/split-pdf"
import {PDFDocument} from 'pdf-lib';
import fs from 'fs';
import { RecordMetadata } from '@pinecone-database/pinecone';
import createFileInGCPStorage from "@/server/gcp/create-file";
import chunkText from "@/server/text-manipulation/chunk-text";
import { embedFiles } from "@/utils/openai";
import { searchEmbeddings, upsertEmbedding } from "@/server/embeddings/pinecone-functions";
import { embedPrompt } from "@/server/embeddings/embed-prompt";
import combineDocs from "@/server/text-manipulation/combine-docs";
import { Embedding } from "openai/resources";
import promptAssignment from "@/server/gpt/prompt-assignment";
import { databaseRouter } from "@/server/api/routers/database-operations";
import { db } from "@/server/db";
import { getAuth } from '@clerk/nextjs/server';



export default process