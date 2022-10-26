import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, "")
    // bearer ve token cixir deye ancaq token lazimid bize beareri silirik ordan

    if (token) {
        console.log(token);
        try {
            const decoded = jwt.verify(token, 'secret123')
            req.userId = decoded._id
            next()
        } catch (err) {
            return res.status(403).json({
                message: "access forbidden(secret123)"
            })
        }
    } else {
        console.log('token gelmedi');
        return res.status(403).json({
            message: "access forbidden"
        })
    }
}