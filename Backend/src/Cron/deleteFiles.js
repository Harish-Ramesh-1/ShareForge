import cron from 'node-cron';
import fs from 'fs/promises';
import path from 'path';


const uploadPath = path.join(process.cwd(), "uploads");

const clearFiles = async () => {
    const files = await fs.readdir(uploadPath);

    for(const file of files){
        const filePath = path.join(uploadPath, file);

        const stats = await fs.stat(filePath);

        const now = Date.now();
        const fileAge = now - stats.mtimeMs;

        if(fileAge > 60*5*1000){
            await fs.unlink(filePath);
        }
    }
    console.log("Deleted All Files Sussessfully");

}

cron.schedule('*/30 * * * *', async () => {
    clearFiles();
})