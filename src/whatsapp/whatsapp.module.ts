import { Module } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import chromium from 'chrome-aws-lambda';

@Module({
  providers: [{
    provide: 'WHATSAPP_CLIENT',
    useFactory: async () => {
      const executablePath = await chromium.executablePath || '/usr/bin/google-chrome-stable';

      const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: executablePath,
          headless: chromium.headless,
        }
      });

      client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
      });

      client.on('ready', () => {
        console.log('Client is ready!');
      });

      await client.initialize();
      return client;
    }
  }],
  exports: ['WHATSAPP_CLIENT'],
})
export class WhatsappModule {}
