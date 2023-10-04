import fs from "fs";
import qs, {parse} from "qs";
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
                        showListUser(req, res, data)
                    })
                }
            })
        })
    }

    showFormAdd(req, res) {
        fs.readFile('view/blog/add.html', 'utf-8', (err, stringHTML) => {
            let urlObject = url.parse(req.url, true);
            stringHTML = stringHTML.replace('{idUser}', urlObject.query.id)
            res.write(stringHTML);
            res.end();
        })
    }

    showFormDelete(req, res) {
        let urlObject = url.parse(req.url, true);
        blogService.delete(urlObject.query.id).then()
        blogService.findById(urlObject.query.id).then((data) => {
            showListUser(req, res, data)
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
                        let str =``
                        fs.readFile('userLogined', 'utf-8', (err, id) => {

                            blogService.findByUser(id).then((blogs) => {
                                for (const blog of blogs) {
                                    str += `   <div class="row blog-item px-3 pb-5">
        <div class="col-md-5">
          <img class="img-fluid mb-4 mb-md-0" src="${blog.imageBlog}" alt="Image">
        </div>
        <div class="col-md-7">
          <h3 class="mt-md-4 px-md-3 mb-2 py-2 bg-white font-weight-bold">${blog.title}</h3>
          <div class="d-flex mb-3">

            <small class="mr-2 text-muted">${blog.fullName}</small>
            <small class="mr-2 text-muted"><i class="fa fa-calendar-alt"></i>${blog.startTime}</small>
            <small class="mr-2 text-muted"><i class="fa fa-folder"></i> ${blog.status}</small>
            <small class="mr-2 text-muted"><i class="fa fa-comments"></i> 15 Comments</small>
          </div>
          <p>
            ${blog.shortDescription}
          </p>
          <div class="button-row">
                  <a onclick="return window.confirm('Are you sure you want to edit')" href="/edit-blog?idEdit=${blog.idBlog}">
                    <button>Edit</button>
                  </a>
                  <a onclick="return window.confirm('Are you sure you want to delete')" href="/delete-blog?id=${blog.idBlog}">
                    <button>Delete</button>
                  </a>
                  <a href="/detail-blogs?id=${blog.id}" >Read More</a>
                </div>
        </div>
      </div>`
                                    stringHTML = stringHTML.replace('{image}', blog.image)
                                    stringHTML = stringHTML.replace('{fullName}', blog.fullName)
                                }
                                stringHTML = stringHTML.replace('{listByUser}', str)
                                stringHTML = stringHTML.replace('{id}', id)
                                stringHTML = stringHTML.replace('{id}', id)
                                stringHTML = stringHTML.replace('{id}', id)
                                stringHTML = stringHTML.replace('{id}', id)
                                stringHTML = stringHTML.replace('{id}', id)
                                console.log(id)
                                res.write(stringHTML);
                                res.end();})
                            })
                        })
                } else {
                    data = qs.parse(data);
                    console.log(data,0)
                    blogService.save(data).then(() => {
                        showListUser(req, res, data)
                    })
                }
            }
        )
    }
    showFormDetail (req,res){
        fs.readFile('view/blog/add.html', 'utf-8', (err, stringHTML) => {
            let urlObject = url.parse(req.url, true);
            blogService.findById( urlObject.query.id).then((blog)=>{
                fs.readFile('view/blog/detailBlog.html', 'utf-8', (err, stringHTML) => {
                    stringHTML = stringHTML.replace('{detailBog}',blog.detailBlog)
                    stringHTML = stringHTML.replace('{imageDetail}',blog.imageBlog)
                    stringHTML = stringHTML.replace('{ContentDetail}',blog.title)
                    stringHTML = stringHTML.replace('{time}',blog.startTime)
                    res.write(stringHTML);
                    res.end();
                })
            })
        })
    }
    showFormBlogUser(req,res){
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end', () => {
            data=parse(data)
            fs.readFile('view/blog/listByUser.html', 'utf-8', (err, stringHTML) => {
                let str =``
                fs.readFile('userLogined', 'utf-8', (err, id) => {

                    blogService.findByTitleUser(data.search,id).then((blogSearch)  => {
                        for (const blog of blogSearch) {
                            str += `   <div class="row blog-item px-3 pb-5">
        <div class="col-md-5">
          <img class="img-fluid mb-4 mb-md-0" src="${blog.imageBlog}" alt="Image">
        </div>
        <div class="col-md-7">
          <h3 class="mt-md-4 px-md-3 mb-2 py-2 bg-white font-weight-bold">${blog.title}</h3>
          <div class="d-flex mb-3">

            <small class="mr-2 text-muted">${blog.fullName}</small>
            <small class="mr-2 text-muted"><i class="fa fa-calendar-alt"></i> ${blog.startTime}</small>
            <small class="mr-2 text-muted"><i class="fa fa-folder"></i>${blog.status}</small>
            <small class="mr-2 text-muted"><i class="fa fa-comments"></i> 15 Comments</small>
          </div>
          <p>
            ${blog.shortDescription}
          </p>
          <div class="button-row">
                  <a onclick="return window.confirm('Are you sure you want to edit')" href="/edit-blog?idEdit=${blog.idBlog}">
                    <button>Edit</button>
                  </a>
                  <a onclick="return window.confirm('Are you sure you want to delete')" href="/delete-blog?id=${blog.idBlog}">
                    <button>Delete</button>
                  </a>
                  <a href="/detail-blogs?id=${blog.id}" >Read More</a>
                </div>
        </div>
      </div>`
                            stringHTML = stringHTML.replace('{image}', blog.image)
                            stringHTML = stringHTML.replace('{fullName}', blog.fullName)
                        }
                        stringHTML = stringHTML.replace('{listByUser}', str)
                        stringHTML = stringHTML.replace('{id}', id)
                        stringHTML = stringHTML.replace('{id}', id)
                        stringHTML = stringHTML.replace('{id}', id)
                        stringHTML = stringHTML.replace('{id}', id)
                        stringHTML = stringHTML.replace('{id}', id)
                        console.log(id)
                        res.write(stringHTML);
                        res.end();})
                })
            })

        })
    }
}

function showList(req, res) {
    fs.readFile('view/blog/list.html', 'utf-8', (err, stringHTML) => {
        let str = `<form action="/search-blogUser" method="POST">       
                 <input type="text" name="search"> <button >search</button>                                 
                 </form>`;
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

function

showListUser(req, res, data) {
    fs.readFile('view/blog/listByUser.html', 'utf-8', (err, stringHTML) => {
        let str = ``
        fs.readFile('userLogined', 'utf-8', (err, id) => {

            blogService.findByUser(data.idUser).then((blogs) => {
                for (const blog of blogs) {
                    str += `   <div class="row blog-item px-3 pb-5">
        <div class="col-md-5" >
          <img class="img-fluid mb-4 mb-md-0" src="${blog.imageBlog}" style="height: 300px" alt="Image">
        </div>
        <div class="col-md-7">
          <h3 class="mt-md-4 px-md-3 mb-2 py-2 bg-white font-weight-bold">${blog.title}</h3>
          <div class="d-flex mb-3">

            <small class="mr-2 text-muted">${blog.fullName}</small>
            <small class="mr-2 text-muted"><i class="fa fa-calendar-alt"></i> ${blog.startTime}</small>
            <small class="mr-2 text-muted"><i class="fa fa-folder"></i> ${blog.status}</small>
            <small class="mr-2 text-muted"><i class="fa fa-comments"></i> 15 Comments</small>
          </div>
          <p>
            ${blog.shortDescription}
          </p>
          <div class="button-row">
                  <a onclick="return window.confirm('Are you sure you want to edit')" href="/edit-blog?idEdit=${blog.idBlog}">
                    <button>Edit</button>
                  </a>
                  <a onclick="return window.confirm('Are you sure you want to delete')" href="/delete-blog?id=${blog.idBlog}">
                    <button>Delete</button>
                  </a>
                  <a href="/detail-blogs?id=${blog.id}" >Read More</a>
                </div>
        </div>
      </div>`
                    stringHTML = stringHTML.replace('{image}', blog.image)
                    stringHTML = stringHTML.replace('{fullName}', blog.fullName)
                }
                stringHTML = stringHTML.replace('{listByUser}', str)

                stringHTML = stringHTML.replace('{id}', id)
                stringHTML = stringHTML.replace('{id}', id)
                stringHTML = stringHTML.replace('{id}', id)
                stringHTML = stringHTML.replace('{id}', id)
                stringHTML = stringHTML.replace('{id}', id)
                console.log(id)
                res.write(stringHTML);
                res.end();
            })
        })
    })
}

export default new

BlogController();
