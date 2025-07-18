FROM node:18-alpine

# instalamos python que no viene incluido en la imagen alpine
RUN apk add --no-cache python3 py3-pip
# instalamos la biblioteca requests de python
RUN apk add --no-cache py3-requests

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "backend/app.js"]