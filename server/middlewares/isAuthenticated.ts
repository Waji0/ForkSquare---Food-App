import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// declare global {
//     namespace Express{
//         interface Request {
//             id: string;
//         }
//     }
// }

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        // email?: string;
      };
    }
  }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies.token;
        // authHeader = req.header['Authorization']; 

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        // verify the toekn
        const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

        // check is decoding was successfull
        if (!decode) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        // req.user.id = decode.userId;
        req.user = {
        id: decode.userId,
        // email: decode.email ?? "", // optional
        };


        next();

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};