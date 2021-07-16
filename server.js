const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

const destinations = {
  1234: {
    _id: "1234",
    name: "The Needle",
    location: "Seattle, WA",
    photo:
      "https://media.cntraveler.com/photos/59de395b18d971147f4bcc8e/4:3/w_3036,h_2277,c_limit/Seattle-Space-Needle_GettyImages-180262211.jpg",
    description: "",
  },
  3453: {
    _id: "3453",
    name: "The Eiffel Tower",
    location: "Paris, France",
    photo:
      "https://lh5.googleusercontent.com/p/AF1QipMyFp7DDFxwIv3Idp4YKibGJ2zhm0l9UAsFIDDh=w203-h135-k-no",
    description: "Romantic place",
  },
};

// CRUD
// CREATE => POST
server.post("/destinations", (req, res) => {
  const _id = idGenerator();
  const newRecord = {
    _id,
    ...req.body
  }
  destinations[_id]=newRecord;

  res.send({ status: "success" });
});

// READ => GET
server.get("/destinations", (req, res) => {
  res.send(destinations);
});

// UPDATE => PUT
server.put("/destinations", (req, res) => {
  const _id = req.query._id;
  const target = destinations[_id];
  if (!target){
    res.send(`can NOT find record ${_id}`);
  } else {
    destinations[_id] = {...req.body, _id};
    res.send(`updated record id ${_id}`);
  }
});

// DELETE => DELETE
server.delete("/destinations", (req, res) => {
  const { _id } = req.query;
  const target = destinations[_id];

  if (!target){
    res.send(`can NOT find record ${_id}`);
  } else {
    delete destinations[_id];
    res.send(`deleted location record ${_id}`);
  }
  
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Server listening");
});


function idGenerator(){
  const newID = () => Math.floor(1000 + Math.random() * 9000);
  let result = newID();
  while (destinations[result]){
    result = newID()
  }
  return result;
}