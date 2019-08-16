FROM alpine

RUN cd /

RUN mkdir -p production/app

WORKDIR /production

ADD package.json /production/package.json

ADD run.sh /production/run.sh

ADD app /production/app

RUN chmod u+x run.sh

RUN npm install

EXPOSE 8888

CMD ./run.sh
