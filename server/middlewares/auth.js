const auth = (req, res, next) => {
  // Authentication logic here
  next();
};

const authZ = (req, res, next) => {
  // Authorization logic here
  next();
};

module.exports = { auth, authZ };
