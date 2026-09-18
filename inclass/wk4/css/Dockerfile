# ONE image for week 4: Apache to serve the pages, Playwright to photograph them.
#
# The first lines are byte-for-byte the week-3 Pantry Dockerfile, on purpose:
# Docker caches layers by their instructions, so nothing new is downloaded.
FROM mcr.microsoft.com/playwright:v1.62.1-noble

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      apache2 libapache2-mod-php8.3 \
      php8.3-cli php8.3-sqlite3 php8.3-xml php8.3-mbstring php8.3-curl unzip \
 && rm -rf /var/lib/apt/lists/*

# Composer is PHP's npm. Copy the binary straight out of its official image.
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY docker/apache.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /app
COPY package.json ./
RUN npm install --silent
COPY . .

EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]
