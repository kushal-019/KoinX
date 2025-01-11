import { Router } from "express";
import statsController from "../Controller/statsController";

const statsRouter = Router();

statsRouter.get("/", statsController);