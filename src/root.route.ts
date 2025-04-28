import { authenticateJWT } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

const moduleRoutes = [
  {
    protected: false,
    path: "/auth",
    module: () => {},
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
