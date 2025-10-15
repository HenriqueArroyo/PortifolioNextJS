# Etapa de build
FROM node:18-alpine AS builder
WORKDIR /app

# Copia apenas package.json e lock primeiro
COPY package*.json ./

# Instala dependências DENTRO do container
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera o build
RUN npm run build

# Etapa de produção
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "start"]
