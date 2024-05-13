import jwt from "jsonwebtoken";
export const auth =(req,res,next)=>{

    try{
        const decode = jwt.verify(req.body.token,process.env.JWT_KEY)
        req.data = decode;
        next();
    }catch(err){
        res.send("FAILED !!");
    }
   
}