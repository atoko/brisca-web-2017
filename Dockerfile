FROM node:latest

RUN mkdir -p /usr/app
WORKDIR /usr/app
ENV PATH /usr/app/node_modules/.bin:$PATH
COPY package.json /usr/app/
RUN npm install

COPY postcss.config.js /usr/app/
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true
CMD ["npm", "run", "start"]
EXPOSE 3000
