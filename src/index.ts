import { existsSync } from "fs";
import build from "./app";

import dotenv from "dotenv";

if (existsSync(".env")) {
    dotenv.config();
    if (!process.env.DOWNLOAD_PATH) {
        console.log("No DOWNLOAD_PATH found in .env file. Exiting...");
        process.exit(1);
    }
}
else {
    console.log("No .env file found. Exiting...");
    process.exit(1);
}

const app = build({logger : false, bodyLimit: 100 * 1024 * 1024 * 1024});

app.listen( {port : 36000, host : "0.0.0.0"}, (error, address) => {
    if (error) {
        console.log(error);
        process.exit(1);
    }
});