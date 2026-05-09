import mongoose from "mongoose";

const textShareSchema = new mongoose.Schema({
    text: { type: String , required: true},
    code: { type: Number, required: true, unique: true },
    createdAt: {type: Date,
        default: Date.now,
        expires: 300,
    }

})

const Tshare = mongoose.model("TextShare",textShareSchema);

export default Tshare;
