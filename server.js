const app = require("./app");
const mongoose = require("mongoose");

const DB_PASSWORD = "kaalFg3paQy4wNgd";
const DB_NAME = "db-contacts";
const DB_HOST =
  "mongodb+srv://Protasevych:" +
  DB_PASSWORD +
  "@cluster0.cqxsdo6.mongodb.net/" +
  DB_NAME +
  "?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.messege);
    process.exit(1);
  });
