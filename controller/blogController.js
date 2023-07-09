import fs from "fs";
import qs from "qs";
import url from "url";
import blogService from "../service/blogService.js";

class BlogController {

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
                blogService.save(data).then(() => {
                    showList(req, res);
                })
            }
        })
    }

    showFormEdit(req, res) {
        fs.readFile('view/blog/edit.html', 'utf-8', (err, stringHTML) => {
            let data = '';
            req.on('data', dataRaw => {
                data += dataRaw;
            })
            req.on('end', () => {
                if (req.method === 'GET') {
                    let urlObject = url.parse(req.url, true);
                    blogService.findById(urlObject.query.idEdit).then((blog) => {
                        console.log(blog)
                        stringHTML = stringHTML.replace('{idBlog}', blog.idBlog)
                        stringHTML = stringHTML.replace('{category}', blog.category)
                        stringHTML = stringHTML.replace('{imageBlog}', blog.imageBlog)
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
                    blogService.update(data).then(() => {
                        showListUser(req, res,data)
                    })
                }
            })
        })
    }

    showFormAdd(req, res) {
        fs.readFile('view/blog/add.html', 'utf-8', (err, stringHTML) => {
            let urlObject = url.parse(req.url, true);
            console.log(urlObject.query.id, 0)
            stringHTML = stringHTML.replace('{idUser}', urlObject.query.id)
            res.write(stringHTML);
            res.end();
        })
    }

    showFormDelete(req, res) {
        let urlObject = url.parse(req.url, true);
        blogService.delete(urlObject.query.id).then()
        blogService.findById(urlObject.query.id).then((data)=>{
                console.log(data,0)
                showListUser(req, res,data)
        })
    }

    showByUser(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end', () => {
            if (req.method === 'GET') {
                fs.readFile('view/blog/listByUser.html', 'utf-8', (err, stringHTML) => {
                    let urlObject = url.parse(req.url, true);
                    let str = '';

                    blogService.findByUser(urlObject.query.id).then((blogs) => {
                        console.log(urlObject.query.id,0)
                        for (const blog of blogs) {
                            str += `<h3><img src="${blog.imageBlog}">,${blog.title},${blog.fullName}
                    <a onclick="return window.confirm('Are you sure you want to edit')" href="/edit-blog?idEdit=${blog.idBlog}"><button>Edit</button></a>
                    <a onclick="return window.confirm('Are you sure you want to edit')" href="/delete-blog?id=${blog.idBlog}"><button>Delete</button></a>
                    <a href="/bogs-user?idBlog=${blog.id}">Read More</a>
                    </h3>`
                        }
                        str += `<a onclick="return window.confirm('Are you sure you want to edit')" href="/add-blog?id=1"><button>ADD</button></a>`
                        stringHTML = stringHTML.replace('{listByUser}', str)
                        res.write(stringHTML);
                        res.end();
                    })
                })

            } else {
                data = qs.parse(data);
                blogService.save(data).then(() => {
                   showListUser(req,res,data)
                })
            }
        })
    }
}

function showList(req, res) {
    fs.readFile('view/blog/list.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        blogService.findAll().then((blogs) => {
            for (const blog of blogs) {
                str += `<h3><img src="${blog.imageBlog}">,${blog.title},${blog.fullName}
            
 </h3>`
            }
            stringHTML = stringHTML.replace('{list}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}

function showListUser(req, res,data) {
    fs.readFile('view/blog/listByUser.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        blogService.findByUser(data.idUser).then((blogs) => {
            console.log(blogs)
            for (const blog of blogs) {
                str += `<h3><img src="${blog.imageBlog}">,${blog.title},${blog.fullName}
                               <a onclick="return window.confirm('Are you sure you want to edit')" href="/edit-blog?idEdit=${blog.idBlog}"><button>Edit</button></a>
                               <a onclick="return window.confirm('Are you sure you want to edit')" href="/delete-blog?id=${blog.idBlog}"><button>Delete</button></a>
                               <a href="/bogs-user?idBlog=${blog.idBlog}">Read More</a>
                               </h3>`
            }
            str += `<a onclick="return window.confirm('Are you sure you want to edit')" href="/add-blog?id=1"><button>ADD</button></a>`
            stringHTML = stringHTML.replace('{listByUser}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new BlogController();
