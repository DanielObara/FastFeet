<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h3 align="center">
  :warning: In progress.. :warning:
</h3>

<p align="center">This challenge is part of the Final Challenge, which is a complete application(
  <a href="#gear-back-end">Back-end</a>, 
  <a href="#">Front-end</a> and 
  <a href="#">Mobile</a>) that is evaluated for issuing the GoStack Bootcamp Certificate</p>

<p align="center">
  <a href="https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DanielObara/DesafioFastFeet&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/764eee83d7604873a9b06d37c4689523"/></a>
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/danielobara/desafiofastfeet?color=%2304D361">

  <a href="https://www.linkedin.com/in/danielobara/">
    <img alt="Made by DanielObara" src="https://img.shields.io/badge/made%20by-DanielObara-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
  
  <a>
    <img alt="Repository size" src="https://img.shields.io/github/repo-size/danielobara/desafiofastfeet.svg">
  </a>
  
  <a href="https://github.com/danielobara/desafiofastfeet/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/danielobara/desafiofastfeet.svg">
  </a>
  
  <a href="https://github.com/danielobara/desafiofastfeet/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/danielobara/desafiofastfeet.svg">
  </a>
  
   <a href="https://github.com/DanielObara/DesafioFastFeet/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/danielobara/desafiofastfeet?style=social">
  </a>
  
</p>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

## :rocket: Technologies

### :gear: BACK-END
-   [Node.js][nodejs]
-   [Express](https://expressjs.com/)
-   [nodemon](https://nodemon.io/)
-   [Sucrase](https://github.com/alangpierce/sucrase)
-   [Docker](https://www.docker.com/docker-community)
-   [Sequelize](http://docs.sequelizejs.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [node-postgres](https://www.npmjs.com/package/pg)
-   [Redis](https://redis.io/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [JWT](https://jwt.io/)
-   [Multer](https://github.com/expressjs/multer)
-   [Bcrypt](https://www.npmjs.com/package/bcrypt)
-   [Youch](https://www.npmjs.com/package/youch)
-   [Yup](https://www.npmjs.com/package/yup)
-   [Bee Queue](https://www.npmjs.com/package/bcrypt)
-   [Nodemailer](https://nodemailer.com/about/)
-   [date-fns](https://date-fns.org/)
-   [Sentry](https://sentry.io/)
-   [DotEnv](https://www.npmjs.com/package/dotenv)
-   [VS Code][vc] with [ESLint][vceslint], [EditorConfig][vceditconfig] and [Prettier][prettier]

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js][nodejs] + [Yarn][yarn] installed on your computer.

From your command line:

### Install API
```bash
# Clone this repository
$ git clone https://github.com/DanielObara/DesafioFastFeet

# Go into the repository
$ cd DesafioFastFeet/backend

# Install dependencies
$ yarn install

# Created Postgree Docker container
$ docker run --name database -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=fastfeet -p 5432:5432 -d postgres

# Created Mongo Docker container
$ docker run --name mongo -p 27017:27017 -d -t mongo

# Created Redis Docker container
$ docker run --name redisDesafioFastFeet -p 6379:6379 -d -t redis:alpine

# Run Migrates
$ yarn migrate

# Run Seeds
$ yarn seed

# Run the API
$ yarn dev
```


## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/danielobara/desafiofastfeet/blob/master/LICENSE) for more information.
---
Made with ♥ by Daniel Obara :wave: [Get in touch!](https://www.linkedin.com/in/danielobara/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
