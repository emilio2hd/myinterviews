FROM ruby:2.6.6-slim

ENV BUNDLER_VERSION 2.1.4

ENV RAILS_ROOT=/myinterviews
ENV BACKUP_FOLDER=/var/local/myinterviews/backups

ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
ENV THOR_SILENCE_DEPRECATION=true

RUN mkdir $RAILS_ROOT \
    && mkdir -p $BACKUP_FOLDER

WORKDIR $RAILS_ROOT

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libpq-dev zlib1g-dev git liblzma-dev netcat nodejs build-essential \
        postgresql-client

COPY Gemfile .
COPY Gemfile.lock .

RUN echo 'gem: --no-rdoc --no-ri' >> "/root/.gemrc" \
    && gem install bundler -v $BUNDLER_VERSION \
    && bundle config deployment 'true' \
    && bundle config without development:test \
    && bundle install --jobs 4 --retry 2

COPY . .

RUN export SECRET_KEY_BASE=`bin/rake secret` \
    && bundle exec rake assets:clean \
    && bundle exec rake assets:clobber \
    && bundle exec rake tmp:cache:clear \
    && bundle exec rake assets:precompile --trace \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 3000
CMD ["bash", "init.sh"]
