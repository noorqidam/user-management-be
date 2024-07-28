import express from "express";

import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";

import UserValidation from "../middleware/validation/UserValidation";
import RoleValidation from "../middleware/validation/RoleValidation";

const router = express.Router();

router.get("/role", RoleController.GetRole);
router.post(
  "/role",
  RoleValidation.CreateRoleValidation,
  RoleController.CreateRole
);
router.put(
  "/role/:id",
  RoleValidation.UpdateRoleValidation,
  RoleController.UpdateRole
);
router.delete("/role/:id", RoleController.DeleteRole);
router.get("/role/:id", RoleController.GetRoleById);

// User Routing
router.post(
  "/user/signup",
  UserValidation.RegisterValidation,
  UserController.Register
);

export default router;
