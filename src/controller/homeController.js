import fs from "fs";
import blogService from "../service/blogService.js";

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
    showHome(req,res){
        fs.readFile('view/blog/list.html', 'utf-8', (err, stringHTML) => {
            let str = ``
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
}

export default new HomeController();
