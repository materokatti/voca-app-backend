const {createServer} = require("http");
const {createReadStream} = require("fs");

const sendFile = (res, status, type, file) => {
  res.writeHead(status, {"Content-Type": type});
  createReadStream(file).pipe(res);
};

createServer((req, res) => {
  switch (req.url) {
    case "/":
      return sendFile(res, 200, "text/html", "./index.html");
    case "/index.js":
      return sendFile(res, 200, "text/javascript", "./index.js");
    case "/style.css":
      return sendFile(res, 200, "text/css", "./css/style.css");
    default:
      return sendFile(res, 404, "text/html", "./404.html");
  }
}).listen(3000, () =>
  console.log("Server running - 3000 \n http://localhost:3000")
);
