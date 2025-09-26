module.exports = (req, res, next) => {
  // TEMPORARY MOCK for Swagger and Thunder Client
  if (!req.user) {
    req.user = { _id: "68d49cac5bee8377f123b11b" }; // Replaced with a real user ID from DB
  }
  next();
};

//  module.exports = (req, res, next) => {
//    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
//    next();
//};
