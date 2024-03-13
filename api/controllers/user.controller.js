import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
    res.json({
        message: "Api route is working"
    })
}

export const updateUser = async (req, res, next) => {
    if (req.params.id !== req.user.id) 
        return next(errorHandler(401, 'you can only update your account'))

       try {
            if (req.body.password) {
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
            }

            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                }
            },
            { new: true })

            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest);
       } catch (error) {
            next(error)
       }
    
}
// deleteUser functionality
export const deleteUser = async (req, res, next) => {
    if (req.params.id !== req.user.id) 
        return next(errorHandler(401, 'you can only delete your account'))

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json("User has been deleted!")
        
    } catch (error) {
        next(error)        
    }
} 

export const getUsersListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ user: req.params.id });
            res.status(200).json(listings);

        }
        catch (error) {
            next(error);
        }
    }
    else {
        next(errorHandler(401, 'You can only view your listings'))
    }
};