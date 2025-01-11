import { Router } from "express";
import statsController from "../Controller/statsController.js";

const statsRouter = Router();

statsRouter.get("/:coin", statsController);

export default statsRouter;