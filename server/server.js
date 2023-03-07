const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

const client = new Client({
  user: "user",
  host: "localhost",
  database: "my_todo",
  port: 5432,
});

client.connect();

app.get("/api/data", (req, res) => {
client.query("SELECT * FROM todos", (err, res) => {
  if (err) {
    console.error(err);
  } else {
    res.json(res);
  }
});

});


client.end();

console.log("hello");
