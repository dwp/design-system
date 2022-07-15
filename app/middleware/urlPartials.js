const urlPartials = (req, res, next) => {
  //store original url as array in locals, removing the first item as it is always an empty string
  const urlPartials = req.originalUrl.split('/').slice(1);
  res.locals.urlPartials = urlPartials;
  next();
}

module.exports = { urlPartials };