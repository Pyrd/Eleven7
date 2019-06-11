var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('../dbContext');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


//GET API
router.get("/stock/products", function(req , res){
    let q = `SELECT P.product_id, P.name, C.name as category_name,P.category_id, P.price_tag, P.description FROM product_catalog as P FULL JOIN product_category AS C on C.category_id = P.category_id WHERE P.product_id is not null`
    console.log(q)
    db.queryExec(res, q);
});

//Get product by id
router.get("/stock/product/:id", function(req , res){
    let id = req.params.id;
    let q =`SELECT P.product_id, P.name, C.category_id, C.description as category_description, C.name as category_name, P.price_tag, P.description FROM product_catalog as P FULL JOIN product_category AS C on C.category_id = P.category_id WHERE product_id = ${id};`
    db.queryExec(res, q);
});

//Get all product categories
router.get("/stock/product_category", function(req , res){
    let id = req.params.id;
    let q =`SELECT * FROM product_category;`
    db.queryExec(res, q);
});

//Post new product
router.post("/stock/product/add/", function(req , res){
    let r = req.body
    var q = `INSERT INTO product_catalog VALUES('${r.name}', ${r.category_id}, '${r.description}', ${r.price_tag}, NULL); INSERT INTO inventory SELECT S.store_id, (SELECT product_id from product_catalog WHERE product_id = SCOPE_IDENTITY()), 0 FROM stores AS S `;
    db.queryExec(res, q, (err, result)=> {if(err){res.status(401).send("Somethind bad happen")} else {res.status(200).send("Product Successfully inserted")}});
});

//Post edit product
router.post("/stock/product/edit/", function(req , res){
    let r = req.body
    var q = `UPDATE product_catalog SET name = '${r.name}', category_id= ${r.category_id}, description= '${r.description}', price_tag= ${r.price_tag} WHERE product_id = ${r.product_id};`
    console.log(q)

    db.queryExec(res, q, (err, result)=> {if(err){res.status(401).send("Somethind bad happen")} else {res.status(200).send("Product Successfully modified")}});
});

//Post delete product
router.post("/stock/product/delete/:id", function(req , res){
    let id = req.params.id;
    var q = `DELETE FROM product_catalog WHERE product_id = ${id};`
    console.log(q)

    db.queryExec(res, q, (err, result)=> {if(err){res.status(401).send("Somethind bad happen")} else {res.status(200).send("Item Successfully deleted")}});
});

//Get inventories
router.get("/stock/inventory", function(req , res){
    let q = `SELECT * FROM inventory`
    console.log(q)
    db.queryExec(res, q);
});

//Get inventory by id
router.get("/stock/inventory/:id", function(req , res){
    let id = req.params.id;
    let q =`SELECT I.store_id, I.product_id, quantity, P.name, C.name as category_name  FROM inventory AS I FULL JOIN product_catalog AS P ON I.product_id = P.product_id FULL JOIN product_category AS C ON C.category_id = P.category_id WHERE store_id = ${id};`
    db.queryExec(res, q);
});

//Post edit inventories
router.post("/stock/inveotory/edit/", function(req , res){
    let r = req.body.items
    let q = ''
    for(var i = 0; i < r.length; i++){
        var t = `UPDATE inventory SET quantity= ${r[i].quantity} WHERE store_id = ${r[i].store_id} AND product_id = ${r[i].product_id};`
        q+= t
    }
    console.log(q)
    db.queryExec(res, q, (err, result)=> {if(err){res.status(401).send("Somethind bad happen")} else {res.status(200).send("Inventory Successfully modified")}});
});


module.exports = router;