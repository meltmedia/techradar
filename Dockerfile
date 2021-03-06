FROM totem/nodejs-base:0.10.x

MAINTAINER Devon Tackett <devon.tackett@meltmedia.com>

RUN npm install -g \
  grunt-cli \
  node-static
ADD . /var/www/tech-radar

RUN cd /var/www/tech-radar && \
  npm install && \
  grunt prepare

EXPOSE 8080

WORKDIR /var/www/tech-radar
CMD ["/usr/bin/static", "-a", "0.0.0.0"]
