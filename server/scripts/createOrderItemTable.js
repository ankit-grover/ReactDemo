import { connection } from '../db/connection.js';

const { schema } = connection;

export async function createOrderItemTable() {
  await schema.dropTableIfExists('order_item');
  await schema.createTable('order_item', (table) => {
    table.text('id').notNullable().primary();
    table.text('orderId').notNullable().references('id').inTable('order').onDelete('CASCADE');
    table.text('productId').notNullable().references('id').inTable('product').onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.float('price').notNullable();
  });

  console.log('Order item table created successfully');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  createOrderItemTable().catch(err => {
    console.error('Error creating order item table', err);
    process.exit(1);
  });
}
process.exit();