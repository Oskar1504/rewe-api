const fs = require("fs");
const express = require('express')
const axios = require('axios')
const {exec} = require("child_process");

const router = express.Router();
const host = "https://shop.rewe.de/api"


router.get('/api/products',async (req, res, next) => {
    let q = req.query.q
    let config = {
        method:'get',
        url: host + "/suggestions",
        params: { q: q }
    }
    try{
        axios(config)
        .then(function (response) {
            console.log(`Axios req to ${config.url} successfull.`)
            res.json({
                status:200,
                origSource:config.url,
                params:config.params,
                data: response.data
            })
        })
        .catch(function (error) {
            console.log(`Axios req to ${config.url} failed. at: ${req.path} Error: ${error.toString()}`)
            res.json({
                status:error.status,
                data: error.toString()
            })
        })

    }catch(e){
        res.json({status:404, data: e.toString()})
    }
});

router.get('/api/productDetails',async (req, res, next) => {
    let productId = req.query.productId

    console.log(req.query)

    try{
        if(!/^\d+$/.test(productId)) throw "productID only numbers allowed"

        console.log("Checking if product already scraped")
        // todo invalid local storage after specific time ( 1week)
        if(!fs.existsSync(`${__dirname}/../../scraped/products/${productId}.json`)) {
            let args = Object.entries(req.query).map(elm => {
                return elm.join(":")
            }).join(" ")

            console.group(`Child proccess: node puppeteer_scrap.js ${args}`)
            exec(`node puppeteer_scrap.js ${args}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`Child proccess error: ${error.message}`);
                    console.groupEnd()
                    return;
                }
                if (stderr) {
                    console.log(`Child proccess stderr: ${stderr}`);
                    console.groupEnd()
                    return;
                }
                console.log(`Child proccess stdout: ${stdout}`);
                console.groupEnd()
                res.json({
                    status: 200,
                    data: JSON.parse(fs.readFileSync(`${__dirname}/../../scraped/products/${productId}.json`).toString())
                })
            });
        }else{
            console.group(`Product already scrapped. Using local storage`)
            res.json({
                status: 200,
                info:"Using already scraped data",
                data: JSON.parse(fs.readFileSync(`${__dirname}/../../scraped/products/${productId}.json`).toString())
            })
        }


    }catch(e){
        res.json({
            status:404,
            data: e.toString()
        })
    }
});


module.exports = router;