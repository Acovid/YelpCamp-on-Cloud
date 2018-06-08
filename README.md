# Node.js on IBM Cloud using MongoDB on AWS - Sample

This application demonstrates how to use a Node.js app running on IBM Cloud with a MongoDB database that resides on Amazon Web Services (AWS). The app provides recommendations for campgrounds. The app's UI talks to a RESTful Express CRUD backend API.

## Important parts
+ the database is a MongoDB provided by mLab (https://mlab.com/), running on AWS. To start using the app, you just need to create a MongoDB database somewhere and record its URL. So, the DB could reside anywhere as long as it is accessible via URL. This is all you need to do on the DB side, everything else (CRUD operations) is done in the app.   
+ the app connects to the DB via a user defined environment variable DATABASEURL in the app's runtime on IBM Cloud. The value of DATABASEURL is the DB URL provided by the DB host. In our case, it looks like this: mongodb://(username):(password)@(route):(port)/(dbname)
+ connectivity between the app and the DB is done in app.js

To run the app locally on your computer, to following:

+ Download the app to your computer
+ [Install Node.js][]
+ cd into this project's root directory
+ Run `node app.js` to start the app
+ Access the running app in a browser at <http://localhost:3000>

[Install Node.js]: https://nodejs.org/en/download/
