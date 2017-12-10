import { ShoppingCart } from './shopping-cart';

export class Order {
  key?: string;
  datePlaced: number;
  items: any[];
  totalPrice: number;

  constructor(
    public userId: string,
    public shipping: any,

    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();

    this.totalPrice = shoppingCart.totalPrice;
    this.items = shoppingCart.items.map(i => {
      return {
        // create "order item" structure
        quantity: i.quantity,
        totalPrice: i.totalPrice,
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        }
      };
    });
  }

}
