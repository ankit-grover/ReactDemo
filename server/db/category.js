import { connection } from './connection.js';
import { generateId } from './ids.js';

const getCategoryTable = () => connection.table('category');

export async function getCategories() {
  return await getCategoryTable().select();
}

export async function getCategory(id) {
  return await getCategoryTable().first().where({ id });
}

export async function createCategory({ name, description, image }) {
  const category = {
    id: generateId(),
    name,
    description,
    image,
  };
  await getCategoryTable().insert(category);
  return category;
}

export async function updateCategory(id, { name, description, image }) {
  const updatedFields = {};
  if (name !== undefined) updatedFields.name = name;
  if (description !== undefined) updatedFields.description = description;
  if (image !== undefined) updatedFields.image = image;
  await getCategoryTable().update(updatedFields).where({ id });
  return await getCategory(id);
}

export async function deleteCategory(id) {
  const deletedRows = await getCategoryTable().delete().where({ id });
  return deletedRows > 0;
}
