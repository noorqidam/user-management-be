import { Request, Response } from "express";
import Role from "../db/models/Role";
import Helper from "../helpers/Helper";

const GetRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const roles = await Role.findAll({
      where: {
        active: true,
      },
    });

    return res.status(200).send(Helper.ResponseData(200, "Ok", null, roles));
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res
        .status(500)
        .send(Helper.ResponseData(500, error.message, error, null));
    }

    return res
      .status(500)
      .send(Helper.ResponseData(500, "Internal server error", error, null));
  }
};

const CreateRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { roleName, active } = req.body;

    const create = await Role.create({
      roleName,
      active,
    });

    return res
      .status(201)
      .send(Helper.ResponseData(201, "Created", null, create));
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res
        .status(500)
        .send(Helper.ResponseData(500, error.message, error, null));
    }

    return res
      .status(500)
      .send(Helper.ResponseData(500, "Internal server error", error, null));
  }
};

const UpdateRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { roleName, active } = req.body;

    const role = await Role.findByPk(id);

    if (!role) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, "Data Not Found", null, null));
    }

    role.roleName = roleName;
    role.active = active;

    await role.save();

    return res.status(200).send(Helper.ResponseData(200, "OK", null, role));
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res
        .status(500)
        .send(Helper.ResponseData(500, error.message, error, null));
    }

    return res
      .status(500)
      .send(Helper.ResponseData(500, "Internal server error", error, null));
  }
};

const DeleteRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, "Data Not Found", null, null));
    }

    await role.destroy();

    return res.status(200).send({
      status: 200,
      message: "Deleted",
      data: null,
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res
        .status(500)
        .send(Helper.ResponseData(500, error.message, error, null));
    }

    return res
      .status(500)
      .send(Helper.ResponseData(500, "Internal server error", error, null));
  }
};

const GetRoleById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, "Data Not Found", null, null));
    }

    return res.status(200).send(Helper.ResponseData(200, "Ok", null, role));
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res
        .status(500)
        .send(Helper.ResponseData(500, error.message, error, null));
    }

    return res
      .status(500)
      .send(Helper.ResponseData(500, "Internal server error", error, null));
  }
};

export default { GetRole, CreateRole, UpdateRole, DeleteRole, GetRoleById };
