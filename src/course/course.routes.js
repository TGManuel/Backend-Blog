import { Router } from "express";
import { getCoursesByName } from "./course.controller.js";

const router = Router();

router.get(
    "/:name", 
    getCoursesByName
);

export default router;







