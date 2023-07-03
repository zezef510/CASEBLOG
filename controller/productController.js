import fs from "fs";
import productService from "../service/productService.js";
import qs from "qs";
import url from "url";

class ProductController {

    showAll(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end',  () => {
            if (req.method === 'GET') {
                showList(req, res);
            } else {
                data = qs.parse(data);
                console.log(data)
                productService.save(data). then(()=>{
                    showList(req, res);
                })

            }
        })
    }

    showFormEdit(req, res) {
        fs.readFile('view/product/edit.html', 'utf-8', (err, stringHTML) => {
            let urlObject = url.parse(req.url, true)
            res.write(stringHTML);
            res.end();
        })
    }

    showFormAdd(req, res) {
        fs.readFile('view/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }


}

function showList(req, res) {
    fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        productService.findAll().then((products)=> {
            for (const product of products) {
                str+=`<h3>${product.name}</h3>`
            }
            stringHTML = stringHTML.replace('{list}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new ProductController();
