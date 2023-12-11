interface Wishlist {
  title: string;
  description: string;
  products: { productId: string; buyerId: string | null }[];
  owner: string;
  created: Date;
}

export default Wishlist;
