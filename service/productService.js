import connection from "../connection.js";


class ProductService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query('select * from product', (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(products)
                    resolve(products)
                }
            })
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`insert into product value (${product.id},'${product.name}',${product.price},${product.quantity},'${product.image}')`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(products)
                    resolve(products)
                }
            })
        })
    }

    findById(id) {
    }
}

export default new ProductService();
