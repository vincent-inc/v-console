FROM nginx:stable-alpine3.17-slim
COPY dist/v-console /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80