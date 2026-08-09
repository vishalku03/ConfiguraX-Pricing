// const express =
//   require("express");

// const cors =
//   require("cors");

// const helmet =
//   require("helmet");

// const morgan =
//   require("morgan");

// const rateLimit =
//   require(
//     "express-rate-limit"
//   );

// const authRoutes =
//   require("./routes/authRoutes");

// const componentRoutes =
//   require(
//     "./routes/componentRoutes"
//   );

// const configurationRoutes =
//   require(
//     "./routes/configurationRoutes"
//   );

// const dashboardRoutes =
//   require(
//     "./routes/dashboardRoutes"
//   );

// const {
//   notFound,
//   errorHandler
// } = require(
//   "./middleware/errorMiddleware"
// );

// const app =
//   express();

// app.disable(
//   "x-powered-by"
// );

// app.use(
//   helmet()
// );

// app.use(
//   cors({
//     origin:
//       process.env.FRONTEND_URL ||
//       "http://localhost:5173",

//     credentials: true
//   })
// );

// app.use(
//   express.json({
//     limit: "1mb"
//   })
// );

// app.use(
//   express.urlencoded({
//     extended: true
//   })
// );

// if (
//   process.env.NODE_ENV !==
//   "production"
// ) {
//   app.use(
//     morgan("dev")
//   );
// }

// const apiLimiter =
//   rateLimit({
//     windowMs:
//       15 * 60 * 1000,

//     limit: 300,

//     standardHeaders:
//       true,

//     legacyHeaders:
//       false
//   });

// app.use(
//   "/api",
//   apiLimiter
// );

// app.get(
//   "/api/health",
//   (req, res) => {

//     res.json({
//       success: true,

//       message:
//         "Laptop Pricing API is running.",

//       timestamp:
//         new Date().toISOString()
//     });
//   }
// );

// app.use(
//   "/api/auth",
//   authRoutes
// );

// app.use(
//   "/api/components",
//   componentRoutes
// );

// app.use(
//   "/api/configurations",
//   configurationRoutes
// );

// app.use(
//   "/api/dashboard",
//   dashboardRoutes
// );

// app.use(
//   notFound
// );

// app.use(
//   errorHandler
// );

// module.exports =
//   app;
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin header
      // such as health checks/server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true
  })
);