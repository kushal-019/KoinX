import { Router } from "express";
import deviatonController from "../Controller/deviationController";

const deviatonRouter = Router();

deviatonRouter.get("/", deviatonController);

export default deviatonRouter;