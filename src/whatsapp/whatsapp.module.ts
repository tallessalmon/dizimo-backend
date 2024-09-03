import { Module } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

@Module({
  providers: [{
    provide: 'WHATSAPP_CLIENT',
    useFactory: async () => {
      const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      });
      client.on('qr', qr => {
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
export class WhatsappModule { }
