import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("server is running.");
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
