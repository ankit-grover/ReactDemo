import { connection } from '../db/connection.js';

const { schema } = connection;

export default {
  Query: {
    customer: async (_, { id }) => {
      return await schema.table('customer').where({ id }).first();
    },
    login: async (_, { email, password }) => {
      const customer = await schema.table('customer').where({ email, password }).first();
      if (!customer) {
        throw new Error('Invalid credentials');
      }
      return customer;
    },
  },
  Mutation: {
    register: async (_, { name, email, password, address }) => {
      const [id] = await schema.table('customer').insert({ name, email, password, address });
      return { id, name, email, address };
    },
  },
};
