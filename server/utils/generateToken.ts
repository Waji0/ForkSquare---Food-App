// import jwt from "jsonwebtoken";
// import { IUserDocument } from "../models/user.model";
// import type { Response } from "express";



// export const generateToken = (res:Response, user:IUserDocument ) => {
//     const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY!, {expiresIn:'1d'});
//     // res.cookie("token", token, {httpOnly:true, sameSite:'strict', maxAge:24*60*60*1000});
//     res.cookie("token", token, {httpOnly:true, sameSite: "none", secure: true, maxAge:24*60*60*1000});
//     // res.status(200).json({   // for learning purpose as sangam
//     //     success: true,
//     //     message: "success",
//     //     token
//     // });
//     return token;
// };



import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUserDocument } from "../models/user.model";

export const generateToken = (res: Response, user: IUserDocument) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, {
    expiresIn: '1d',
  });

  res.cookie("token", token, {
    httpOnly: true,           // cannot be accessed by JS
    sameSite: "none",          // allow cross-site
    secure: true,              // must be true for HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    domain: ".vercel.app",     // optional, helps with subdomains
  });

  return token;
};
