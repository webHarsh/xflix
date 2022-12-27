function catchAsync(fn) {
    return function(req, res, next) {     
      Promise.resolve(fn(req, res, next)).catch((err) => {
        // next(err);
        Error.captureStackTrace(err); 
        res.status(err.statusCode).send({
          code: err.statusCode,
          message: err.message,
          stack:err.stack
        }); 
    });    
    }   
  }     

  module.exports = catchAsync;
    