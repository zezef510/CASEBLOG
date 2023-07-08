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

                    product2Service.findById(urlObject.query.idEdit).then((blog) => {
                        console.log(blog)
                        stringHTML = stringHTML.replace('{idBlog}',blog.idBlog)
                        stringHTML = stringHTML.replace('{category}',blog.category)
                        stringHTML = stringHTML.replace('{imageBlog}',blog.imageBlog )
                        stringHTML = stringHTML.replace('{title}', blog.title)
                        stringHTML = stringHTML.replace('{status}', blog.status)
                        stringHTML = stringHTML.replace('{shortDescription}', blog.shortDescription)
                        stringHTML = stringHTML.replace('{detailBlog}', blog.detailBlog)
                        stringHTML = stringHTML.replace('{startTime}', blog.startTime)
                        stringHTML = stringHTML.replace('{idUser}', blog.idUser)
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
        product2Service.findAll().then((blogs) => {
            for (const blog of blogs) {
                str += `<h3><img src="${blog.imageBlog}">,${blog.title}
  <a onclick="return window.confirm('Are you sure you want to edit')" href="/edit-product2?idEdit=${blog.idBlog}"><button>Edit</button></a>
<a onclick="return window.confirm('Are you sure you want to edit')" href="/delete2?id=${blog.idBlog}"><button>Delete</button></a>

</h3>`


            }
            stringHTML = stringHTML.replace('{list}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new Product2Controller();
