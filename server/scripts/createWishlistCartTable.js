import { connection } from '../db/connection.js';

const { schema } = connection;

export async function createCartTable() {
  await schema.dropTableIfExists('cart');
  await schema.createTable('cart', (table) => {
    table.text('id').notNullable().primary();
    table.text('customerId').notNullable();
    table.text('productId').notNullable();
    table.integer('quantity').notNullable();
  });

  console.log('Cart table created successfully');
}

export async function createWishlistTable() {
  await schema.dropTableIfExists('wishlist');
  await schema.createTable('wishlist', (table) => {
    table.text('id').notNullable().primary();
    table.text('customerId').notNullable();
    table.text('productId').notNullable();
  });

  console.log('Wishlist table created successfully');
}

//if (import.meta.url === `file://${process.argv[1]}`) {
  createCartTable().catch(err => {
    console.error('Error creating cart table', err);
    process.exit(1);
  });

  createWishlistTable().catch(err => {
    console.error('Error creating wishlist table', err);
    process.exit(1);
  });
//}
process.exit();