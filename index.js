const express = require("express");
const connectDB = require("./db.js")
const app = express();
const port = 5001;

app.get("/", (req, res) => {
    res.send("API RUNNING...");
})

connectDB();

app.listen(port, () => console.log(`Server started on port ${port}`));

// allow us to get the data in request.body
app.use(express.json({ extended: false })); 