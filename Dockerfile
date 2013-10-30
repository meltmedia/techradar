FROM totem/nodejs-base:0.10.x

MAINTAINER Devon Tackett <devon.tackett@meltmedia.com>

ADD / /var/www/tech-radar

RUN cd /var/www/tech-radar && npm install -g grunt-cli
# Install node-static for server (grunt connect wasn't working with Docker for some reason)
RUN cd /var/www/tech-radar && npm install -g node-static
RUN cd /var/www/tech-radar && npm install
RUN cd /var/www/tech-radar && grunt

EXPOSE 8080

WORKDIR /var/www/tech-radar
ENTRYPOINT static

