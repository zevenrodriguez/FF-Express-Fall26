const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");

app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hello from express");
});

app.get("/hello", (req,res)=>{
    res.send("hello world");
});

app.get("/home", (req,res)=>{
    res.render("home", {title:"My home page"});
});

app.get("/form", (req, res)=>{
    res.render("survey", {title:"Survey"});
});

app.post("/form", (req,res)=>{
    //res.send("form processed");
    console.log(req.body.animal);
    const animal = req.body.animal; //animal that i selected from the form

    let votes = {
        narwhal:0,
        seal:0,
        penguin:0
    };

    if(req.cookies.votes !== undefined){
        votes = req.cookies.votes;
    }

    if(votes[animal] === undefined){
        votes[animal] = 0
    }

    votes[animal] = votes[animal] + 1;

    res.cookie("votes", votes, {maxAge: 7 * 24 * 60 * 60 * 1000});

    res.render("response", {
        votes: votes
    });
});

app.delete("/clear", (req,res)=>{
    res.clearCookie("votes");
    res.send("Votes cleared" + "<a href='/form'>Back to form</a>");
});

app.get("/:name", (req, res)=>{
    res.send("My name is: " + req.params.name);
});



//end of code
app.listen(port, ()=>{
    console.log("Server Running at http://localhost:${port}");
});