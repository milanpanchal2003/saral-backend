// middleware/verifyToken.js
import jwt from "jsonwebtoken";


const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // If stored in cookie


  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }


  try {
    const decoded = jwt.verify(token, "your123jwt123secret"); // Use same secret used during login
    req.user = decoded; // decoded contains _id and other info
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};


export default verifyToken;



