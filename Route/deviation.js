import { Router } from "express";
import deviatonController from "../Controller/deviationController.js";

const deviatonRouter = Router();

deviatonRouter.get("/:coin", deviatonController);

export default deviatonRouter;