FROM node:alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install node-sass@latest
COPY . .
RUN npm run build

FROM nginx:alpine
EXPOSE 80
COPY --from=build  /usr/src/app/dist/* /usr/share/nginx/html

#docker login
#docker build -t atulmirajkar/noteuiangular2:v1 .
#docker push atulmirajkar/noteuiangular2:v1
#docker run -p 80:80 atulmirajkar/noteuiangular2:v1


#docker build -t atulmirajkar/noteuiangular2:local .
#docker push atulmirajkar/noteuiangular2:local
