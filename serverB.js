var http = require("http");
var fs = require("fs");
var url = require("url"); 
var path = require("path");
function staticRoot(staticaPath,req,res) {
	var pathObj = url.parse(req.url,true);
	var pathname = pathObj.pathname;
	var filePath = path.join(staticaPath,pathname);
	console.log(pathname)
	if (pathname==="/") {
		pathname+="B.html";
	}
	switch(pathname){
		case "/getcolor":
			var color = getRandColor();
		    var type = pathObj.query.type;
			res.end(type+"("+"'"+color+"'"+")");
			break;
		default:
		fs.readFile(filePath,"binary",function(err,data){
			if (err) {
				res.writeHead(404,"not Found");
				res.write("<h1>404 Not Found</h1>");
			}else{
				res.writeHead(200,"ok");
		  		res.write(data,"binary")
		  		res.end();
			}
		});
	}
}
function random(a,b){
            return a+Math.round(Math.random()*(b-a))
        }
function getRandColor(){
			var arr = ["#"];
			for (var i = 0; i < 3; i++) {
				arr.push(random(0,255).toString(16));
			}
			return arr.join("");
}
http.createServer(function (req,res) {
	 staticRoot(path.join(__dirname,"static"),req,res);
}).listen(8080)