require("dotenv").config();

const bcrypt =
  require("bcryptjs");

const connectDB =
  require(
    "../src/config/db"
  );

const User =
  require(
    "../src/models/User"
  );

const seedAdmin =
  async () => {

    try {

      await connectDB();

      const email =
        process.env
          .INITIAL_ADMIN_EMAIL
          ?.toLowerCase();

      const password =
        process.env
          .INITIAL_ADMIN_PASSWORD;

      const name =
        process.env
          .INITIAL_ADMIN_NAME ||
        "System Admin";

      if (
        !email ||
        !password
      ) {

        throw new Error(
          "Initial admin credentials are missing from .env"
        );
      }

      const existing =
        await User.findOne({
          email
        });

      if (existing) {

        console.log(
          `Admin already exists: ${email}`
        );

        process.exit(0);
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          12
        );

      await User.create({
        name,

        email,

        password:
          hashedPassword,

        role:
          "admin",

        isActive:
          true
      });

      console.log(
        "Initial admin created successfully."
      );

      console.log(
        `Email: ${email}`
      );

      console.log(
        "Password: value configured in .env"
      );

      process.exit(0);

    } catch (error) {

      console.error(
        "Admin seed failed:",
        error.message
      );

      process.exit(1);
    }
  };

seedAdmin();