FROM node:10

COPY ./ /react-datepicker

RUN cd /react-datepicker \
    && npm install 

WORKDIR /react-datepicker

EXPOSE 3000

CMD [ "npm", "run", "serve" ]