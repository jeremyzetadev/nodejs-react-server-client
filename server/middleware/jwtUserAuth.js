import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
    const authHeader_token = req.headers['authorization'];
    // console.log("authHeader:" + authHeader);
    // const token = authHeader && authHeader.split(' ')[1];
    // console.log("token:" + token);
    if(authHeader_token==null) return res.sendStatus(401);

    jwt.verify(authHeader_token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
        console.log('access token verified');
        if(err) return res.sendStatus(403);
        req.user = user
        next()
    })
}
