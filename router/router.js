import fs from 'fs'
import productRouter from "./productRouter.js";
import product2Router from "./product2Router.js";
import userRouter from "./userRouter.js";
import homeController from "../controller/homeController.js";


let router = {
    '/': homeController.showIndex,
    '/err': homeController.showErr,
}
router = {...router, ...productRouter};
router = {...router, ...product2Router};
router = {...router, ...userRouter};
export default router;
