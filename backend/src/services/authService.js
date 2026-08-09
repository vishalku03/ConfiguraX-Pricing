const bcrypt =
  require("bcryptjs");

const User =
  require("../models/User");

const generateToken =
  require("../utils/generateToken");

const authenticate =
  async (
    email,
    password
  ) => {

    const user =
      await User.findOne({
        email:
          email.toLowerCase()
      }).select(
        "+password"
      );

    if (
      !user ||
      !user.isActive
    ) {
      return null;
    }

    const valid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!valid) {
      return null;
    }

    return {
      token:
        generateToken(user),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  };

module.exports = {
  authenticate
};