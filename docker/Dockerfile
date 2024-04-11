FROM node:18-alpine3.19 as builder
ARG http_proxy
ARG https_proxy

WORKDIR /apps

COPY package.json .
COPY package-lock.json .
RUN yarn install

COPY . .
RUN yarn run build

# ===========================================================
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN apk add --no-cache bash

COPY --from=builder /apps/build /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
