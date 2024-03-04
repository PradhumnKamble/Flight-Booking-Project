const express = require("express");
const apiRoutes = require("./routes") ;
const { ServerConfig } = require("./config/index.js");

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended:true})) ;

app.use('/api' , apiRoutes) ;

app.listen(ServerConfig.PORT, () => {
  console.log(`server activated at Port ${ServerConfig.PORT}`);
});
