const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config()
const keys = require("./config/keys");
const cors = require('cors');
// require("./models/User");
// require("./models/Survey");
// require("./services/passport");
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(cors());
app.options('*', cors()) 
app.use(bodyParser.json());


require('./routes/auth')(app);
require("./routes/users")(app);
require("./routes/projects")(app);

// require("./routes/billingRoutes")(app);
// require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets
  //like our main.js file, or main.css file!
  app.use(express.static("client/build"));
  //Express will serve up the index.html file
  //if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port 5000");
});