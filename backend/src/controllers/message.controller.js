import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUser)
    
    } catch (error) {
        console.log("error in getUserForSidebar", error.message)
        res.status(500).json({message:"internal server error"})
        
    }
}

export const getMessages = async (req,res) => {
    try {
        const {id:userToChatId } = req.params
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId:myId, recieverId:userToChatId},
                {senderId:userToChatId, recieverIdP:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("error in getUserForSidebar", error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text , image} = req.body;
        const {id: recieverId} = req.params
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            //upload 64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            reciever,
            text,
            image: imageUrl,
        })
           await newMessage.save()

           //todo: realtime functionality goes here => 
            res.status(201).json(newMessage)

        
    } catch (error) {
        console.log("error in getUserForSidebar", error.message)
        res.status(500).json({message:"internal server error"})
    }
}


