// middleware/logger.js
function logger(req, res, next) {
    console.log(`${req.method} ${req.url} - ${req.ip}`);
    next();
  }
  
  app.use(logger);
  