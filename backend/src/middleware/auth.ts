import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface customRequest extends Request {
  userid?: string;
}
const verifytoken = (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token == undefined) {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err, decoded) => {
        if (err) {
          res.status(401).json({
            message: "Unauthorized",
          });
        }
        req.userid = decoded?.toString();
        next();
      }
    );
  } catch (err: any) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default verifytoken