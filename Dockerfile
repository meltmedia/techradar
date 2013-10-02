FROM c.melt.sh/meltmedia/base

MAINTAINER Devon Tackett <devon.tackett@meltmedia.com>

ADD / /var/www/tech-radar

RUN cd /var/www/tech-radar && npm install -g grunt-cli
RUN cd /var/www/tech-radar && npm install -g bower
RUN cd /var/www/tech-radar && npm install
RUN cd /var/www/tech-radar && bower install --allow-root

EXPOSE 8000

# CMD cd /var/www/tech-radar && grunt server
CMD cd /var/www/tech-radar && python -m SimpleHTTPServer 8000