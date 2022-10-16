FROM node:alpine as builder
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY ./public ./public
COPY ./src ./src
COPY ./tsconfig.json .
RUN npm run build

FROM nginx
EXPOSE 3000
ARG CLIENT_ID
ENV CLIENT_ID $CLIENT_ID
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html