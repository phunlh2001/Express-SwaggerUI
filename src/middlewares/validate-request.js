function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const { err, value } = schema.validate(req.body, options);
  if (err) {
    next(`Validation error: ${err.details.map((x) => x.message).join(", ")}`);
  } else {
    req.body = value;
    next();
  }
}

export default validateRequest;
