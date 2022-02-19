# rewe-api
- thi sproject is an express.js based api which using official shop.rewe.de api 
- using puppeteer to acquire product details for products an forwarding them to api

## Own endpoints
- /rewe/api/products?q=<search_string> or <prodcutId>
    - returns a list of matching products with detialed price
    - using the /api/suggestions endpoint from rewe
- /rewe/api/produtDetails?productId=<productId>
    - using puppeteer to open ProductDetailPage and scrapping productDetials
    - store productDetails localy to save resources and time
    - returns json productData 

## Endpoints from shop.rewe.de
- ```https://shop.rewe.de/api/products```
- returns
    -  products with less informations
    -  contains much other random infos
- params
    - search = string also suppports prodcutID
    - page = normal apgination functionality
       - pageination info append on response
-  examples
    - ```https://shop.rewe.de/api/products?search=butter&page=2```
    - ```https://shop.rewe.de/api/products?search=445190```

___

- ```https://shop.rewe.de/api/suggestions```
- returns
    -  products with detailed price informations
    -  used intern in search bar
- params
    - q = string also suppports prodcutID
    - page ? (still WIP p and page wont work but return pagination in response)
-  examples
    - ```https://shop.rewe.de/api/suggestions?q=butter```
    - ```https://shop.rewe.de/api/suggestions?q=445190```
