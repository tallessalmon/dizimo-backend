import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import sharp from 'sharp';
import fs from 'fs';
import { MessageMedia } from 'whatsapp-web.js';
import axios from 'axios';

@Injectable()
export class TasksService {
  constructor(
    @Inject('WHATSAPP_CLIENT') private readonly client: any,
    private prisma: PrismaService) { }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleInterval() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const results: any = await this.prisma.$queryRaw`
      SELECT * FROM \`Tithers\`
      WHERE EXTRACT(MONTH FROM \`birthday\`) = ${month}
      AND EXTRACT(DAY FROM \`birthday\`) = ${day}
    `;

    for (const tither of results) {
      const firstName = tither.fullName.split(" ")[0];
      const svgBuffer = fs.readFileSync('./public/congratulacoes.svg');
      const imgBuffer = Buffer.from(svgBuffer.toString().replace('%NOME%', firstName));

      try {
        const imagePath = `${firstName}.png`;

        await sharp(imgBuffer)
          .png()
          .toFile(imagePath);

        const chatId = this.formatPhoneNumber(tither.phone);
        await this.sendMessage(chatId, imagePath, tither.phone, firstName);

        fs.unlinkSync(imagePath);
        console.log(`Imagem ${imagePath} enviada com sucesso para ${tither.phone}`);
      } catch (err) {
        console.error(`Erro ao gerar ou enviar a imagem para ${tither.fullName}: `, err);
      }
    }
  }

  private async sendMessage(chatId: string, imagePath: string, phone: string, firstName: string) {
    const message = `Olá *${firstName.charAt(0) + firstName.toLocaleLowerCase().slice(1)}*,
    \nNós da Páróquia Santa Rosa de Lima, estamos passando aqui para lhe desejar um feliz aniversário, e que Deus possa sempre estar iluminando sua vida com muitas bençãos e felicidades 🙏🏼🎂`;
    const image = fs.readFileSync(imagePath);
    const media = new MessageMedia('image/png', image.toString('base64'), imagePath);

    try {
      const chat = await this.client.getChatById(chatId);

      if (chat) {
        await chat.sendMessage(media, { caption: message });
        console.log(`Mensagem enviada para ${phone}`);
      } else {
        console.log(`Chat não encontrado para ${phone}`);
      }
    } catch (err) {
      console.error(`Erro ao enviar mensagem para ${phone}: `, err);
    }
  }

  async getInformationId(id) {
    return await this.prisma.informations.findUnique({
      where: {
        id: Number(id) 
      }, include :{
        user: true,
      }
    })
  }

  async sendCustomMessage(data: { image: string, message: string, group: string[] }) {
    const list = await this.prisma.tithers.findMany({
      where: {
        community: {
          in: data.group
        },
      }
    })

  

    await this.saveMessage(data)

    const imageBuffer = await this.getImageBuffer(`https://images-psrl.s3.amazonaws.com/${data.image}`)

    list.map(async (tither) => {
      const chatId = this.formatPhoneNumber(tither.phone);
      const media = new MessageMedia(`image/${data.image
        .split(".")
        .pop()}`, imageBuffer.toString('base64'), `https://images-psrl.s3.amazonaws.com/${data.image}`);
      try {
        const chat = await this.client.getChatById(chatId);
        const firstName = tither.fullName.split(" ")[0];

        if (chat) {
          await chat.sendMessage(media, { caption: data.message.replace('%nome%', `*${firstName.charAt(0) + firstName.toLocaleLowerCase().slice(1)}*`) });
          console.log(`Mensagem enviada para ${tither.phone}`);
        } else {
          console.log(`Chat não encontrado para ${tither.phone}`);
        }
      } catch (err) {
        console.error(`Erro ao enviar mensagem para ${tither.phone}: `, err);
      }
    })
  }

  async getInformation() {
    return this.prisma.informations.findMany({})
  }

  private formatPhoneNumber(phone: string): string {
    const cleanedPhone = phone.replace(/\s+/g, '').replace(/\D/g, '');

    if (cleanedPhone.startsWith('55')) {
      return `${cleanedPhone}@c.us`;
    }
    const ddd = cleanedPhone.slice(0, 2);
    let number = cleanedPhone.slice(2);

    if (number.length === 9 && number.startsWith('9')) {
      number = number.slice(1);
    }

    // Retorna o número no formato internacional
    return `55${ddd}${number}@c.us`;
  }

  private async getImageBuffer(url: string): Promise<Buffer> {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(response.data, 'binary');
  }

  private async saveMessage(data: any) {
    return this.prisma.informations.create({
      data: {
        abrangence: JSON.stringify(data.group),
        message: data.message,
        image: data.image,
        user_id: data.user_id
      }
    })
  }

}
