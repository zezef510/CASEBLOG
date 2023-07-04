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
        req.on('end', () => {
            if (req.method === 'GET') {
                showList(req, res);
            } else {
                data = qs.parse(data);
                productService.save(data).then(() => {
                    showList(req, res);
                })
            }
        })
    }

    showFormEdit(req, res) {
        fs.readFile('view/product/edit.html', 'utf-8', (err, stringHTML) => {
            let data = '';
            req.on('data', dataRaw => {
                data += dataRaw;
            })
            req.on('end', () => {
                if (req.method === 'GET') {
                    let urlObject = url.parse(req.url, true);
                    productService.findById(urlObject.query.idEdit).then((product) => {
                        stringHTML = stringHTML.replace('{id}', product.id)
                        stringHTML = stringHTML.replace('{name}', product.name)
                        stringHTML = stringHTML.replace('{price}', product.price)
                        stringHTML = stringHTML.replace('{quantity}', product.quantity)
                        stringHTML = stringHTML.replace('{image}', product.image)
                        res.write(stringHTML);
                        res.end();
                    })
                } else {
                    data = qs.parse(data);
                    productService.update(data).then(() => {
                        showList(req, res);
                    })
                }
            })
        })
    }

    showFormAdd(req, res) {
        fs.readFile('view/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }

    showFormDelete(req,res) {
        let urlObject = url.parse(req.url, true);
        productService.delete(urlObject.query.id).then(() => {
            res.writeHead(301, {'location':'/products'});
            res.end()

        })
    }
}

function showList(req, res) {
    fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        productService.findAll().then((products) => {
            for (const product of products) {
                str += `<h3>${product.name}  <a onclick="return window.confirm('Are you sure you want to edit')" href="/edit-product?idEdit=${product.id}"><button>Edit</button></a>
<a onclick="return window.confirm('Are you sure you want to edit')" href="/delete?id=${product.id}"><button>Delete</button></a>
</h3>`


            }
            stringHTML = stringHTML.replace('{list}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new ProductController();
