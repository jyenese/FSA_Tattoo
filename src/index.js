const express = require('express');
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        data: "Full Stack app"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})