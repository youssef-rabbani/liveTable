const express = require("express");
const app = express();

const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:8000",
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/liveTableRoutes")(app);

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
