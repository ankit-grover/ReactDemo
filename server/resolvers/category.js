import { getCategory, getCategories, createCategory, updateCategory, deleteCategory } from '../db/category.js';

const resolvers = {
  Query: {
    categories: () => getCategories(),
    category: (_, { id }) => getCategory(id),
  },
  Mutation: {
    createCategory: (_, { input }) => createCategory(input),
    updateCategory: (_, { id, input }) => updateCategory(id, input),
    deleteCategory: (_, { id }) => deleteCategory(id),
  },
};

export default resolvers;
