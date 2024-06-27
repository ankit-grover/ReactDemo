import { connection } from '../db/connection.js';

const { schema } = connection;

async function createAliTrendDB() {
  // Disable foreign key checks
  await connection.raw('PRAGMA foreign_keys = OFF');

  // Drop existing tables if they exist
  await schema.dropTableIfExists('order_item');
  await schema.dropTableIfExists('order');
  await schema.dropTableIfExists('customer');
  await schema.dropTableIfExists('product');
  await schema.dropTableIfExists('category');

  // Re-enable foreign key checks
  await connection.raw('PRAGMA foreign_keys = ON');

  // Create 'category' table
  await schema.createTable('category', (table) => {
    table.text('id').notNullable().primary();
    table.text('name').notNullable();
  });

  // Create 'product' table
  await schema.createTable('product', (table) => {
    table.text('id').notNullable().primary();
    table.text('name').notNullable();
    table.text('description');
    table.float('price').notNullable();
    table.text('categoryId').notNullable()
      .references('id').inTable('category')
      .onDelete('CASCADE');  // Automatically delete related products if a category is deleted
    table.integer('stock').notNullable();
    table.text('image'); // Add image field
  });

  // Create 'customer' table
  await schema.createTable('customer', (table) => {
    table.text('id').notNullable().primary();
    table.text('name').notNullable();
    table.text('email').notNullable().unique();
    table.text('password').notNullable();
    table.text('address').notNullable();
  });

  // Create 'order' table
  await schema.createTable('order', (table) => {
    table.text('id').notNullable().primary();
    table.text('customerId').notNullable()
      .references('id').inTable('customer')
      .onDelete('CASCADE');
    table.text('orderDate').notNullable();
    table.text('status').notNullable();
  });

  // Create 'order_item' table
  await schema.createTable('order_item', (table) => {
    table.text('id').notNullable().primary();
    table.text('orderId').notNullable()
      .references('id').inTable('order')
      .onDelete('CASCADE');
    table.text('productId').notNullable()
      .references('id').inTable('product')
      .onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.float('price').notNullable();
  });

  // Insert sample data into 'category' table
  await connection.table('category').insert([
    {
      id: '1',
      name: 'Men',
    },
    {
      id: '2',
      name: 'Women',
    },
    {
      id: '3',
      name: 'Kids',
    },
  ]);

  // Insert sample data into 'product' table
  await connection.table('product').insert([
    {
      id: '1',
      name: 'Men\'s T-shirt',
      description: 'A comfortable and stylish t-shirt for men',
      price: 19.99,
      categoryId: '1',
      stock: 50,
      image: 'images/men-tshirt.jpg', // Add sample image path
    },
    {
      id: '2',
      name: 'Women\'s Dress',
      description: 'An elegant dress for women',
      price: 49.99,
      categoryId: '2',
      stock: 100,
      image: 'images/women-dress.jpg', // Add sample image path
    },
    {
      id: '3',
      name: 'Kids\' Hoodie',
      description: 'A cute and warm hoodie for kids',
      price: 29.99,
      categoryId: '3',
      stock: 200,
      image: 'images/kids-hoodie.jpg', // Add sample image path
    },
  ]);

  console.log('AliTrend database created successfully');
  process.exit();
}

createAliTrendDB().catch(err => {
  console.error('Error creating AliTrend database', err);
  process.exit(1);
});
