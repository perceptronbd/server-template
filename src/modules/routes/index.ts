import { Router } from "express";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    module: () => {},
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.module);
});

export default router;
