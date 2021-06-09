import User from '../models/User'
import Role from '../models/Role'

export const createUser = async (req,res) => {

    if(!req.body.username || !req.body.email){
        return res.status(400).json({
            message: 'Content cannot be empty!'
        });
    }
    try{
        const {username, email, password, roles} = req.body;

        const newUser = new User ({
            username, 
            email,
            password: await User.encryptPassword(password)
        }) ;

        if(roles){
            const foundedRoles = await Role.find({name:{$in: roles}})
            newUser.roles = foundedRoles.map(role => role._id)
        } else {
            const role = await Role.findOne({name: 'user'});
            newUser.roles = [role._id];
        }

        const user = await newUser.save();
        res.status(201).json(user);
    }catch(e){
        res.status(500).json({
            message: e.message || 'Something goes wrong creating the user'
        })
    }
}

export const findAllUsers = async (req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(e){
        res.status(500).json({
            message: e.message || 'Something goes wrong retrieving the users'
        })
    }

}

export const findUserById = async (req,res) => {
    try{
        const user = await User.findById(req.params.userId);
        res.json(user);
    }catch(e){
        res.status(500).json({
            message: e.message || 'Something goes wrong retrieving the user'
        })
    }

}