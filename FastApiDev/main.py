
from fastapi import FastAPI 
from models import Product
app = FastAPI()

@app.get("/")

def greet():
    return "Hi this is main.py content learning fast api"

products = [
    Product(id = 1,name = "Samsung",description="S24 Ultra",price=99,quantity=20),
    Product(id = 2,name = "Iphone",description="Iphone 14 pro max",price=199,quantity=15),
    Product(id = 3,name = "Oneplus",description="Oneplus 11R",price=79,quantity=25),
    Product(id = 4,name = "Nokia",description="Nokia X20",price=49,quantity=30),
    Product(id = 5,name = "Motorola",description="Motorola G22",price=39,quantity=18),
    Product(id = 6,name = "Xiaomi",description="Redmi Note 12",price=59,quantity=22)
]

@app.get("/products")
def get_all_products():
    return products

@app.get("/product/{id}")
def get_product_by_id(id: int):
    for product in products:
        if product.id == id:
            return product
    return "Product not found"

@app.post("/product")
def add_product(product:Product):
    products.append(product)
    return product

@app.put("/product")
def update_product(id:int, product:Product):
    for i in range(len(products)):
        if products[i].id == id:
            products[i] = product
            return "Product updated successfully"
    return "Product not found"  

@app.delete("/product")
def delete_product(id:int):
    for i in range(len(products)):
        if products[i].id == id:
            del products[i]
            return "Product deleted successfully"
    return "Product not found"