FROM node:7

WORKDIR /app
COPY package.json /app

RUN npm i 
RUN npm i babel-register babel-loader babel-core babel-preset-react babel-preset-es2015 react react-dom mocha chai sinon enzyme react-addons-test-utils jsdom parse5 babel-preset-airbnb enzyme-adapter-react-16 jsdom-global ignore-styles --save-dev
RUN npm upgrade --save-dev

COPY . /app
CMD /bin/bash
EXPOSE 80
