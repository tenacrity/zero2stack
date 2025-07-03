// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error('❌ ERROR STACK:', err.stack); // Log to terminal

  res.status(500).json({
    success: false,
    error: err.message,       // Show error message in browser
    stack: err.stack          // Optional: remove in prod
  });
};
