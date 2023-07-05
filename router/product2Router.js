import fs from 'fs'
import qs from "qs";

import product2Controller from "../controller/product2Controller.js";

let product2Router = {
    '/product2s': product2Controller.showAll,
    '/add-product2': product2Controller.showFormAdd,
    '/edit-product2': product2Controller.showFormEdit,
    '/delete2': product2Controller.showFormDelete,
}

export default product2Router;
