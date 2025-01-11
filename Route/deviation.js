import { Router } from "express";
import deviatonController from "../Controller/deviationController.js";

const deviatonRouter = Router();

deviatonRouter.get("/:id", deviatonController);

export default deviatonRouter;