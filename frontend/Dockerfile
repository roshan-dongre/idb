FROM node:7

WORKDIR /app
COPY package.json /app

CMD npm i babel-register babel-loader babel-core babel-preset-react babel-preset-es2015 react react-dom --save-dev
CMD npm i mocha chai sinon enzyme react-addons-test-utils --save-dev
CMD /bin/bash

COPY . /app

EXPOSE 80
