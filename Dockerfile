FROM mcr.microsoft.com/playwright:v1.40.0-jammy
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
WORKDIR /usr/app/src
CMD ["node", "index.js"]