import express from "express";
import helmet from "helmet";

import accountRoutes from "./routes/account.route";
import { errorHandler } from "./middlewares/error-handler";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Ozore Bank!");
});

app.use("/account", accountRoutes);
app.use(helmet());
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
