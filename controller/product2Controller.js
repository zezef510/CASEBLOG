import fs from "fs";
import product2Service from "../service/product2Service.js";
import qs from "qs";
import url from "url";

class Product2Controller {

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
                product2Service.save(data).then(() => {
                    showList(req, res);
                })
            }
        })
    }

    showFormEdit(req, res) {
        fs.readFile('view/product2/edit.html', 'utf-8', (err, stringHTML) => {
            let data = '';
            req.on('data', dataRaw => {
                data += dataRaw;
            })
            req.on('end', () => {
                if (req.method === 'GET') {
                    let urlObject = url.parse(req.url, true);
                    product2Service.findById(urlObject.query.idEdit).then((product) => {
                        stringHTML = stringHTML.replace('{id}', product.id)
                        stringHTML = stringHTML.replace('{name}', product.name)
                        stringHTML = stringHTML.replace('{price}', product.price)
                        stringHTML = stringHTML.replace('{quantity}', product.quantity)
                        stringHTML = stringHTML.replace('{image}', product.image)
                        stringHTML = stringHTML.replace('{idcategory}', product.idcategory)
                        res.write(stringHTML);
                        res.end();
                    })
                } else {
                    data = qs.parse(data);
                    product2Service.update(data).then(() => {
                        showList(req, res);
                    })
                }
            })
        })
    }

    showFormAdd(req, res) {
        fs.readFile('view/product2/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }

    showFormDelete(req, res) {
        let urlObject = url.parse(req.url, true);
        product2Service.delete(urlObject.query.id).then(() => {
            res.writeHead(301, {'location': '/product2s'});
            res.end()

        })
    }
}

function showList(req, res) {
    fs.readFile('view/product2/list.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        product2Service.findAll().then((products) => {
            console.log(products)
            for (const product of products) {
                str += `<h3>${product.name},${product.category}
  <a onclick="return window.confirm('Are you sure you want to edit')" href="/edit-product2?idEdit=${product.id}"><button>Edit</button></a>
<a onclick="return window.confirm('Are you sure you want to edit')" href="/delete2?id=${product.id}"><button>Delete</button></a>

</h3>`


            }
            stringHTML = stringHTML.replace('{list}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new Product2Controller();
