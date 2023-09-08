import express from "express";
import dotenv from "dotenv";
import sequelize from "sequelize";
import tedious from "tedious";


const app = express();
dotenv.config();
const myport = parseInt(process.env.PORT as string);
const server = process.env.SERVER as string;
const dataBaseName = process.env.DATABASE as string;
const userName = process.env.USER as string;
const pwd = process.env.PASSWORD as string;


//Initiation de la connexion
const mySequelize =  new sequelize.Sequelize(dataBaseName,userName,pwd,{
    dialect: 'mssql',    
    host: server, 
    dialectOptions: {
        encrypt: true
    }  
});


//Pour tester la connection 
async function connexionTest() {
    try {
        await mySequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }

   // connexionTest();

app.get("/hellos", (_, res) => {    
    res.send();   
});

app.listen( myport, () =>
  console.log(`Server is listening on port ${myport}`)
);