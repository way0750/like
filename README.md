##Welcome to Persona!
#Persona is peer base personality evaluation platform
![ScreenShot](https://cldup.com/fSkM-xBEui.gif)

## Documentation
  
- Frontend | [JSDocs](http://usejsdoc.org/)
- Backend  | [RDoc](http://rdoc.sourceforge.net/)
- Database | [dbdsgnr](http://dbdsgnr.appspot.com/)

## Git Workflow

Should pass all test and rebase from `savagepopsicle/like/master` before merge.

![Git-workflow](https://cldup.com/qQvpX4x3hP.png)

## Tech Stack

- Server: Node.js, Express, Passport, Sequelize
- Database: PostgreSQL
- Frontend: AngularJS
- Deployment: AWS
- Testing:
    - Backend: Rspec
    - Frontend: Mocha, Chai, and Karma
    - Service: Travis 
- Task runner: Grunt

## Architecture

### MVP

#### MVP Architecture

![MVP architecture](https://cldup.com/7usay0HPOL.png)

#### MVP Database Schema

![MVP database schema](https://cldup.com/1GzOPc7fEE.png "MVP database schem")

#### MVP UX Flow Chart

![MVP UX Flow Chart](https://cldup.com/fFCB0098W7.png "MVP UX Flow Chart")

#### MVP router

##### User view

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
