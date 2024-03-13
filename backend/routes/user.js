const express = require('express');
const router = express.Router();

const zod = require('zod');
const User = require("./../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } =require("../config")



const signupschema = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})
router.post("/signup", async (req, res)=>{
    const success = signupschema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username : req.body.username
    })
    if(existingUser){
        res.status(411).send({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username : req.body.username,
        firstname: req.body.firstName,
        lastname: req.body.lastname,
        password: req.body.password
    })
    const userId = user._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message : "User created Successfully",
        token: token
    })
})


const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
router.post("/signin", async (req,res)=>{
    const success = signinSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Email not signedup / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId : user._id
        }, JWT_SECRET);

        res.json({
            message :  token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})
module.exports = router;