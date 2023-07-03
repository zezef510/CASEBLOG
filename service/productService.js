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
                    resolve(products)
                }
            })
        })
    }


    findById(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from product where id = ${id}`,(err, products) => {
                if(err){
                    reject(err)
                } else {
                    resolve(products[0])
                }
            })
        })
    }
    update (product){
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`update product Set name ='${product.name}',price =${product.price},quantity =${product.quantity},image ='${product.image}' where id= ${product.id}`,(err, products) => {
                if(err){
                    reject(err)
                } else {
                    console.log(`update thanh cong`)
                    resolve(products)
                }
            })
        })
    }
}

export default new ProductService();
