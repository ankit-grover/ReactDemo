import { connection } from '../db/connection.js';

const { schema } = connection;

export async function createCustomerTable() {
  await schema.dropTableIfExists('customer');
  await schema.createTable('customer', (table) => {
    table.text('id').notNullable().primary();
    table.text('name').notNullable();
    table.text('email').notNullable().unique();
    table.text('password').notNullable();
    table.text('address').notNullable();
  });

  console.log('Customer table created successfully');
}

//if (import.meta.url === `file://${process.argv[1]}`) {
  createCustomerTable().catch(err => {
    console.error('Error creating customer table', err);
    process.exit(1);
  });
//}
process.exit();