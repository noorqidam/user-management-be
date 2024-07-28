import express from "express";

import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";

import UserValidation from "../middleware/validation/UserValidation";
import RoleValidation from "../middleware/validation/RoleValidation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

router.get("/role", Authorization.Authenticated, RoleController.GetRole);
router.post(
  "/role",
  Authorization.Authenticated,
  RoleValidation.CreateRoleValidation,
  RoleController.CreateRole
);
router.put(
  "/role/:id",
  Authorization.Authenticated,
  RoleValidation.UpdateRoleValidation,
  RoleController.UpdateRole
);
router.delete(
  "/role/:id",
  Authorization.Authenticated,
  RoleController.DeleteRole
);
router.get(
  "/role/:id",
  Authorization.Authenticated,
  RoleController.GetRoleById
);

// User Routing
router.post(
  "/user/signup",
  UserValidation.RegisterValidation,
  UserController.Register
);
router.post("/user/login", UserController.UserLogin);
router.get("/user/refresh-token", UserController.RefreshToken);
router.get(
  "/user/current-user",
  Authorization.Authenticated,
  UserController.UserDetail
);
router.post(
  "/user/logout",
  Authorization.Authenticated,
  UserController.UserLogout
);

export default router;
