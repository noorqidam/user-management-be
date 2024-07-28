import Validator from "validatorjs";
import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express";
import Helper from "../../helpers/Helper";
import Role from "../../db/models/Role";

const CreateRoleValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleName, active } = req.body;

    const data = {
      roleName,
      active,
    };

    const rules: Validator.Rules = {
      roleName: "required|string|max:50",
      active: "required|boolean",
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
    }

    // Check if role name already exists
    const roleExists = await Role.findOne({ where: { roleName } });
    if (roleExists) {
      return res
        .status(400)
        .send(Helper.ResponseData(400, "Role name already exists", null, null));
    }

    next();
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

const UpdateRoleValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { roleName, active } = req.body;

    const data = {
      roleName,
      active,
    };

    const rules: Validator.Rules = {
      roleName: "required|string|max:50",
      active: "required|boolean",
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
    }

    // Check if role name already exists and it's not the current role
    const roleExists = await Role.findOne({
      where: {
        roleName,
        id: { [Op.ne]: id },
      },
    });
    if (roleExists) {
      return res
        .status(400)
        .send(Helper.ResponseData(400, "Role name already exists", null, null));
    }

    next();
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

export default { CreateRoleValidation, UpdateRoleValidation };
