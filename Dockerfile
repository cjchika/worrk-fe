FROM node:18-alpine AS build 

WORKDIR /app 

COPY package.json ./ 

RUN yarn 

COPY . . 

RUN yarn build:prod 

FROM nginx:alpine 

RUN rm -rf /usr/share/nginx/html/* 

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80 

CMD [ "nginx", "-g", "daemon off;" ]