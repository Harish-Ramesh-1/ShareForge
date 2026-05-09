import Tshare from "../Models/shareModel.js";
import Fshare from "../Models/shareModel2.js";
import path from 'path';



export const codeGen = async (req, res) => {
    try {
        const codenum = Math.floor(100000 + Math.random() * 900000);
        await Tshare.create({ ...req.body, code: codenum });
        res.status(201).json(codenum);
    }catch(err){
        res.status(400).json({error: err.message });
    }
}

export const recieveCode = async (req,res) => {
    try{
        const { code } = req.body;
        const texts = await Tshare.findOne({ code }, { text: 1, _id: 0 });

        if (!texts) {
            const img = await Fshare.findOne({ code }, { fileName: 1, _id: 0 });
            console.log("successfully recived");
            return res.status(200).json({ url: `http://localhost:5000/uploads/${img.fileName}` });
        }
        console.log("shared successfully");
        res.status(200).json({text: texts.text});

    }catch(err){
        res.status(400).json(err.message);
    }
}


export const codeGen2 = async (req, res) => {
    try {
        const codenum = Math.floor(100000 + Math.random() * 900000);
        await Fshare.create({ fileName: req.file.filename,path: req.file.path, code: codenum });
        console.log("file shared successfully");
        res.status(201).json(codenum);
    }catch(err){
        res.status(400).json({error: err.message });
    }
}