var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "final";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getData", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = { _id: "1" };
  const result = await db.collection("data").findOne(query);
  if (!result) {
    res.status(404).send("Item not found");
    return;
  }
  console.log(result);
  res.status(200);
  res.send(result);
});

// get all records
app.get("/records", async (req, res) => {
  await client.connect();

  console.log("Node connected successfully to GET MongoDB");

  const result = await db.collection("records").find().toArray();
  
  if (!result) {
    res.status(404).send("No records found");
    return;
  }
  console.log("Found record: ", result);
  res.status(200);
  res.send(result);
});

// add a record
app.post("/records/", async (req, res) => {
  const { date, temperature_f, temperature_c, humidity } = req.body;

  if (!date || !temperature_f || !temperature_c || !humidity) {
    res.status(400).send("Missing required fields: date, temperature_f, temperature_c, and/or humidity");
    return;
  }

  await client.connect();

  const newDocument = {
    date: date,
    temperature_f: temperature_f,
    temperature_c: temperature_c,
    humidity: humidity,
  };

  const result = await db.collection("records").insertOne(newDocument);
  res.status(200);
  res.send(result);
});


// update an existing record
app.put("/records/:rid", async (req, res) => {
  const _id = req.params.rid;
  const { date, temperature_f, temperature_c, humidity } = req.body;

  if (!date || !temperature_f || !temperature_c || !humidity) {
    res.status(400).send("Missing required fields: date, temperature_f, temperature_c, and/or humidity");
    return;
  }

  await client.connect();
  console.log("Node connected successfully to updateData MongoDB");

  const query = { _id };
  const update = {
    $set: {
      date: date,
      temperature_f: temperature_f,
      temperature_c: temperature_c,
      humidity: humidity,
    },
  };
  const options = { returnOriginal: false };

  try {
    const result = await db.collection("records").findOneAndUpdate(query, update, options);

    if (!result.value) {
      res.status(404).send("Item not found");
      return;
    }

    res.status(200).send(result.value);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal server error");
  }
});

// remove a record
app.delete("/records/:rid", async (req, res) => {
    const id = req.params.rid;

    await client.connect();
  
    const query = { _id: new ObjectId(id) };
    const result = await db.collection("records").deleteOne(query);

    console.log("Attempt to delete: ", result);

    if (!result.acknowledged){ 
      res.status(500);
    } else if (result.deletedCount < 1) {
      res.status(404);
    } else {
      res.status(200);
    }
    
    res.send(result);
});
  

app.post("/addData", async (req, res) => {
  const { date, temperature_f, temperature_c, humidity } = req.body;

  if (!date || !temperature_f || !temperature_c || !humidity) {
    res.status(400).send("Missing required fields: date, temperature_f, temperature_c, and/or humidity");
    return;
  }

  await client.connect();

  const count = await db.collection("data").countDocuments();
  const newDocument = {
    _id: (count + 1).toString(),
    date: date,
    temperature_f: temperature_f,
    temperature_c: temperature_c,
    humidity: humidity,
  };

  const result = await db.collection("data").insertOne(newDocument);
  res.status(200);
  res.send(result);
});

// app.delete("/deleteData", async (req, res) => {
//   const { _id } = req.body;

//   if (!_id) {
//     res.status(400).send("Missing required field: _id");
//     return;
//   }

//   await client.connect();

//   const query = { _id: _id };
//   const result = await db.collection("data").deleteOne(query);
//   res.status(200);
//   res.send(result);
// });


// app.post("/updateData", async (req, res) => {
//   const { date, temperature_f, temperature_c, humidity } = req.body;

//   if (!date || !temperature_f || !temperature_c || !humidity) {
//     res.status(400).send("Missing required fields: date, temperature_f, temperature_c, and/or humidity");
//     return;
//   }

//   await client.connect();
//   console.log("Node connected successfully to updateData MongoDB");

//   const query = { _id: "1" };
//   const update = {
//     $set: {
//       date: date,
//       temperature_f: temperature_f,
//       temperature_c: temperature_c,
//       humidity: humidity,
//     },
//   };
//   const options = { returnOriginal: false };

//   try {
//     const result = await db.collection("data").findOneAndUpdate(query, update, options);

//     if (!result.value) {
//       res.status(404).send("Item not found");
//       return;
//     }

//     res.status(200).send(result.value);
//   } catch (error) {
//     console.error("Error updating data:", error);
//     res.status(500).send("Internal server error");
//   }
// });