import fs from "fs";

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
}

export default new HomeController();
