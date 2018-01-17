var http = require("http");
var fs = require("fs");
var url = require("url"); 
var path = require("path");
function staticRoot(staticaPath,req,res) {
	var pathObj = url.parse(req.url);
	var pathname = pathObj.pathname;
	if (pathname==="/") {
		pathname+="A.html";
	}
		var filePath = path.join(staticaPath,pathname)
		fs.readFile(filePath,"binary",function(err,data){
			if (err) {
				res.writeHead(404,"not Found");
				res.write("<h1>404 Not Found</h1>");
				console.log("1");
			}else{
				res.writeHead(200,"ok");
		  		res.write(data,"binary")
		  		res.end();
			}
		});
		
}
http.createServer(function (req,res) {
	 staticRoot(path.join(__dirname,"static"),req,res);
}).listen(9000)