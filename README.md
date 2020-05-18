# Colorado Wiki

A simple wiki page dedicated to chronicling the history of Colorado.

- [Install](#install)
- [Server](#server)
- [Run App](#run-app)
- [Search](#search)
- [Heroku Link](#heroku-link)

## Install

```bash
cd roon-colorado-wiki
npm install
```

## Server

```bash
git clone https://github.com/dylanavery720/roon-wiki-api-dylan
cd roon-wiki-api
npm install
npm start
```

## Postgres

Locate the file in the server called "latest.dump", you can use pg_restore to create the database.

```bash
pg_restore --verbose --clean --no-acl --no-owner -h localhost -U myuser -d mydb latest.dump

```

## Run App

```bash
npm start
```

## Search

If your search comes up empty you will be prompted with the option to create the page.

## Heroku Link

http://roon-wiki-web.herokuapp.com/
