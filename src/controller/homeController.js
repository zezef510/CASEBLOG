import fs from "fs";
import blogService from "../service/blogService.js";
import qs from "qs";

class HomeController {
    showIndex(req, res) {
        fs.readFile('view/index.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }

    showErr(req, res) {
        fs.readFile('view/err.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }

    showHome(req, res) {
        let data = '';

        req.on('data', dataRaw => {
            data += dataRaw;
        })

        req.on('end', () => {
            if (req.method === 'GET') {
                showListHome(req, res)
            } else {
                data = qs.parse(data);

                blogService.findByTitle(data.search).then((blogs) => {
                    fs.readFile('view/blog/list.html', 'utf-8', (err, stringHTML) => {
                        let str = `<form action="/home" method="POST">
                                 <input type="text" name="search"> <button >search</button>
                                 </form> `
                        for (let item of blogs) {
                            str += `<h3><img src="${item.imageBlog}">,${item.title},${item.fullName}</h3>`
                        }
                        stringHTML = stringHTML.replace('{list}', str)
                        fs.readFile('userLogined', 'utf-8', (err, id) => {
                            stringHTML = stringHTML.replace('{id}', id)
                            res.write(stringHTML);
                            res.end();
                        })
                    })

                })
            }
                // blogService.findByTitle(data).then(() => {
                //     showListHome(req,res// }
        })

    }
}

export default new HomeController();

function showListHome(req, res) {
    fs.readFile('view/blog/list.html', 'utf-8', (err, stringHTML) => {
        let str = `<form action="/home" method="POST">
<input type="text" name="search"> <button >search</button>
</form>   `
        blogService.findAll().then((blogs) => {
            for (const blog of blogs) {
                str += `<h3><img src="${blog.imageBlog}">,${blog.title},${blog.fullName}</h3>`
            }
            stringHTML = stringHTML.replace('{list}', str)
            fs.readFile('userLogined', 'utf-8', (err, id) => {
                stringHTML = stringHTML.replace('{id}', id)
                res.write(stringHTML);
                res.end();
            })
        })
    })
}