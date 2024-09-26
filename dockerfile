# base image
FROM node:16

# mkdir & cd into this:
WORKDIR /usr/src/app

# copy package.json + package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . . 

# build...
RUN npm run build


# allowing host to connect to container on port 4000
EXPOSE 4000

# default command
CMD ["node", "build/src/app.js"]
