const { createServer } = require("http");

createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(`
    <!doctype html>
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <h1>Hello World</h1>
        <p>${req.method} request made for ${req.url}</p>
      </body>
    </html>
  `);
}).listen(3000, () => console.log("Server running - 3000"));
