import jwt from 'jsonwebtoken';
const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('No authentication token provided');
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add decoded user data to request
        req.id = decoded.id;
        req.login = decoded.login;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};
export default auth;
