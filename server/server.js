const express = require('express');

const routerRewe = require('./router/rewe');

const app =  express();

app.use(express.json());

app.use('/rewe', routerRewe);

app.use(function (req, res, next) {
    console.log(req.path)
    next()
})

app.get('/',async (req, res, next) => {
    res.json({status:200, data:"hey hoe"})
});

const port = 42111;
app.listen(port, () =>{
    console.log(`server is running at http://localhost:${port}`)
})
