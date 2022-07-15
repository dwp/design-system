const errorHandler = (err, req, res, next) => {
  console.error('WHAT > > > ', err);
  res.status(err.status || 500);
  res.render('_page-not-found.njk')
}

module.exports = { errorHandler };
