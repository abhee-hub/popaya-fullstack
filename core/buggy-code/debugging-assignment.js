const express = require("express");
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Amit", email: "amit@test.com" },
  { id: 2, name: "Riya", email: "riya@test.com" }
];

const notes = [
  { id: 1, title: "Note 1", content: "Content 1", userId: 1 },
  { id: 2, title: "Note 2", content: "Content 2", userId: 2 }
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = getUserById(id);
  if(!user){
    res.status(404).send({message:"User fot found!"})
  }
  res.send(user);
});

function getUserById(id) {
  return users.find(u => u.id === id);
}

app.get("/notes/count", (req, res) => {
  const total = notes.length;
  res.send({ total });
});

app.get("/external-data", async (req, res) => {
  const data = await fetchExternalData();
  res.send(data);
});

async function fetchExternalData(){
  return {message:"External data received!"}
}

app.get("/notes", (req, res) => {
  if (notes.length === 0 ) {
    return res.send({message:"No notes found"})
  }
  res.send(notes);
});

function generateNoteId() {
  return Math.floor(Math.random() * 1000);
}


app.post("/notes", (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res.status(400).send({message:"Invalid input"});
  }

  const newNote = {
    id: generateNoteId(),
    title,
    content,
    userId
  };

  notes.push(newNote);
  res.status(201).send(newNote);
});

app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const noteIndex = notes.findIndex(n => n.id === id);

  if(noteIndex === -1){
    return res.status(404).send({message:"Note not found!"})
  }

  notes.splice(noteIndex, 1);
  res.send({ message: "Note deleted" });

});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === id);

  if(!user){
    return res.status(404).send({message:"User not found!"})
  }

  if(!name){
    return res.status(400).send({message:"Name is required!"})
  }

  user.name = name;

  res.send(user);
});

app.get("/user-notes/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const userNotes = notes.filter(n => n.userId === userId);

  if(userNotes.length === 0){
    return res.status(404).send({message:"Notes not found!"})
  }

  res.send(userNotes);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@test.com" && password === "123456") {
    res.send({ message: "Login successful" });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

app.get("/profile/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if(!user){
    return res.status(404).send({message:"User not found !"})
  }

  res.send(user);
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  const total = Number(a) + Number(b);
  res.send({ total });
});

app.get("/", (req, res)=>{
  res.send("This is debugging assignment!")
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});