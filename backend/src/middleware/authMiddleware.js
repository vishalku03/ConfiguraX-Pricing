const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

const protect = async (
  req,
  res,
  next
) => {
  try {
    const header =
      req.headers.authorization;

    if (
      !header ||
      !header.startsWith(
        "Bearer "
      )
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required."
      });
    }

    const token =
      header.substring(7);

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const user =
      await User.findById(
        decoded.id
      );

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "User no longer exists."
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "User account is inactive."
      });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token."
    });
  }
};

module.exports = {
  protect
};