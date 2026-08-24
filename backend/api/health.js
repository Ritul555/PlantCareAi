module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: 'ok', message: 'Backend Health Endpoint is Working!', timestamp: new Date().toISOString() }));
};
