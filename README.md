# Node.js on IBM Cloud with MongoDB on AWS Sample

This application demonstrates how to use a node.js app running on IBM Cloud with a MongoDB database running on Amazon Web Services. It provides recommendations for 
campgrounds. The UI talks to a RESTful Express CRUD backend API.

## Important parts
+ the database is a MongoDB provided by mLab (https://mlab.com/), running on AWS. To start using the app, you need to create a MongoDB database somewhere (at mLab or anywhere else) and record its URL. This is all you need to do on the DB side, everything else (CRUD operations) is done in the app. In this case mLab was chosen because they provided a free account for databases up to 500 MB at the time.  
+ the app connects to the DB via a user defined environment variable DATABASEURL in the app's runtime. The value of DATABASEURL is the DB URL provided by the DB host. In our case, it looks like this: mongodb://(username):(password)@(route):(port)/(dbname)

1. [Install Node.js][]
+ cd into this project's root directory
+ Run `npm install` to install the app's dependencies
+ Run `npm start` to start the app
+ Access the running app in a browser at <http://localhost:3000>

[Install Node.js]: https://nodejs.org/en/download/
