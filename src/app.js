import express from "express";

const app = express();

app.get("/", async (req, res, next) => {
   res.json("Hello");
});

export default app;
