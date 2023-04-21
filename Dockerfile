FROM nginx:stable-alpine3.17-slim
COPY dist/v-console /usr/share/nginx/html
COPY ngnix-angular.conf /etc/nginx/conf.d/