# The FROM instruction sets the Base Image for subsequent instructions.
# Using Nginx as Base Image
FROM node:9.2.0
MAINTAINER inwecrypto <support@inwecrypto.com>

COPY ./ /tmp/build
COPY ./env.cn.js /tmp/build/src/config/config.js

WORKDIR /tmp/build/
RUN yarn && yarn run build