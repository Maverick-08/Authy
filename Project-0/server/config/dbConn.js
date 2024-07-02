import mongoose from 'mongoose';

const connect = async ()=>{
    try{
        await mongoose.connect(`${process.env.DATABASE_URI}`);
    }
    catch(err){
        console.log("@dbConn : "+err.name+"\n"+err.message);
    }
}

export default connect;