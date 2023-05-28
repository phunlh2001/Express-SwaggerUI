import { db } from "../db.js";

/**
 * Get Customer by Id
 * @param {Number} id
 * @returns Customer
 */
async function getById(id) {
  const cus = await db.Customer.findByPk(id);
  if (!cus) throw "Customer not found";
  return cus;
}

/**
 * Get All data
 * @returns List<Customer>
 */
async function getAll() {
  return await db.Customer.findAll();
}

/**
 * Create a customer
 * @param {Customer} params
 */
async function create(params) {
  // validate
  if (await db.Customer.findOne({ where: { email: params.email } })) {
    throw `Email ${params.email} is already exists.`;
  }

  const cus = new db.Customer(params);

  await cus.save();
}

/**
 * Delete a customer by Id
 * @param {Number} id
 */
async function _delete(id) {
  const cus = await getById(id);
  await cus.destroy();
}

/**
 * Update a customer
 * @param {Number} id
 * @param {Customer} params
 */
async function update(id, params) {
  const cus = await getById(id);

  Object.assign(cus, params);
  await cus.save();
}

const customerServices = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

export default customerServices;
