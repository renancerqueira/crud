# Usa a imagem oficial do Node.js como base (alpine para uma imagem menor)
FROM node:18-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o container
COPY . .

# Compila o código TypeScript para JavaScript
RUN npm run build

# Cria uma nova imagem para o ambiente de produção (imagem mais enxuta)
FROM node:18-alpine AS production

# Define o diretório de trabalho para a nova imagem
WORKDIR /app

# Copia as dependências do build anterior (node_modules) e o diretório dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Define a variável de ambiente para a produção
ENV NODE_ENV=production

# Expõe a porta 3000 para a aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/main"]
