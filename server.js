const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const Busboy = require("busboy");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 8000;
const app = express();

let user; // I don't have a DB so I'm just making a global var.

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({
    extended: true

}));

let todos = [];

app.get("/", function (req, res) {
    res.render('index', {
        todos: todos
    });
});

app.post("/newtodo", (req, res) => {
    let newTodo = req.body;
    newTodo.complete = true;
    todos.push(newTodo);
    // console.log('todos: ', todos);
    res.redirect("/");
});















app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});