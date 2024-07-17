import pg from 'pg';
import { config } from 'dotenv';
config();

const Client = new pg.Client({
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

Client.connect().then(() => {
    console.log("Connected to DB");
})
.catch((err) => { console.log("Error connecting to DB \n"+err) })

export default Client;