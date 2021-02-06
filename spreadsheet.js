const GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");

const creds = require("./client_secret.json");

let finalarr = [];

function addtoarr(row) {
  let arr = [];
  arr.push(row.coursename);
  // console.log(`${row.coursename}`);
  arr.push(row.slot);
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
  console.log(finalarr);
}
accessSpreadsheet();
// https://docs.google.com/spreadsheets/d/1Gg2PGrtcGEG2uQtXeioAqrpcNbYtqywNudVssEB2SNE/edit#gid=0

// async function accessSpreadsheet() {
//     await doc.useServiceAccountAuth({
//         client_email: creds.client_email,
//         private_key: creds.private_key,
//     });

//     await doc.loadInfo(); // loads document properties and worksheets
//     console.log(doc.title);

// }
