import { connection } from '../db/connection.js';

const { schema } = connection;

export async function createOrderTable() {
  await schema.dropTableIfExists('order');
  await schema.createTable('order', (table) => {
    table.text('id').notNullable().primary();
    table.text('customerId').notNullable().references('id').inTable('customer').onDelete('CASCADE');
    table.text('orderDate').notNullable();
    table.text('status').notNullable();
  });

  console.log('Order table created successfully');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  createOrderTable().catch(err => {
    console.error('Error creating order table', err);
    process.exit(1);
  });
}
process.exit();