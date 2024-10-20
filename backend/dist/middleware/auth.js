import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
    const token = req.cookies["auth_token"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decodedToken.userId;
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
export default verifyToken;
//# sourceMappingURL=auth.js.map