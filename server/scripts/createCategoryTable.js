import { connection } from '../db/connection.js';

const { schema } = connection;

async function createCategoryTable() {
  try {
    await schema.dropTableIfExists('category');
    await schema.createTable('category', (table) => {
      table.text('id').notNullable().primary();
      table.text('name').notNullable();
      table.text('parentId').references('id').inTable('category').onDelete('CASCADE');
      table.text('image'); // Add image field
      table.text('description'); // Add description field
    });

    // Insert sample data into 'category' table
    const insertedCategories = await connection.table('category').insert([
      { id: '1', name: 'Men', image: 'images/category/men-category.jpg', description: 'Shop the latest men\'s fashion including clothing, footwear, accessories, and more.' },
      { id: '2', name: 'Women', image: 'images/category/women-category.jpg', description: 'Discover our women\'s collection for the latest trends in fashion and accessories.' },
      { id: '3', name: 'Kids', image: 'images/category/kids-category.jpg', description: 'Find the best clothes and accessories for kids of all ages.' },
      { id: '4', name: 'Clothings', image: 'images/category/clothing-category.jpg', description: 'Explore a wide range of clothing for men, women, and kids.' },
      { id: '5', name: 'Jewelry', image: 'images/category/jewelry-category.jpg', description: 'Browse our exclusive collection of jewelry including rings, necklaces, and more.' },
      { id: '6', name: 'Bags', image: 'images/category/bags-category.jpg', description: 'Check out our variety of bags, from handbags to backpacks.' },
      { id: '7', name: 'Footwear', image: 'images/category/footwear-category.jpg', description: 'Step up your style with the latest footwear for all occasions.' },
    ]);

    console.log(`Inserted ${insertedCategories.length} categories into the 'category' table`);

    console.log('Category table created successfully');
  } catch (error) {
    console.error('Error creating category table:', error.message);
    throw error; // Rethrow the error to stop further execution or handle it appropriately
  }
}

// Run the script if executed directly from command line
//if (import.meta.url === `file://${process.argv[1]}`) {
  createCategoryTable().catch(err => {
    console.error('Unhandled error in createCategoryTable:', err);
    process.exit(1); // Exit the process with error status code
  });
//}
process.exit();