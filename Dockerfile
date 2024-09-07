# Use uma imagem base do Node.js
FROM public.ecr.aws/lambda/nodejs:18

ENV DATABASE_URL=mysql://root:root@172.17.0.4:3306/psrl
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Instale dependências
RUN yum -y install \
  libXcomposite \
  libXcursor \
  libXdamage \
  libXrandr \
  libXScrnSaver \
  libXtst \
  pango \
  alsa-lib \
  atk \
  cups-libs \
  gtk3 \
  hicolor-icon-theme \
  nss \
  xorg-x11-fonts-Type1 \
  xorg-x11-fonts-100dpi \
  xorg-x11-fonts-75dpi

# Copie os arquivos da aplicação para o container
COPY . /app
COPY target/* ${LAMBDA_TASK_ROOT}
WORKDIR /app

# Instale as dependências da aplicação
RUN npm install
RUN npm run build

# Comando para iniciar a aplicação
CMD ["npm", "run start:prod"]
