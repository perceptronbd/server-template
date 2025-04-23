import { authenticateJWT } from "@/middlewares/auth.middleware";
import { authRoutes } from "@modules/auth/routes/auth.route";
import { Router } from "express";

const router = Router();

const moduleRoutes = [
  {
    protected: false,
    path: "/auth",
    module: authRoutes,
  },
];

moduleRoutes.forEach((route) => {
  if (route.protected) {
    router.use(route.path, authenticateJWT, route.module);
  } else {
    router.use(route.path, route.module);
  }
});

export default router;
