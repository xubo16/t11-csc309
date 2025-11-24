import dotenv from "dotenv";
dotenv.config();

import app from "./index.js";

const port = process.env.PORT || 3000;

console.log("=== Server Startup Debug ===");
console.log("process.env.PORT:", process.env.PORT);
console.log("Using port:", port);
console.log("NODE_ENV:", process.env.NODE_ENV);

const server = app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
    console.log("=== Server Ready ===");
});

server.on("error", (err) => {
    console.error(`cannot start server: ${err.message}`);
    process.exit(1);
});