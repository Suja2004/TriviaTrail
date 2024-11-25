const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
      const decoded = jwt.verify(token, "secretKey");
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token" });
    }
  };
};

module.exports = authMiddleware;
