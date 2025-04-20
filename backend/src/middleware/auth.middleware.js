import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// export const protectRoute = async (req,res,next) => {
//     try {
//         const token = req.cookies.jwt

//         if(!token) {
//             return res.status(401).json({message: "Unauthorized - No token Provided"})
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
       

//         if(!decoded) {
//             return  res.status(401).json({message: "Unauthorized - Invalid Token"})
//         }

//         const user = await User.findById(decoded.userId).select("-password")

//         if(!user) {
//             return res.status(404).json({message: "User not found"})
//         }

//         req.user = user
//         next()

//     } catch (error) {
//         console.log("Error in ProtectRoute middleware: ", error.message)
//     }
// }

/*import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d" //token

    })
    res.cookie("jwt", token, {      
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict", 
        secure: process.env.NODE_ENV !== "development"
    })

    return token

} */