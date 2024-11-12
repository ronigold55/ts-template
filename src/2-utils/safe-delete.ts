import fsPromises from "fs/promises";
import fs from "fs";

async function safeDelete(fileName: string): Promise<void> {

    try {
        // If fileName is null or undefined: 
        if (!fileName) return;

        // If file exists - delete it: 
        if (fs.existsSync(fileName)) {
            await fsPromises.unlink(fileName);// Delete file
        }
    }
    catch (err: any) {
        console.log(err);
    }

}

export default safeDelete;