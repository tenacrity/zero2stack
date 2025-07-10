export default (err, req, res, next) => {
  console.error('🔥 Global Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};
