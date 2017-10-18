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
    let complete = [];
    let incomplete = [];

    todos.forEach(todo => {
        if (todo.complete) {
            complete.push(todo);
        } else {
            incomplete.push(todo);
        }
    })

    res.render('index', {
        todos: { complete: complete, incomplete: incomplete }
    });
});

app.post("/newtodo", (req, res) => {
    let newTodo = req.body;
    newTodo.complete = false;
    todos.push(newTodo);
    // console.log('todos: ', todos);
    res.redirect("/");
});

app.post("/complete/:todo", (req, res) => {
    let task = req.params.todo;
    let foundTodo = todos.find(function (todo) {
        return todo.task === task;
    });
    foundTodo.complete = !foundTodo.complete;
    res.redirect("/")
})
// 39-50 this is the todo.task of one 
// use the array.find() method to find the matghing object

// find the matching todo using the url todo param
// mark that todo.complete as true
// redirect to "/"















app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});