# Notes-app - A containerized web app for note taking


<h2>Technical Overview</h2>

<h4>Back-end.</h4>
The back-end is written is NodeJS using express.
MongoDB is used for the database. Notes are stored here. Express-session uses the database for session stores.

<h4>Front-end.</h4>
The front end is build using HTML, CSS and Javascript. No view engine is used.

<h4>Testing</h4>
TODO: Implement testing in mocha

    npm run dev
    rum run tests


<h2>Running locally</h2>

<h4>Without Docker - NodeJS</h4>
The NodeJS back-end requires an MongoDB database to be running. Install MongoDB locally or run it in a container.

[dotenv](https://www.npmjs.com/package/dotenv/) is used to load enviroment variables in the absence of Docker.
MONGODB_CONNSTRING must be defined in a .env file or in your systems environment formatted as such:

```mongodb://{mongoUSER}:{mongoPASSWORD}@{mongoIP}:{mongoPORT}```

Example: ```mongodb://admin:password123@192.168.2.43:27017```
<h4>With Docker</h4>
The NodeJS back-end requires an MongoDB database to be running. Install MongoDB locally or run it in a container.

    docker build -t localbuild .
    docker run -e MONGODB_CONNSTRING=mongodb://{mongoUSER}:{mongoPASSWORD}@{mongoIP}:{mongoPORT} -p 80:8080  docker.io/library/localbuild -d 

The webiste should be running at [localhost](http://localhost/)

<h4>With Docker Compose</h4>



