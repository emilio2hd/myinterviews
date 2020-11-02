# Build frontend
FROM node:10-alpine AS buildFrontend

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NG_CLI_ANALYTICS=ci

COPY frontend/package.json /app/package.json
RUN npm install && npm install -g @angular/cli@9.1.12

COPY ./frontend /app
RUN ng build --prod

# Build Backend
FROM ruby:2.5-slim

ENV RAILS_ROOT /myinterviews
ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true

RUN mkdir $RAILS_ROOT
WORKDIR $RAILS_ROOT
COPY . .
COPY --from=buildFrontend /app/dist/myinterviews /myinterviews/public

EXPOSE 3000

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libpq-dev zlib1g-dev git liblzma-dev netcat build-essential \
    && gem install bundler \
    && bundle install --without development test \
    && rm -rf /var/lib/apt/lists/*

CMD ["bash", "init.sh"]