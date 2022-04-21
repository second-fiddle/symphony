FROM node:16-alpine

ENV APP_HOME /frontend
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY ./frontend/package*.json /frontend

RUN yarn global add typesync && typesync && yarn
