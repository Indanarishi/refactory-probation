import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imageUrl: { type: String },
    account_type: { type: String },
    id: { type: String }
})

var User = mongoose.model("User", userSchema)

export default User
