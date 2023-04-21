FROM nginx:stable-alpine3.17-slim
COPY dist/v-console /usr/share/nginx/html
