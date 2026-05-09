import mongoose from "mongoose";

const fileShareSchema = new mongoose.Schema({
    fileName: { type: String , required: true },
    path: { type: String, required: true },
    code: { type: Number, required: true , unique: true },
    createdAt: {type: Date,
        default: Date.now,
        expires: 300,
    }

})

const Fshare = mongoose.model("fileShare",fileShareSchema);

export default Fshare;
