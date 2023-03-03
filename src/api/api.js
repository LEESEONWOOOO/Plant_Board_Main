const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3001;

// Enable CORS middleware
app.use(cors());

// Enable JSON request parsing middleware
app.use(express.json());

// Define the file path
const filePath = "./src/api/data/items.json";

// Read the items from the file
let items = [];
if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    items = JSON.parse(data);
}

// Define the routes
app.get("/items", (req, res) => {
    res.send(items);
});

app.post("/items", (req, res) => {
    const text = req.body.text;
    const newItem = { id: Date.now(), text: text };
    items.push(newItem);
    fs.writeFileSync(filePath, JSON.stringify(items), "utf-8");
    res.send(newItem);
});

app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index >= 0) {
        items.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(items), "utf-8");
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
