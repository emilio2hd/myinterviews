FROM ruby:2.3.1-slim

ENV RAILS_ROOT /myinterviews
ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true

RUN mkdir $RAILS_ROOT
WORKDIR $RAILS_ROOT
COPY . .

EXPOSE 3000

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libpq-dev zlib1g-dev git liblzma-dev netcat build-essential \
    && gem install bundler \
    && bundle install --without development test \
    && bundle exec rake assets:clean \
    && bundle exec rake assets:clobber \
    && bundle exec rake tmp:cache:clear \
    && bundle exec rake assets:precompile --trace \
    && rm -rf /var/lib/apt/lists/*

CMD ["bash", "init.sh"]
