# Usa uma imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código da aplicação
COPY . .

# Expõe a porta 4200 para o Angular
EXPOSE 4200

# Comando para rodar a aplicação Angular com npx ng serve, acessível externamente
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
