import express from "express";

import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import MasterMenuController from "../controllers/MasterMenuController";

import UserValidation from "../middleware/validation/UserValidation";
import RoleValidation from "../middleware/validation/RoleValidation";
import MenuValidation from "../middleware/validation/MenuValidation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

router.get("/role", Authorization.Authenticated, RoleController.GetRole);
router.post(
  "/role",
  Authorization.Authenticated,
  Authorization.AdminRole,
  RoleValidation.CreateRoleValidation,
  RoleController.CreateRole
);
router.put(
  "/role/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  RoleValidation.UpdateRoleValidation,
  RoleController.UpdateRole
);
router.delete(
  "/role/:id",
  Authorization.Authenticated,
  Authorization.SuperUser,
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

// Master Menu Routing
router.post(
  "/menu",
  MenuValidation.CreateMenuValidation,
  Authorization.Authenticated,
  Authorization.AdminRole,
  (req, res, next) => {
    console.log("Route hit: POST /menu");
    next();
  },
  MasterMenuController.CreateMenu
);
router.get(
  "/menu",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.GetListMenu
);
router.get(
  "/menu/get/all",
  Authorization.Authenticated,
  Authorization.SuperUser,
  MasterMenuController.GetAllMenu
);
router.get(
  "/menu/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.GetDetailMenu
);
router.patch(
  "/menu/:id",
  MenuValidation.CreateMenuValidation,
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.UpdateMenu
);
router.delete(
  "/menu/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  MasterMenuController.SoftDeleteMenu
);
router.delete(
  "/menu/permanent/:id",
  Authorization.Authenticated,
  Authorization.SuperUser,
  MasterMenuController.DeletePermanent
);
export default router;
