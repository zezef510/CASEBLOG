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
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end', () => {
            if (req.method === 'GET') {
                fs.readFile('view/blog/list.html', 'utf-8', (err, stringHTML) => {
                    let str = ``
                    blogService.findAll().then((blogs) => {
                        for (const blog of blogs) {
                            str += `
               <div class="col-4">
                <div class="card" >
                  <img src="${blog.imageBlog}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${blog.title}</h5>
                        <p class="card-text">${blog.shortDescription}</p>
                        <a href="#" class="btn btn-primary">${blog.username}</a>
                     </div>
                  </div>
               </div>`;
                        }
                        stringHTML = stringHTML.replace('{list}', str)
                        fs.readFile('userLogined', 'utf-8', (err, id) => {
                            stringHTML = stringHTML.replace('{id}', id)
                            res.write(stringHTML);
                            res.end();
                        })
                    })
                })

            } else {

                data = qs.parse(data);
                blogService.findByTitle(data.search).then((datas) => {
                    fs.readFile('view/blog/list.html', 'utf-8', (err, stringHTML) => {
                        let str = ``
                        for (const blog of datas) {
                                str += `
               <div class="col-4">
                <div class="card" >
                  <img src="${blog.imageBlog}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${blog.title}</h5>
                        <p class="card-text">${blog.shortDescription}</p>
                        <a href="#" class="btn btn-primary">${blog.username}</a>
                     </div>
                  </div>
               </div>`;
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