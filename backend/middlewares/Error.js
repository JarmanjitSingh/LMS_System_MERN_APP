const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //by default the error class only gets the message so everytime here the statusCode will be undefined so therefore we can extends the error class and create a new file in utils for the statusCode
  err.message = err.message || "Internal server error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorMiddleware
