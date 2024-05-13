import express from 'express';
import { login } from '../models/Login.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

// route for new authentication 
router.post('/',  async (req,res)=>{
    try{
        login.find({userId : req.body.userId}).exec().then(newlog=>{
            if(newlog.length>=1)
            {
                res.send("User Already Exist !!!");
            }
            else
            {
                bcrypt.hash(req.body.Password,10,async (err,hash)=>{
                    if(err)
                    {
                        res.send(err);
                    }
                    else
                    {
                        const logIn = new login ({
                            userId : req.body.userId,
                            Password:hash
                        });
                        try{
                            const newlog = await logIn.save();
                            res.send(newlog);
                            console.log(newlog);
                    
                        }catch(err){
                           res.send(err);
                        }
                    }
                    });
            }
        })
    }catch(er){
        res.send(er);
    }
});
/***************route for verifying new login to give acess********/
router.post('/loginId', (req,res)=>{
    try{
        login.find({userId : req.body.userId}).exec().then(newlog=>{
           if(newlog.length<1)
           {
                res.send("Invalid login authentication");//userId not found
           }else{
            bcrypt.compare(req.body.Password,newlog[0].Password,(er,ress)=>{
                if(er){
                    res.send("Invalid Password");
                }
                else if(ress){
                   const token = jwt.sign({
                        loginAddress : newlog[0].userId,
                        loginId : newlog[0]._id
                    },process.env.JWT_KEY,{
                        expiresIn : "1h"
                    });
                    res.send(token);
                }
                else{
                    res.send("Invalid Password");
                }
               })
           }
           
        })
    }catch(er){
        res.send(er);
    }
});
//*************deleting an existing login authentication******** */

router.delete('/:id', (req, res) => { 
    console.log(`login authentication  with id ${req.params.id} has been deleted`);
    try{
        const deletedUser =  User.deleteMany({_id:req.params.id});
       deletedUser
        .then((result)=>{
            res.send(result);
        })    
    }catch(err){
        res.send(err);
    }
});



export default router;