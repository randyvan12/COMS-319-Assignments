var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/listProducts", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("fakestore_catalog")
    .find(query)
    .limit(100)
    .toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/:id", async (req, res) => {
  const product = "product" + req.params.id + ".id";
  const productId = Number(req.params.id);
  console.log("Product to find :", product, " id :", productId);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { [product]: productId };
  const results = await db.collection("fakestore_catalog").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

app.post("/addProduct", async (req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const k = keys[0];
  const v = values[0];
  console.log("Keys :", k, " Values", v);
  const newDocument = { _id: "4", [k]: [v] };
  const results = await db.collection("fakestore_catalog").insertOne(newDocument);
  res.status(200);
  res.send(results);
});

app.delete("/deleteProduct", async (req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const k = keys[0];
  const query = { [k]: { $exists: true } };
  const results = await db.collection("fakestore_catalog").deleteOne(query);
  res.status(200);
  res.send(results);
});

app.post("/updatePrice", async (req, res) => {
  const { id, price } = req.body;

  if (!id || !price) {
    res.status(400).send("Missing required fields: id and/or price");
    return;
  }

  await client.connect();
  console.log("Node connected successfully to updatePrice MongoDB");

  const productKeyPattern = /^product\d+$/;

  const docs = await db.collection("fakestore_catalog").find({}).toArray();
  console.log('Docs:', docs); // Added log

  let foundProductKey;
  let foundDoc;

  for (const doc of docs) {
    const productKeys = Object.keys(doc).filter((key) => productKeyPattern.test(key));
    console.log('ProductKeys:', productKeys); // Added log
  
    for (const productKey of productKeys) {
      if (doc[productKey].id === id) {
        foundProductKey = productKey;
        foundDoc = doc;
        break;
      }
    }
  
    if (foundProductKey && foundDoc) {
      break;
    }
  }

  console.log('FoundProductKey:', foundProductKey); // Added log
  console.log('FoundDoc:', foundDoc); // Added log

  if (!foundProductKey || !foundDoc) {
    res.status(404).send("Item not found");
    return;
  }

  const query = { _id: foundDoc._id };
  const update = {
    $set: {
      [`${foundProductKey}.price`]: price,
    },
  };
  const options = { returnOriginal: false };

  try {
    const result = await db.collection("fakestore_catalog").findOneAndUpdate(query, update, options);

    if (!result.value) {
      res.status(404).send("Item not found");
      return;
    }

    res.status(200).send(result.value);
  } catch (error) {
    console.error("Error updating price:", error);
    res.status(500).send("Internal server error");
  }
});