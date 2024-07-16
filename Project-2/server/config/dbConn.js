import pg from 'pg';

const Client = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Authy",
    password:"Vivek2001",
    port: 5433
})

Client.connect()
.then(() => console.log('Connected to PostgreSQL'))
.catch(err => console.error('Connection error', err.stack));

export default Client;