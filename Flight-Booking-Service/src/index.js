const express = require("express");
const apiRoutes = require("./routes") ;
// this file contains basic server configurations

const { ServerConfig } = require("./config/index.js"); // no need to add index.js

const app = express();
app.use(express.json()); //==> will help to parse th incoming json data (only)
// without it express wont be able to parse the data of type json
// express.json() ==> returns a middleware that parses json data 

app.use(express.urlencoded({extended:true})) ; // parses econded things in url 



// 'apiRoutes' router will imposed on url conating /api as a part
// if any point the url has /api , then we will bind apiRoutes to it
// the return will be handled by apiRoutes
app.use('/api' , apiRoutes) ;

app.listen(ServerConfig.PORT, () => {
  console.log(`server activated at Port ${ServerConfig.PORT}`);
});
