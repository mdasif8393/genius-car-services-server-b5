const express = require("express");
const port = process.env.port || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h5pr3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const database = client.db("geniusCar");
    const serviceCollection = database.collection("service");

    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.json(services);

      app.get("/service/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const service = await serviceCollection.findOne(query);
        res.json(service);
      });

      app.post("/service", async (req, res) => {
        const newService = req.body;
        const result = await serviceCollection.insertOne(newService);
        res.json(result);
      });

      app.delete("/service/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = serviceCollection.deleteOne(query);
        res.send(result);
      });
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running port 5000");
});

app.listen(port, () => {
  console.log("Running server");
});
