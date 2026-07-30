export const validate = (schema) => async (req, res, next) => {
  try {
    // Parse and validate req.body against the provided Zod schema
    req.body = await schema.parseAsync(req.body);
    next();
  } catch (error) {
    // Format Zod errors cleanly into an array of readable messages
    const errorMessages = error.errors ? error.errors.map(err => `${err.path.join('.')}: ${err.message}`) : error.message;
    
    res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: errorMessages,
    });
  }
};
