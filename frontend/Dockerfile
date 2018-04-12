FROM node:7

WORKDIR /app
COPY package.json /app

RUN npm i babel-register babel-loader babel-core babel-preset-react babel-preset-es2015 react react-dom --save-dev
RUN npm i mocha chai sinon enzyme react-addons-test-utils --save-dev

COPY . /app
CMD /bin/bash
EXPOSE 80
