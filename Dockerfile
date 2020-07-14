FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/index.html
RUN rm -rf /usr/share/nginx/html/50x.html

COPY source/app /usr/share/nginx/html/app
COPY source/node_modules /usr/share/nginx/html/node_modules
COPY server/nginx.conf /etc/nginx/nginx.conf
COPY server/default.conf /etc/nginx/conf.d/default.conf
