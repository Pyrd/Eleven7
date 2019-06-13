var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./../dbContext');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


//GET API
router.get("/stores", function(req , res){
    let q = `SELECT S.store_id, T.size, opening_date, street_num, address_1, address_2, zip_code, city_name, country 
	FROM (stores as S 
			FULL JOIN addresses as A ON (S.address_id = A.address_id)
			FULL JOIN (SELECT store_id, COUNT(E.store_id) as size  FROM (select * from employees where date_end is null) as E GROUP BY E.store_id) as T ON T.store_id = S.store_id
	) 
    WHERE S.store_id IS NOT NULL;`
    console.log(q)
    db.queryExec(res, q);
});

router.get("/stores/:id", function(req , res){
    let id = req.params.id;
    let q =`SELECT S.store_id, T.size, opening_date, street_num, address_1, address_2, zip_code, city_name, country 
	FROM (stores as S 
			FULL JOIN addresses as A ON (S.address_id = A.address_id)
			FULL JOIN (SELECT store_id, COUNT(E.store_id) as size  FROM (select * from employees) as E GROUP BY E.store_id) as T ON T.store_id = S.store_id
	) 
    WHERE S.store_id = ${id};`
    db.queryExec(res, q);
});


router.get("/stores/sale/:id", function(req , res){
    let id = req.params.id;
    console.log("Mama")
    let q =`SELECT * FROM sales WHERE sale_id = ${id};`
    console.log(q)
    db.queryExec(res, q);
});

//SALES ITEMS (id = sale_id)
router.get("/stores/salesproducts/:id", function(req , res){
    let id = req.params.id;
    console.log("Papa")
    let q =`SELECT sale_id, product_id, name, quantity, price_tag from sales_item as S FULL JOIN product_catalog as P ON S.item_id = P.product_id WHERE S.sale_id = ${id}`
    db.queryExec(res, q);
});

router.post("/stores/sales/add/many", function(req , res){
    let r = req.body
    console.log(r);
    let q = ''
    for(var i = 0; i < r.length; i++){
        var t = `INSERT INTO sales (store_id, sale_date, total_price, total_item) VALUES(${r[i].store_id}, '${r[i].sale_date}', ${r[i].total_price}, ${r[i].total_item});`
        
        var t2 = 'INSERT INTO sales_item VALUES'
        var t3 = ''
        for(var j = 0; j < r[i].products.length; j++){
            t2 += `(IDENT_CURRENT('sales'), ${r[i].products[j].product_id}, 1)`;
            if(j != r[i].products.length - 1){
                t2 += ','
            }
            t3 += `UPDATE inventory SET quantity = quantity - 1 WHERE product_id = ${r[i].products[j].product_id} AND store_id = ${r[i].store_id};`
            
        }
        t2 += ';'
        q += t
        q += t2
        q += t3
    }
    console.log(q)
    db.queryExec(res, q, (err, result)=> {if(err){res.status(401).send("Somethind bad happen")} else {res.status(200).send("Inventory Successfully modified")}});
});

router.post("/stores/supply/add/", function(req , res){
    let r = req.body
    //console.log(r);
    let q = ''
    var t = `INSERT INTO product_supply (store_id, supply_date, total_item) VALUES(${r.store_id}, '${r.supply_date}', ${r.total_item});`

    var t2 = 'INSERT INTO product_supply_item VALUES'
    var t3 = ''
    for(var j = 0; j < r.products.length; j++){
        t2 += `(IDENT_CURRENT('product_supply'), ${r.products[j].product_id}, ${r.products[j].quantity})`;
        if(j != r.products.length - 1){
            t2 += ','
        }
        t3 += `UPDATE inventory SET quantity = quantity + ${r.products[j].quantity} WHERE product_id = ${r.products[j].product_id} AND store_id = ${r.store_id};`
        
    }
    t2 += ';'
    q += t
    q += t2
    q += t3
    //console.log(q)
    db.queryExec(res, q, (err, result)=> {if(err){res.status(401).send("Somethind bad happen")} else {res.status(200).send("Inventory Successfully modified")}});
});

router.post("/stores/supply/get/", function(req , res){
    let r = req.body
    let query_mode = r.query_mode   //0 ALL //1 WEEK //2 DAY
    let id = r.store_id
    let q = 'SELECT * from product_supply AS S'
    if(id != -1){
        q += ` WHERE S.store_id = ${id}`
    }
    switch(query_mode){
        case 0:
            q += ''
            break;
        case 1:
            let date = r.date
            if(id == -1){
                q += ' WHERE'
            } else {
                q += ' AND'
            }
            q += ` S.supply_date LIKE '%${date[0]}/${date[1]}/${date[2]}%'`
            for(let i = 0; i < 6; i++){
                date[0] -= 1
                if(date[0] == 0) date[1] -= 1
                q +=` OR S.supply_date LIKE '%${date[0]}/${date[1]}/${date[2]}%'`
            }
            break;
        case 2:
            if(id == -1){
                q += ' WHERE'
            } else {
                q += ' AND'
            }
            q += ` S.supply_date LIKE '%${r.date[0]}/${r.date[1]}/${r.date[2]}%'`
            break;
    }
    console.log(q)
    //console.log(q)
    db.queryExec(res, q, (err, result)=> {if(err){res.status(401).send("Somethind bad happen")} else {res.status(200).send(result)}});
});

router.post("/stores/sales/get/", function(req , res){
    let r = req.body
    let query_mode = r.query_mode   //0 ALL //1 WEEK //2 DAY
    let id = r.store_id
    let q = 'SELECT * from sales AS S'
    if(id != -1){
        q += ` WHERE S.store_id = ${id}`
    }
    switch(query_mode){
        case 0:
            q += ''
            break;
        case 1:
            let date = r.date
            if(id == -1){
                q += ' WHERE'
            } else {
                q += ' AND'
            }
            q += ` S.sale_date LIKE '%${date[0]}/${date[1]}/${date[2]}%'`
            for(let i = 0; i < 6; i++){
                date[0] -= 1
                if(date[0] == 0) date[1] -= 1
                q +=` OR S.sale_date LIKE '%${date[0]}/${date[1]}/${date[2]}%'`
            }
            break;
        case 2:
            if(id == -1){
                q += ' WHERE'
            } else {
                q += ' AND'
            }
            q += ` S.sale_date LIKE '%${r.date[0]}/${r.date[1]}/${r.date[2]}%'`
            break;
    }
    console.log(q)
    //console.log(q)
    db.queryExec(res, q, (err, result)=> {if(err){res.status(401).send("Somethind bad happen")} else {res.status(200).send(result)}});
});



//SUPPLY ITEMS BY ID
router.get("/stores/supply/items/:id", function(req , res){
    let id = req.params.id;
    let q =`SELECT supply_id, S.product_id, name, quantity from product_supply_item AS S FULL JOIN product_catalog AS P ON S.product_id = P.product_id WHERE S.supply_id = ${id}`
    db.queryExec(res, q);
});

//SUPPLY ALL
router.get("/stores/supply", function(req , res){
    let q =`SELECT * from product_supply`
    db.queryExec(res, q);
});

//SUPPLY BY ID
router.get("/stores/supply/:id", function(req , res){
    let id = req.params.id;
    let q =`SELECT * from product_supply WHERE supply_id = ${id}`
    db.queryExec(res, q);
});



//SALES ALL
router.get("/stores/sales/all", function(req , res){
    let q =`SELECT * from sales`
    db.queryExec(res, q);
});

//SALES WEEK
router.get("/stores/sales/week", function(req , res){
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - 7);
    console.log(date)
    let qdate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    let q =`SELECT * from sales as S WHERE S.sale_date LIKE %${qdate}%'`
    console.log(q)
    db.queryExec(res, q);
});


//SALES DAY
router.get("/stores/sales/day", function(req , res){
    var date = new Date(this.valueOf());
    let qdate1 = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    date.setDate(date.getDate() - 1);
    let qdate2 = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    let q =`SELECT * from sales as S WHERE S.sale_date LIKE %${qdate1}% OR LIKE %'${qdate2}'%`
    db.queryExec(res, q);
});

//SALES ALL(id = store_id)
router.get("/stores/sales/all/:id", function(req , res){
    let id = req.params.id;
    let q =`SELECT * from sales as S WHERE S.store_id = ${id}`
    db.queryExec(res, q);
});

//SALES WEEK(id = store_id)
router.get("/stores/sales/week/:id", function(req , res){
    let id = req.params.id;
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - 7);
    let qdate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    let q =`SELECT * from sales as S WHERE S.store_id = ${id} and S.sale_date LIKE %${qdate}%'`
    //console.log(q)
    db.queryExec(res, q);
});


//SALES DAY(id = store_id)
router.get("/stores/sales/day/:id", function(req , res){
    let id = req.params.id;
    var date = new Date(this.valueOf());
    let qdate1 = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    date.setDate(date.getDate() - 1);
    let qdate2 = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    let q =`SELECT * from sales as S WHERE S.store_id = ${id} and S.sale_date LIKE %${qdate1}% OR LIKE %'${qdate2}'%`
    db.queryExec(res, q);
});


//SALES CUSTOM(id = store_id) --- NOT IMPLEMENTED
router.get("/stores/sales/day/info/:id", function(req , res){
    
});





module.exports = router;