const express = require('express')
const app = express()

var serve = require("./src/app.js")
app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.all('*',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods","*");
	// res.setHeader('Content-Type','application/json;charset=utf-8');
	next();
});

app.post("/",serve.addList)

app.get('/',serve.getList)
app.get('/detail/:name',serve.detail)

app.listen(3003);
console.log("启动3003");