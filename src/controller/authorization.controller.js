import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../configuration/config'
import Role from '../models/Role';

export const signUp = async (req,res) => {
    try{
        const {username, email, password, roles} = req.body;

        const newUser = new User ({
            username,
            email,
            password: await User.encryptPassword(password)
        })

        if(roles){
            const foundedRoles = await Role.find({name:{$in: roles}})
            newUser.roles = foundedRoles.map(role => role._id)
        } else {
            const role = await Role.findOne({name: 'user'});
            newUser.roles = [role._id];
        }

        const savedUser = await newUser.save();
        console.log(savedUser);
        const token = jwt.sign({id: savedUser._id},config.SECRET,{
            expiresIn: 86400//24hrs
        })
        res.json({token})
    }
    catch(e){
        res.status(500).json({
            message: e.message || 'Something goes wrong'
        })
    }
}

export const signIn = async (req,res) => {
    try{
        //console.log(req.body.email);
        const userFound = await User.findOne({email: req.body.email}).populate("roles");
        console.log(userFound);

        if(!userFound) {
            return res.status(400).json({message: 'user not found'})
        }

        const matchPassword = await User.comparePassword(req.body.password, userFound.password)

        if(!matchPassword) {
            return res.status(400).json({message: 'invalid password'})
        }

        const token = jwt.sign({id: userFound._id},config.SECRET,{
            expiresIn: 86400//24hrs
        })
        res.json({token})
    }catch(e){
        res.status(500).json({
            message: e.message || 'Something goes wrong'
        })
    }
}

export const signOut = async (req,res) => {
    
}