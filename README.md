# rewe-api

## Endpoints
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
