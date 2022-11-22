const express = require("express");
const app = express();
const port = 8000;
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error in reading file ", err);
      return res.send("Some Error");
    }
    data = JSON.parse(data);
    return res.render("home", {
      data: data,
    });
  });
});

app.post("/submit", async (req, res) => {
  console.log("req.body is ", req.body);

  let { id, name, address } = req.body;
  let first = parseInt(req.body["1"]);
  let second = parseInt(req.body["2"]);
  let third = parseInt(req.body["3"]);
  let fourth = parseInt(req.body["4"]);
  let fifth = parseInt(req.body["5"]);

  let totalMarks = first + second + third + fourth + fifth;
  let avgMarks = totalMarks / 5;

  let grade = "N/A";

  if (avgMarks >= 90) {
    grade = "A";
  }

  if (avgMarks > 33 && avgMarks < 90) {
    grade = "B";
  }

  if (avgMarks < 33) {
    grade = "E";
  }

  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log("error in reading file ", err);
    }
    console.log("data is ", data);
    data = JSON.parse(data);
    data.unshift({
      first,
      second,
      third,
      fourth,
      fifth,
      avgMarks,
      totalMarks,
      grade,
      name,
      id,
      address,
    });

    fs.writeFile("./data.json", JSON.stringify(data), "utf-8", () => {
      console.log("file updated");
    });
  });

  return res.redirect("back");
});

app.listen(port, () => {
  console.log("Server running ar port ", port);
});
