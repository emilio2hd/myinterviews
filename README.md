myinterviews 
=============
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
[![Build Status](https://circleci.com/gh/emilio2hd/myinterviews.svg?style=shield)](https://app.circleci.com/pipelines/github/emilio2hd/myinterviews)
[![codebeat badge](https://codebeat.co/badges/ef8d86f7-cf6c-4726-bd2d-4bac89cc62c1)](https://codebeat.co/projects/github-com-emilio2hd-myinterviews-master)

The goal of this app is to manage job applications, interviews, cover letters and feedbacks.
 
![Template](./docs/images/interviews.png)
Do you wanna see the demo? [Click here!](https://myinterviews.herokuapp.com/)
 
# Docker
You can run the application using Docker.

The container has the port **3000** exposed.

The application does not contain a database, so you must inform the database info via environment variables.

### Build container

To build an image of the application, execute:
```
docker build -t myinterviews .
```

### Environment Variables

* **APP_DB_HOST** - The database's host address
* **APP_DB_PORT** - The database's port
* **APP_DB_USER** - The database's username
* **APP_DB_PASSWORD** - The database's password
* **SECRET_KEY_BASE** - The secret key is required to run in production mode

### Docker-compose
Here is an example of a docker-compose.yml file:

```yml
db:
  image: postgres:9.4
  container_name: myinterviews-db
  restart: always
  ports:
    - "5432:5432"
  environment:
    - POSTGRES_USER=db_user
    - POSTGRES_PASSWORD=123456
    - POSTGRES_DB=myinterviews
web:
  container_name: myinterviews-web
  restart: always
  build: .
  ports:
    - "3000:3000"
  environment:
    - APP_DB_HOST=db
    - APP_DB_PORT=5432
    - APP_DB_USER=db_user
    - APP_DB_PASSWORD=123456
    - SECRET_KEY_BASE=ef8705c8be8bc5c562fd403847e1451d8e149ba4bf88dea34c7e0c99fc55556d3ea3e0619b24ff7399f19c3c0e7798b62ffe643e8a6911cee982e7143ef0e262
  links:
    - db
```

# Email Configuration
My Interviews has support to send emails by smtp only.  
:warning: Note: As of July 15, 2014, Google increased [its security measures](https://support.google.com/accounts/answer/6010255) 
and now blocks attempts from apps it deems less secure.

# Contributions
If you want to contribute, open a issue or send me a pull request. ;)