import runQuery from "../db/dal";


export async function isDbServerUp() {    
    try {
        await runQuery("select id from product where id=0;");
        return true;
    } catch (error) {
        return false;        
    }
}