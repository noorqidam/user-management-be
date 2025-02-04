import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface UserData {
  name: string | null;
  email: string | null;
  roleId: number | null;
  verified: boolean | null;
  active: boolean | null;
}

const ResponseData = (
  status: number,
  message: string | null,
  error: any | null,
  data: any | null
) => {
  if (error != null && error instanceof Error) {
    const response = {
      status: status,
      message: error.message,
      errors: error,
      data: null,
    };

    return response;
  }

  const res = {
    status,
    message,
    errors: error,
    data: data,
  };

  return res;
};

const GenerateToken = (data: UserData): string => {
  const token = jwt.sign(data, process.env.JWT_TOKEN as string, {
    expiresIn: "1h",
  });

  return token;
};

const GenerateRefreshToken = (data: UserData): string => {
  const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: "7d",
  });

  return token;
};

const ExtractToken = (token: string): UserData | null => {
  const secretKey: string = process.env.JWT_TOKEN as string;

  let resData: any;

  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result: UserData = <UserData>resData;
    return result;
  }
  return null;
};

const ExtractRefreshToken = (token: string): UserData | null => {
  const secretKey: string = process.env.JWT_REFRESH_TOKEN as string;

  let resData: any;

  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result: UserData = <UserData>resData;
    return result;
  }
  return null;
};

export default {
  ExtractRefreshToken,
  ExtractToken,
  GenerateRefreshToken,
  GenerateToken,
  ResponseData,
};
