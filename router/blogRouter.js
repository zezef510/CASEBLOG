import fs from 'fs'
import qs from "qs";

import product2Controller from "../controller/blogController.js";

let blogRouter = {
    '/blogs': product2Controller.showAll,
    '/add-blog': product2Controller.showFormAdd,
    '/edit-blog': product2Controller.showFormEdit,
    '/delete-blog': product2Controller.showFormDelete,
}

export default blogRouter;
