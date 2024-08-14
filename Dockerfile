FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install -y

RUN npm run prisma

RUN npm run build

COPY . .

ENV TZ Asia/Bangkok

EXPOSE 8000


CMD ["node", "dist/main.js"]
