import { Module } from '@nestjs/common';
import { Client, RemoteAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import chromium from 'chrome-aws-lambda';
import { AwsS3Store } from 'wwebjs-aws-s3';
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const putObjectCommand = PutObjectCommand;
const headObjectCommand = HeadObjectCommand;
const getObjectCommand = GetObjectCommand;
const deleteObjectCommand = DeleteObjectCommand;

const store = new AwsS3Store({
  bucketName: process.env.AWS_BUCKET_NAME,
  remoteDataPath: 'whatsapp/store/',
  s3Client: s3,
  putObjectCommand,
  headObjectCommand,
  getObjectCommand,
  deleteObjectCommand
});

@Module({
  providers: [{
    provide: 'WHATSAPP_CLIENT', useFactory: async () => {
      const client = new Client({
        authStrategy: new RemoteAuth({
          clientId: 'session',
          dataPath: '.wwebjs_auth',
          store: store,
          backupSyncIntervalMs: 600000
        }),
        puppeteer: {
          args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
          executablePath: await chromium.executablePath,
          headless: true,
        },
      });
      client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
      });
      client.on('ready', () => {
        console.log('Client is ready!');
      });
      await client.initialize(); return client;
    }
  }],
  exports: ['WHATSAPP_CLIENT'],
})
export class WhatsappModule { }