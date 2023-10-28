import jsonwebtoken from 'jsonwebtoken'

function roleBasedAuthentication(expectedRole){
    return (req,res,next)=>{
        try {
            const token = req.body.token || req.query.token || req.headers['authorization']
            console.log(token);
           console.log(token.trim().length,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTg1MjEyNDgsImV4cCI6MTY5ODUyMjE0OH0.pncGyBYcXubZ4xbiUI0Wyih-AMqIauBU9I3WhqvOx_g".length)
            if(token){
                jsonwebtoken.verify(token,process.env.access_secret,function(err,decoded){
                    if(err){
                        console.log(err);
                        return res.status(401).json({"error":true,"message":'unauthorized access'})
             }
             res.locals.jwt_user = decoded;
             const role = res.locals.jwt_user.role
             console.log('role', role);
            
             if(role == expectedRole){
                next()
             }else{
                return res.status(401).json({"error":true,"message":'unauthorized access'})
             }
             
                })
            }else{
                return res.status(401).json({
                    "msg":'No token Provided'
                })
            }
        } catch (error) {
            console.log(error);
           res.status(500).json({message:'internal server error'})
        }
       
    }
}

export default roleBasedAuthentication