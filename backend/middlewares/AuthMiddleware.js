const jwt = require("jsonwebtoken");

// Auth Middleware
// @Moqadar and @Rahul
module.exports = (roles = ["user"]) => {
    return async (req, res, next) => {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: 0,
                message: "No token found",
            });
        }

        try {
            let user = await jwt.verify(token, "fn32iusht3209hg32263nvh92");
            req.user = user;

            if (!roles.includes(user.role)) {
                return res.status(401).json({
                    status: 0,
                    message: "Not Authenticated",
                });
            }

            next();
        } catch (error) {
            return res.status(401).json({
                status: 0,
                message: "No token found",
            });
        }
    };
};
