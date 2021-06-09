import jwt from 'jsonwebtoken'
import config from '../configuration/config'
import Role from '../models/Role';
import User from '../models/User';

export const verifyToken = async (req,res,next) => {
    try{
        const token = req.headers["authorization"]
    
        if(!token) return res.status(403).json({message: 'No token provided'})
    
        const decoded = jwt.verify(token,config.SECRET);
        req.id = decoded.id;

        const user = await User.findById(req.id, {password: 0});

        if(!user) return res.status(404).json({message: 'No user found'})

        next();//permite continuar con la ruta

    }catch(e){
        res.status(401).json({
            message: e.message || 'Unauthorized'
        })
    }
}

export const isModerator = async (req,res,next) => {
    try{
        const user = await User.findById(req.id);
        const roles = await Role.find({ _id: { $in: user.roles } })
        console.log(roles);

        for (let i = 0; i < roles.length; i++){
            if(roles[i].name === "moderator" || roles[i].name === "admin"){
                next();
                return;
            }
        }
        return res.status(401).json({message: "Require Moderator Role!"});
    }catch(e){
        res.status(403).json({
            message: e.message || 'Unauthorized'
        })
    }
}

export const isAdmin = async (req,res,next) => {
    try{
        const user = await User.findById(req.id);

        const roles = await Role.find({_id: {$in: user.roles}})
        console.log(roles);

        for (let i=0;i<roles.length;i++){
            if(roles[i].name==="admin"){
                next();
                return;
            }
        }
        return res.status(401).json({message: "Require administrator rol"});
    }catch(e){
        res.status(403).json({
            message: e.message || 'Unauthorized'
        })
    }
}