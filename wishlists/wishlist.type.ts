interface Wishlist {
  title: string;
  description: string;
  productInfos: { productId: string; buyerId: string | null }[];
  owner: string;
  created: Date;
}

export default Wishlist;
