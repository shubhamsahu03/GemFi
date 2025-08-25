import "dotenv/config";
import "./config/passport.config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import { Env } from "./config/env.config";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { asyncHandler } from "./middlewares/asyncHandler.middlerware";
import connctDatabase from "./config/database.config";
import authRoutes from "./routes/auth.route";
import { passportAuthenticateJwt } from "./config/passport.config";
import userRoutes from "./routes/user.route";
import transactionRoutes from "./routes/transaction.route";
import { initializeCrons } from "./cron";
import reportRoutes from "./routes/report.route";
import analyticsRoutes from "./routes/analytics.route";

const app = express();
const BASE_PATH = Env.BASE_PATH;

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport
app.use(passport.initialize());

// ✅ CORS setup for dev + production
app.use(
  cors({
    origin: [
      "http://localhost:3000",       // frontend dev
      "https://gem-fi.vercel.app",   // frontend prod
      Env.FRONTEND_ORIGIN,           // from env just in case
    ].filter(Boolean), // remove undefined
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Root route - friendly message
app.get("/", (req: Request, res: Response) => {
  res.status(HTTPSTATUS.OK).json({
    message: "Backend is running 🚀",
  });
});

// Health check route
app.get(
  "/health",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let dbStatus = "unknown";
    try {
      await connctDatabase();
      dbStatus = "connected";
    } catch (error) {
      dbStatus = "disconnected";
    }

    res.status(HTTPSTATUS.OK).json({
      status: "ok",
      service: "backend",
      database: dbStatus,
      timestamp: new Date().toISOString(),
    });
  })
);

// API routes
app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, passportAuthenticateJwt, userRoutes);
app.use(`${BASE_PATH}/transaction`, passportAuthenticateJwt, transactionRoutes);
app.use(`${BASE_PATH}/report`, passportAuthenticateJwt, reportRoutes);
app.use(`${BASE_PATH}/analytics`, passportAuthenticateJwt, analyticsRoutes);

// Error handler
app.use(errorHandler);

// Start the server
app.listen(Env.PORT, async () => {
  await connctDatabase();

  if (Env.NODE_ENV === "development") {
    await initializeCrons();
  }

  console.log(`✅ Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
