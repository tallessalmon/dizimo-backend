import { Module } from '@nestjs/common'; 
import { Client, LocalAuth } from 'whatsapp-web.js'; 
import qrcode from 'qrcode-terminal'; 
import chromium from'chrome-aws-lambda';

@Module({
  providers: [{ provide: 'WHATSAPP_CLIENT', useFactory: async () => { 
      const client = new Client({ 
        authStrategy: new LocalAuth(), 
        puppeteer: { 
          args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'], 
          executablePath: await chromium.executablePath, 
          headless: true,
        },
      });
      client.on('qr', qr => { qrcode.generate(qr, { small: true });
      });
      client.on('ready', () => { console.log('Client is ready!');
      });
      await client.initialize(); return client;
    }
  }],
  exports: ['WHATSAPP_CLIENT'],
})
export class WhatsappModule { }