// Dependencies
const express = require("express");

// PORT
const PORT = process.env.PORT || 3001;

// server
const app = express();

// middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//listen PORT
app.listen(PORT, () => {
    console.log(`listen on http://localhost:${PORT}`);
});