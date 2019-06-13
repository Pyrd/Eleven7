var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('../dbContext');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//TODO
router.post("/stat/sales/", function(req , res){
    let r = req.body
    let query_mode = r.query_mode   //0 ALL //1 WEEK //2 DAY
    let id = r.store_id
    let date = r.date
    let q = 'SELECT'
    //if(id != -1) q += ' store_id,'
    let special = ''
    let special2 = ''
    if(query_mode == 1){
        special = ' (CASE'
        special2 += ` S.sale_date LIKE '%${date[0]}/${date[1]}/${date[2]}%'`
        for(let i = 0; i <= 6; i++){
            
            let day = date[0] < 10 ? '0'+date[0] : ''+date[0]
            if(date[0] == 0){
                date[1] -= 1
                date[0] == 31 //30 if some months
            }
            special +=` WHEN sale_date LIKE '${date[0] < 10 ? '0'+date[0] : date[0]}/${date[1]}/${date[2]}%' THEN '${date[0] < 10 ? '0'+date[0] : date[0]}/${date[1]}/${date[2]}'`
            special2 +=` OR S.sale_date LIKE '%${date[0]}/${date[1]}/${date[2]}%'`
            date[0] -= 1
        }
        special += ' END)'
        q+= special + ' AS sale_date,'
    }
    
    q+= ' COUNT(sale_id) as total_sales, SUM(total_price) as total_income,SUM(total_item) as total_sold FROM sales AS S '
    if(id != -1){
        q += ` WHERE S.store_id = ${id}`
    }
    switch(query_mode){
        case 0:
            q += ''
            break;
        case 1:
            if(id == -1){
                q += ' WHERE'
            } else {
                q += ' AND ('
            }
            q += special2
            if(id != -1){
                q += ' )'
            }
            q +=' GROUP BY' + special + ';'
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


//TODO
router.post("/stat/supply/", function(req , res){
    let r = req.body
    let query_mode = r.query_mode   //0 ALL //1 WEEK //2 DAY
    let id = r.store_id
    let q = 'SELECT supply_date, COUNT(supply_id) as total_supply, SUM(total_item) as total_item FROM product_supply AS S'
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
                q += ' AND ('
            }
            q += ` S.supply_date LIKE '%${date[0]}/${date[1]}/${date[2]}%'`
            for(let i = 0; i < 6; i++){
                date[0] -= 1
                if(date[0] == 0) date[1] -= 1
                q +=` OR S.supply_date LIKE '%${date[0]}/${date[1]}/${date[2]}%'`
            }
            if(id != -1){
                q += ' )'
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
    q +='GROUP BY supply_date'
    console.log(q)
    //console.log(q)
    db.queryExec(res, q, (err, result)=> {if(err){res.status(401).send("Somethind bad happen")} else {res.status(200).send(result)}});
});




module.exports = router;