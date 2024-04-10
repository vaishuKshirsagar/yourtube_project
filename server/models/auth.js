import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    googleId: { type: String },
    email: { type: String, required: true, unique:true},
    name: { type: String },
    image: {type: String},
    desc: { type: String },
    joinedOn: { type: Date, default: Date.now }
}, {
    timestamps: true
}
)
export default mongoose.model("User", userSchema)