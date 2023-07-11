import fs from 'fs'
import qs from "qs";

import blogController from "../controller/blogController.js";
let blogRouter = {
    '/blogs': blogController.showAll,
    '/bogs-user': blogController.showByUser,
    '/add-blog': blogController.showFormAdd,
    '/edit-blog': blogController.showFormEdit,
    '/delete-blog': blogController.showFormDelete,
    '/detail-blogs': blogController.showFormDetail,
    '/search-blogUser': blogController.showFormBlogUser,


}

export default blogRouter;
