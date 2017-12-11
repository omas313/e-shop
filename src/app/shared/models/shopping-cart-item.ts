
export class ShoppingCartItem {

  // creating a flat class with only the required fields from Product class
  // instead of having a nested structure 
  key: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;


  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }

}
