import User from '../models/User'
import {ROLES} from '../models/Role' //esto podria hacerse desde una consulta a la bd 

export const checkIfExistsUsernameOrEmail = async (req,res,next) => {
    try{
        const user = await User.findOne({username: req.body.username});

        if(user) return res.status(400).json({message: 'The user already exists'});

        const email = await User.findOne({email: req.body.email});

        if(email) return res.status(400).json({message: 'The email already exists'});

        next();

    }catch(e){
        res.status(500).json({
            message: e.message || 'Something goes wrong checking the username and the email'
        })
    }
}

export const checkRolesExist = async (req,res,next) => {
    try{
        if(req.body.roles){
            console.log('llegueeee')
            for(let i=0;i<req.body.roles.length;i++){
                if(!ROLES.includes(req.body.roles[i])){
                    console.log('llegue al if del for')
                    return res.status(400).json({
                        message: `Role ${req.body.roles[i]} does not exists`
                    });
                }
            }   
        }
        next();
    }catch(e){
        res.status(500).json({
            message: e.message || 'Something goes wrong checking the roles'
        })
    }
}