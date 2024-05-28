import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    // console.log(token);

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');
            req._id = decoded._id;
            next();
        } catch (error) {
            return res.status(403).json({
                message: "Invalid token"
            })
        }
    } else {
        return res.status(401).json({
            message: "No access"
        })
    }
}