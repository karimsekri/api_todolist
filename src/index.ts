import express from "express";
import dotenv from "dotenv";
import sequelize, { DataTypes , Sequelize} from "sequelize";
//import tedious from "tedious";



const app = express();
dotenv.config();
 const myport = parseInt(process.env.PORT as string);
// const server = process.env.SERVER as string;
// const dataBaseName = process.env.DATABASE as string;
// const userName = process.env.USER as string;
// const pwd = process.env.PASSWORD as string;
// const dbPort =parseInt(process.env.DBPORT as string);


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

//This creates the table
maTache.sync();


app.get("/maTacheCreate/:tacheName", async (req, res) => { 
    const tacheName = req.params.tacheName;  
    const creerMaTache = await maTache.create({tacheName : tacheName, tacheIsChecked : false});
    res.send(creerMaTache);   
});

app.get("/", async (_, res) => { 
    
    res.send("Hello OK");   
});

app.get("/maTacheFindAll", async (_, res) => {   
    const maListeDeTache =  await maTache.findAll();     
    res.send(maListeDeTache);   
});

app.delete("/maTacheDelete/:tacheNameId", async (req, res) => { 
    const tacheNameID = req.params.tacheNameId;  
    const deleteMaTache =  await maTache.destroy({
        where:{
            id : tacheNameID
        }
});  
   
    res.send("deleted");   
});

app.delete("/deleteAll", async (req, res) => { 
      
    const deleteMaTache =  await maTache.destroy({
        truncate: true
      });  
   
    res.send("deleted");   
});

app.get("/upDateRowTache/true/:id/", async (req, res) => { 
    const tacheID = req.params.id;  
    const updateMaTache = await maTache.update({tacheIsChecked : true},{
        where :{
            id : tacheID
        }
    });
    res.send(updateMaTache);   
});

app.get("/upDateRowTache/false/:id/", async (req, res) => { 
    const tacheID = req.params.id;  
    const updateMaTache = await maTache.update({tacheIsChecked : false},{
        where :{
            id : tacheID
        }
    });
    res.send(updateMaTache);   
});

app.listen( myport, () =>
  console.log(`Server is listening on port ${myport}`)
);