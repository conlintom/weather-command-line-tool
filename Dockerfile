FROM node:10

# Create app directory
WORKDIR /weather-command-line-tool

COPY https://github.com/conlintom/weather-data.git /weather-tool/weather-data

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]
