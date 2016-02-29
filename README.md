##Welcome to Persona!
#Persona is peer base personality evaluation platform
![ScreenShot](https://cldup.com/fSkM-xBEui.gif)

## Git Workflow

Should pass all test and rebase from `savagepopsicle/like/master` before merge.

![Git-workflow](https://cldup.com/qQvpX4x3hP.png)

## Tech Stack

- Server: Node.js, Express, Passport, Sequelize
- Database: PostgreSQL
- Frontend: AngularJS
- Deployment: AWS
- Testing:
    - Backend: Mocha, Chai
    - Frontend: Mocha, Chai, and Karma
    - Service: Travis 
- Task runner: Grunt

## Architecture

#### Architecture

![architecture](https://cldup.com/7usay0HPOL.png)

#### Database Schema

![MVP database schema](https://cldup.com/1GzOPc7fEE.png "MVP database schem")

#### UX Flow Chart

![MVP UX Flow Chart](https://cldup.com/fFCB0098W7.png "MVP UX Flow Chart")

##### User view router

- /
- /signin
- /signout
- /register
- /dashboard
- /id/:id

##### API

* POST /api/signin
* POST /api/signout
* GET /api/profile/
* POST /api/profile/
* PUT /api/profile/
* DELETE /api/profile/
* GET /api/profile/:id
* GET /api/users/
* POST /api/vote

## Team

- All features are created in fullstack manner (backend to frontend).
- Scrum Master: Aaron
- Product Owner: Yifeng
