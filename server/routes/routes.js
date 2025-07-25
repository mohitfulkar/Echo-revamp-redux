import express from "express";
import authRoutes from "./authRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import pollRoutes from "./pollRoutes.js";
import userRoutes from "./userRoutes.js";
import panelistRoute from "./panelistRoute.js";
import superPRoutes from "./superPRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import choiceRoutes from "./choiceRoutes.js";
import expertiseRoutes from "./expertiseRoutes.js";
import reponsibilityRoutes from "./reponsibilityRoutes.js";
import designationRoutes from "./designationRoutes.js";
import voteRoutes from "./voteRoutes.js";

const router = express.Router();

const routes = [
  { path: "/api/auth", handler: authRoutes },
  { path: "/api/dashboard", handler: dashboardRoutes },
  { path: "/api/users", handler: userRoutes },
  { path: "/api/users", handler: panelistRoute },
  { path: "/api/users", handler: superPRoutes },
  { path: "/api/poll", handler: pollRoutes },
  { path: "/api/category", handler: categoryRoutes },
  { path: "/api/choices", handler: choiceRoutes },
  { path: "/api/expertise", handler: expertiseRoutes },
  { path: "/api/rsb", handler: reponsibilityRoutes },
  { path: "/api/designation", handler: designationRoutes },
  { path: "/api/vote", handler: voteRoutes },
];

routes.forEach(({ path, handler }) => {
  router.use(path, handler);
});

export default router;
