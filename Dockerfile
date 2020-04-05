FROM node:10 AS builder
WORKDIR /app
COPY ./library ../library
RUN apt-get update
WORKDIR /tme-api
COPY ./tme-api/package.json ./
RUN npm install --no-optional
COPY ./tme-api ./
RUN npm run build

FROM node:10.13-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --from=builder /tme-api ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
