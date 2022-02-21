FROM nginx
COPY ./certificate/fullchain.pem /etc/nginx/fullchain.pem
COPY ./certificate/privkey.pem /etc/nginx/privkey.pem
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
