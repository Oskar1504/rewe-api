# rewe-api

## Endpoints
- ```https://shop.rewe.de/api/products```
- params
    - search = string also suppports prodcutID
    - page = normal apgination functionality
       - pageination info append on response
-  examples
    - ```https://shop.rewe.de/api/products?search=butter&page=2```
    - ```https://shop.rewe.de/api/products?search=445190```

- ```https://shop.rewe.de/api/suggestions```
- params
    - q = string also suppports prodcutID
    - page ? (still WIP p and page wont work but return pagination in response)
-  examples
    - ```https://shop.rewe.de/api/suggestions?q=butter```
    - ```https://shop.rewe.de/api/suggestions?q=445190```
