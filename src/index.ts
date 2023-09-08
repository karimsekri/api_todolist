import express from "express";
import dotenv from "dotenv";
import sequelize, { DataTypes , Sequelize} from "sequelize";
//import tedious from "tedious";



const app = express();
dotenv.config();
const myport = parseInt(process.env.PORT as string);
const server = process.env.SERVER as string;
const dataBaseName = process.env.DATABASE as string;
const userName = process.env.USER as string;
const pwd = process.env.PASSWORD as string;
const dbPort =parseInt(process.env.DBPORT as string);


//Initiation de la connexion
// const mySequelize =  new sequelize.Sequelize(dataBaseName,userName,pwd,{
//     dialect: 'postgres',    
//     host: server, 
//     port: dbPort,
//     dialectOptions: {
//         encrypt: true
//     }  
// });
const mySequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
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

    //connexionTest();

//Creation du model
const maTache = mySequelize.define('Tache', {
   
    tacheName:{
        type : DataTypes.STRING,
        allowNull:false
   },
    tacheIsChecked:{
        type : DataTypes.BOOLEAN,
        allowNull : false
    }
});
//Verifier la correspondance du model est de la table 
console.log(maTache  === mySequelize.models.Tache);

//This creates the table, dropping it first if it already existed
maTache.sync();



app.get("/maTacheCreate", async (_, res) => {   
    const creerMaTache = await maTache.create({tacheName : "jouer", tacheIsChecked : true});
    res.send(creerMaTache);   
});

app.get("/maTacheFindAll", async (_, res) => {   
    const maListeDeTache =  await maTache.findAll();     
    res.send(maListeDeTache);   
});

app.listen( myport, () =>
  console.log(`Server is listening on port ${myport}`)
);