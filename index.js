import express from "express";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import { readFileSync } from "fs";
import * as YAML from "yaml";

import { router } from "./src/controllers/customer.controller.js";

const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// configuration swagger
const file = readFileSync("./openapi.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/api/docs", serve, setup(swaggerDocument));

// api routers
app.use("/api/customers", router);

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}/api/docs`)
);
