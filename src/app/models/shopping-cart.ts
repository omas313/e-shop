import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {

  items: ShoppingCartItem[] = [];

  constructor(
    // this is what the object we receive from db looks like
    private itemsMap: { 
      [key: string]: {
        title: string,
        imageUrl: string,
        price: number,
        quantity: number
      }
    }
  ) {

    // intialize the itemsMap since we might not have it from db right away
    this.itemsMap = itemsMap || {};

    for (const productKey in itemsMap) {
      const itemObject = itemsMap[productKey];
      this.items.push(new ShoppingCartItem({ ...itemObject, key: productKey }));
    }
  }

  getQuantityOf(product: Product) {
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0; 
  }

  get totalItemsCount(): number {
    let count = 0;
    for (const id in this.itemsMap) 
      count += this.itemsMap[id].quantity;
    return count;
  }

  get totalPrice(): number {
    let price = 0;
    for (const id in this.itemsMap) 
      price += this.itemsMap[id].price * this.itemsMap[id].quantity;
    return price;
  }
    
}
