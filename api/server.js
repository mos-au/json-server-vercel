// See https://github.com/typicode/json-server#module
const jsonServer = require("json-server");
const cors = require("cors");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const server = jsonServer.create();

// Uncomment to allow write operations
// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)

// Comment out to allow write operations
server.use(cors());
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults({ noCors: true });

server.use(middlewares);
// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/blog/:resource/:id/show": "/:resource/:id",
  })
);
server.use(router);

server.post("/upload", upload.single("image"), function (req, res, next) {
  // req.file is the `image` file
  // req.body will hold the text fields, if there were any
  res.json(req.file);
});

server.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
