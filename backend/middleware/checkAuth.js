import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, "")
    // frontdan Axios.interceptors.request-le tokeni oturduk(localstorage-den alaraq)
    // bearer ve token cixir deye ancaq token lazimid bize beareri silirik ordan
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123')
            // tokeni yoxlayib hemen tokende olan userin _id-ni aliriq
            req.userId = decoded._id 
            next()
        } catch (err) {
            return res.status(403).json(err.message)
        }
    } else {
        console.log('token gelmedi');
        return res.status(403).json({
            message: "access forbidden"
        })
    }
}