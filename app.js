var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

const GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");

const creds = require("./client_secret.json");

let finalarr = [];
const port = process.env.PORT || 9000;

function addtoarr(row) {
  let arr = [];
  arr.push(row.coursecode);
  arr.push(row.coursename);
  arr.push(row.facultyname);
  arr.push(row.slot);
  arr.push(row.grouplink);
  finalarr.push(arr);
}

async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet(
    "1R2d3xSMgswiKmJzfJ5Oi0Cx9sEQVxkk-HWIO5mruFnk"
  );
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  // console.log(sheet.title);
  const rows = await promisify(sheet.getRows)({
    offset: 1,
  });
  rows.forEach((row) => {
    addtoarr(row);
  });
}
accessSpreadsheet();

app.get("/", function (req, res) {
  let values = finalarr;
  res.render("try", { values: values });
});
app.get("*", function (req, res) {
  res.send("Sorry ! You are lost!");
});

app.listen(port, function () {
  console.log("App listening!");
});
