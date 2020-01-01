const http = require('http');

const server = http.createServer((req, res) => {
  res.end("Welcome to server scripting STRING");
});


server.listen(process.env.PORT || "3000");



