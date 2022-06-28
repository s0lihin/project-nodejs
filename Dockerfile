FROM node:17-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY .env /app
RUN npm install
COPY . /app
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "build"]
#RUN npm run build

# Stage 2
#FROM nginx:1.17.1-alpine
#EXPOSE 80
#COPY --from=build-step /app/build /usr/share/nginx/html
