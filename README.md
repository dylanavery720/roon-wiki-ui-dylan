# Colorado Wiki

A simple wiki page dedicated to chronicling the history of Colorado.

- [Install](#install)
- [Server & Postgres](#server)
- [Run App](#run-app)
- [Search](#search)
- [Heroku Link](#heroku-link)

## Install

```bash
cd roon-colorado-wiki
npm install
```

## Server & Postgres

Before you run the server, locate the file in the server called "latest.dump".

```bash
git clone https://github.com/dylanavery720/roon-wiki-api-dylan
cd roon-wiki-api
```

Enter psql

```psql
CREATE DATABASE name;
```

Exit psql

```bash
pg_restore --verbose --clean --no-acl --no-owner -h localhost -U myuser -d mydb latest.dump
```

Then create a .env file with an environment variable DATABASE_URL={your_db}

```
bash
npm install
npm start
```

## Run App

Create a .env file with an environment variable REACT_APP_SERVER_URL=http://localhost:8080

```bash
cd roon-colorado-wiki
npm start
```

## Search

If your search comes up empty you will be prompted with the option to create the page.

## Heroku Link

http://roon-wiki-web.herokuapp.com/
