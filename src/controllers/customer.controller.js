import express from "express";
import Joi from "joi";

import validateRequest from "../middlewares/validate-request.js";
import customerServices from "../services/customer.service.js";

// ================= ROUTES ================= //
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

export { router };

// ================= HANDLING LOGIC ================= //
/**
 * Get all data
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getAll(req, res, next) {
  customerServices
    .getAll()
    .then((data) => res.status(200).json(data))
    .catch(next);
}

/**
 * Get data by Id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getById(req, res, next) {
  customerServices
    .getById(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch(() => {
      res.status(404).json({ message: "Not Found" });
      next();
    });
}

/**
 * Create new data
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function create(req, res, next) {
  customerServices
    .create(req.body)
    .then(() => res.status(201).json({ message: "Customer created" }))
    .catch(() => {
      res.status(400).json({ message: "Bad Request" });
      next();
    });
}

/**
 * Delete data by Id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function _delete(req, res, next) {
  customerServices
    .delete(req.params.id)
    .then(() => res.status(200).json({ message: "Customer deleted" }))
    .catch(() => {
      res.status(404).json({ message: "Not Found" });
      next();
    });
}

/**
 * Update data by Id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function update(req, res, next) {
  customerServices
    .update(req.params.id, req.body)
    .then(() => res.status(200).json({ message: "Customer updated" }))
    .catch(() => {
      res.status(400).json({ message: "Bad Request" });
      next();
    });
}

// ================= MIDDLEWARES ================= //

function createSchema(req, res, next) {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    birthday: Joi.string().required(),
    gender: Joi.string().required(),
    phoneNumber: Joi.string().min(10).max(11).required(),
    email: Joi.string().email().required(),
  });

  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    fullName: Joi.string().empty(""),
    birthday: Joi.string().empty(""),
    gender: Joi.string().empty(""),
    phoneNumber: Joi.string().min(10).max(11).empty(""),
    email: Joi.string().email().empty(""),
  });

  validateRequest(req, next, schema);
}
