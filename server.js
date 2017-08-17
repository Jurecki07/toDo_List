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
    newTodo.complete = false;
    todos.push(newTodo);
    // console.log('todos: ', todos);
    res.redirect("/");
});

app.post("/complete/:todo", (req, res)=>{
    // save the url parameter in a var. 
    // find the matching todo using the url todo param
    // mark that todo.complete as true
    // redirect to "/"
    res.send(req.params.todo)
})
// app.get('/', routes.index);
// app.get('/tasks', tasks.list);
// app.post('/tasks', tasks.markAllCompleted)
// app.post('/tasks', tasks.add);
// app.post('/tasks/:task_id', tasks.markCompleted);
// app.delete('/tasks/:task_id', tasks.del);
// app.get('/tasks/completed', tasks.completed);














app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});