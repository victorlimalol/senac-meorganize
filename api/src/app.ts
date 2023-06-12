import 'express-async-errors';
import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import router from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.status(400).json({
    name: error.name,
    message: error.message
  })
})

app.listen(3333, () => {
  console.log("App starting in port 3333")
});