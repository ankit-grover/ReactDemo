import { connection } from './connection.js';
import { generateId } from './ids.js';

const getProductTable = () => connection.table('product');

export async function getProducts() {
  return await getProductTable().select();
}

export async function getProduct(id) {
  return await getProductTable().first().where({ id });
}

export async function getProductsByCategory(categoryId) {
  return await getProductTable().where({ categoryId });
}

export async function createProduct({ name, description, price, image, categoryId, stock, wishlist = false }) {
  const product = {
    id: generateId(),
    name,
    description,
    price,
    image,
    categoryId,
    stock,
    wishlist, // Add wishlist field
  };
  await getProductTable().insert(product);
  return product;
}

export async function updateProduct(id, { name, description, price, image, categoryId, stock, wishlist }) {
  const updatedFields = {};
  if (name !== undefined) updatedFields.name = name;
  if (description !== undefined) updatedFields.description = description;
  if (price !== undefined) updatedFields.price = price;
  if (image !== undefined) updatedFields.image = image; // Corrected from imageUrl to image
  if (categoryId !== undefined) updatedFields.categoryId = categoryId;
  if (stock !== undefined) updatedFields.stock = stock;
  if (wishlist !== undefined) updatedFields.wishlist = wishlist; // Add wishlist field

  await getProductTable().update(updatedFields).where({ id });
  return await getProduct(id);
}

export async function deleteProduct(id) {
  const deletedRows = await getProductTable().delete().where({ id });
  return deletedRows > 0;
}

export async function updateWishlistStatus(id, wishlist) {
  await getProductTable().update({ wishlist }).where({ id });
  return await getProduct(id);
}
