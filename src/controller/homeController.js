import fs from "fs";
import blogService from "../service/blogService.js";
import qs from "qs";

class HomeController {
    showIndex(req, res) {
        fs.readFile('view/food-home/home.html', 'utf-8', (err, stringHTML) => {
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
                    str += `
               
                <div class="card" style="width: 36rem; margin: 20px 40px 100px 10px">
                <img class="card-img-top" src="${blog.imageBlog}"  height="350px" alt="Card image cap">
                 <div class="card-body">
                 <h5 class="card-title">${blog.title}</h5>
                <p class="card-text" style="text-align: left">${blog.shortDescription}</p>
                <p> ${blog.fullName}</p>
                <a href="#" class="btn btn-primary">Read details</a>
                </div>
                </div>
                `;
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