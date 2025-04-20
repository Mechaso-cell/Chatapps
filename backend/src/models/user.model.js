import mongoose from "mongoose"; // importing mongoose to start building schema

const userSchema = new mongoose.Schema( //creating a variable that stores the function that create schema object 
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
    },
    {timestamps: true}
)

const User = mongoose.model("User", userSchema);

export default User;