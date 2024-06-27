import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getProductsByCategory, updateWishlistStatus } from '../db/product.js';

export default {
  Query: {
    products: async () => {
      return await getProducts();
    },
    product: async (_, { id }) => {
      return await getProduct(id);
    },
    productsByCategory: async (_, { categoryId }) => {
      return await getProductsByCategory(categoryId);
    },
  },
  Mutation: {
    createProduct: async (_, { input }) => {
      return await createProduct(input);
    },
    updateProduct: async (_, { id, input }) => {
      return await updateProduct(id, input);
    },
    deleteProduct: async (_, { id }) => {
      return await deleteProduct(id);
    },
    updateWishlistStatus: async (_, { id, wishlist }) => {
      return await updateWishlistStatus(id, wishlist);
    },
  },
};
