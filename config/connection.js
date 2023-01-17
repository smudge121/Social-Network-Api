const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/social_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
