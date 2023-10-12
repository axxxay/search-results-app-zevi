const express = require('express');
const {open} = require("sqlite");
const sqlite3 = require('sqlite3');
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "SearchApp.db");

const InitializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        app.listen(5000, () => {
            console.log("Server running at port 5000");
        });
    } catch(e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
}

InitializeDBAndServer();

app.post('/products', async (req, res) => {
    const {rating=[], discountPrice=0, brand=[]} = req.body;
    
    let query = ""
    if(rating.length === 0 && discountPrice.length === 0 && brand.length === 0) {
        query = `SELECT * FROM products;`;
    } else if (rating.length === 0 && discountPrice.length === 0){
        query = `SELECT * FROM products WHERE brand IN (`;
        for(let br of brand) {
            query += `'${br}', `
        }
        query = query.slice(0, query.length - 2) + ");"
    } else if (discountPrice.length === 0 && brand.length === 0) {
        query = `SELECT * FROM products WHERE rating IN (${rating.join(", ")});`
    } else if (brand.length === 0 && rating.length === 0) {
        if(discountPrice.length === 2) {
            query = `SELECT * FROM products WHERE discountPrice <= 500 OR discountPrice BETWEEN 1000 AND 3000;`
        } else if(discountPrice[0] === 500) {
            query = `SELECT * FROM products WHERE discountPrice <= ${discountPrice};`
        } else if (discountPrice[0] === 1000) {
            query = `SELECT * FROM products WHERE discountPrice BETWEEN 1000 AND 3000;`
        }
    } else if (rating.length === 0) {
        if(discountPrice.length === 2) {
            query = `SELECT * FROM products WHERE discountPrice <= 500 OR discountPrice BETWEEN 1000 AND 3000 AND brand IN (`
        } else if(discountPrice[0] === 500) {
            query = `SELECT * FROM products WHERE discountPrice <= ${discountPrice} AND brand IN (`
        } else if (discountPrice[0] === 1000) {
            query = `SELECT * FROM products WHERE discountPrice BETWEEN 1000 AND 3000 AND brand IN (`
        }
        for(let br of brand) {
            query += `'${br}', `
        }
        query = query.slice(0, query.length - 2) + ");"
    } else if (discountPrice.length === 0) {
        query = `SELECT * FROM products WHERE rating IN (${rating.join(", ")}) AND brand IN (`
        for(let br of brand) {
            query += `'${br}', `
        }
        query = query.slice(0, query.length - 2) + ");"
    } else if (brand.length === 0) {
        if(discountPrice.length === 2) {
            query = `SELECT * FROM products WHERE discountPrice <= 500 OR discountPrice BETWEEN 1000 AND 3000 AND `
        } else if(discountPrice[0] === 500) {
            query = `SELECT * FROM products WHERE discountPrice <= ${discountPrice} AND `
        } else if (discountPrice[0] === 1000) {
            query = `SELECT * FROM products WHERE discountPrice BETWEEN 1000 AND 3000 AND `
        }
        query += `rating IN (${rating.join(", ")});`
    } else {
        query = `SELECT * FROM products WHERE rating IN (${rating.join(", ")}) AND brand IN (`
        for(let br of brand) {
            query += `'${br}', `
        }
        query = query.slice(0, query.length - 2) + ") AND "
        if(discountPrice.length === 2) {
            query += `discountPrice <= 500 OR discountPrice BETWEEN 1000 AND 3000;`
        } else if(discountPrice[0] === 500) {
            query += `discountPrice <= ${discountPrice};`
        } else if (discountPrice[0] === 1000) {
            query += `discountPrice BETWEEN 1000 AND 3000;`
        }
    }

    const productList = await db.all(query);
    res.send(productList)
})