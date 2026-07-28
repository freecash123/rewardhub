const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: false, stripUnknown: true });
    if (error) {
      const messages = error.details.map(d => d.message);
      return res.status(400).json({ status: 'error', message: 'Validation failed', errors: messages });
    }
    next();
  };
};

module.exports = { validate };
