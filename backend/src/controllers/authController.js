const {
  authenticate
} = require(
  "../services/authService"
);

const {
  success,
  failure
} = require(
  "../utils/apiResponse"
);

const login =
  async (
    req,
    res,
    next
  ) => {

    try {

      const result =
        await authenticate(
          req.body.email,
          req.body.password
        );

      if (!result) {

        return failure(
          res,
          "Invalid email or password.",
          401
        );
      }

      return success(
        res,
        result,
        "Login successful."
      );

    } catch (error) {

      next(error);
    }
  };

const getMe =
  async (
    req,
    res
  ) => {

    return success(
      res,

      {
        user: {
          id:
            req.user._id,

          name:
            req.user.name,

          email:
            req.user.email,

          role:
            req.user.role
        }
      },

      "Current user fetched."
    );
  };

module.exports = {
  login,
  getMe
};