import { Router } from "express";
import daviatonController from "../Controller/deviationController";

const daviatonRouter = Router();

daviatonRouter.get("/", daviatonController);