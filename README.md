# How to set up the template
This is a basic template for a Node JS web app

## Local
Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ mkdir nodetemplate
$ git clone https://github.com/jimmytran16/nodetemplate.git nodetemplate
$ cd nodetemplate
$ npm install
$ nodemon index
```
Your app should now be running on [localhost:3000](http://localhost:3000/).

## Deploy on CLI(To Heroku)
 Make sure you have [Heroku CLI](https://cli.heroku.com/) installed.

```
$ heroku create <your-project-name>
$ git push heroku master
$ heroku open
```
or

## Deploy on the browser
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
