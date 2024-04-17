const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const status = require("./src/helpers/Response");
const history = require('connect-history-api-fallback');

dotenv.config();
const { APP_PORT } = process.env;
const app = express();

// Middleware to parse incoming JSON data ==================================
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// File Logger for all access ----------------------------------------------
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
  );
  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));
 
 app.use(cors("*"));       // To allow all orgins =============================

app.use('/uploads', express.static(path.join(__dirname,'uploads')));

app.use("/auth",
   require("./src/routes/auth"));
   
app.use(
  "/api",
  require("./src/routes/users"),
  require("./src/routes/masters/computer"),
  require("./src/routes/masters/lead"),
  require("./src/routes/masters/account"),
  require("./src/routes/masters/invoice"),
  require("./src/routes/masters/contact"),
  require("./src/routes/masters/opportunity"),
  require("./src/routes/masters/product"),
  require("./src/routes/masters/location"),
  require("./src/routes/masters/company"),
  require("./src/routes/masters/supplier"),
  require("./src/routes/masters/status"),
  require("./src/routes/masters/printer"),
  require("./src/routes/masters/nserver"),
  require("./src/routes/masters/nrouter"),
  require("./src/routes/masters/smartphone"),
  require("./src/routes/masters/tablet"),
  require("./src/routes/masters/workstation"),
  require("./src/routes/masters/uworkstation"),
  require("./src/routes/masters/accesspoint"),
 
);

app.all("/api/*", (req, res) => {
  return status.ResponseStatus(res, 404, "Endpoint Not Found");

});

app.use(express.static(path.join( __dirname, './build')));
app.use(history());


app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(APP_PORT, () => {
  console.log(`ITAM server listening at http://localhost:${APP_PORT}`);
});


 
      
       
     
     