import express from "express";
import { MongoClient } from "mongodb";
import "dotenv/config";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("MONGO_URL is not defined. Check your .env file.");
}

const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call

const PORT = process.env.PORT;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.post("/properties/buildings", async function (request, response) {
  const bodydata = request.body;

  const data = await client
    .db("RealEstate")
    .collection("Buildings")
    .insertMany(bodydata);

  response.status(200).send({ Response: data });
});
app.get("/properties/buildings", async function (request, response) {
  const bodydata = request.body;

  const data = await client
    .db("RealEstate")
    .collection("Buildings")
    .find({})
    .toArray();

  response.status(200).send({ Response: data });
});
app.get("/properties/buildings/:id", async function (request, response) {
  const { id } = request.params;
  const data = await client
    .db("RealEstate")
    .collection("Buildings")
    .findOne({ _id: id });
  response.status(200).send({ Response: data });
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
