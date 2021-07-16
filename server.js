const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

const destinations = [
  {
    _id: "1234",
    name: "The Needle",
    location: "Seattle, WA",
    photo:
      "https://media.cntraveler.com/photos/59de395b18d971147f4bcc8e/4:3/w_3036,h_2277,c_limit/Seattle-Space-Needle_GettyImages-180262211.jpg",
    description: "",
  },
  {
    _id: "3453",
    name: "The Eiffel Tower",
    location: "Paris, France",
    photo:
      "https://lh5.googleusercontent.com/p/AF1QipMyFp7DDFxwIv3Idp4YKibGJ2zhm0l9UAsFIDDh=w203-h135-k-no",
    description: "Romantic place",
  },
];

// CRUD
// CREATE => POST
server.post("/destinations", (req, res) => {
  destinations.push(req.body);

  res.send({ status: "success" });
});

// READ => GET
server.get("/destinations", (req, res) => {
  res.send(destinations);
});

// UPDATE => PUT
server.put("/destinations", (req, res) => {
  const _id = req.query._id;

  for (let i in destinations){
    if (destinations[i]._id === _id){
      destinations[i] = req.body;
      console.log(req.body);
      console.log(destinations[i])
      res.send(`updated location record ${_id}`);
      return;
    }
  }
  res.send(`can NOT find record ${_id}`);
  
});

// DELETE => DELETE
server.delete("/destinations", (req, res) => {
  const { _id } = req.query;
  for (let i in destinations){
    if (destinations[i]._id === _id){
      destinations.splice(i, 1);
      res.send(`deleted location record ${_id}`);
      return;
    }
  }
  res.send(`can NOT find record ${_id}`);
});

const port = process.env.port || 3000;

server.listen(port, () => {
  console.log("Server listening");
});