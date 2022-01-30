
#stage 1
FROM node:14 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

EXPOSE 8080
CMD ["npm", "run", "serve"]

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]
