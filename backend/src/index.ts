import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

// helps to convert the body of the request into a json object
app.use(express.json());
// helps us to parse the end point of the request
app.use(express.urlencoded({ extended: true }));
// cors is a security things, prevents certain request from being blocked by the browser
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
