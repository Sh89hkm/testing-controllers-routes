FROM node:16

RUN mkdir -p /backend-app
WORKDIR /backend-app
COPY package.json .
RUN npm install
COPY ./src ./src
CMD [ "npm", "run", "start:app" ]