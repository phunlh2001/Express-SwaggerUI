function errorHandler(err, req, res, next) {
  switch (true) {
    case typeof err === "string":
      // customer application error
      const is404 = err.toLowerCase().endsWith("not found");
      const statusCode = is404 ? 404 : 400;
      return res.status(statusCode).json({ message: err.message });

    default:
      return res.status(500).json({ message: err.message });
  }
}

export default errorHandler;
