import "reflect-metadata";
import { Container } from "inversify";
import path from "path";
import { readdirSync } from "fs";

import { Loader } from "config/loader";
import { DYNAMIC_LOAD, LOAD_TYPES, TYPES } from "./types";
import { AbstractMessage } from "dto/abstractMessage";
import { IDatabase } from "services/interfaces/IDatabase";
import { MongoDb } from "services/MongoDb";
import { IJoinService } from "services/interfaces/IJoinService";
import { MongoJoinService } from "services/MongoJoinService";

//.toSelf() sans interface
const myContainer = new Container({ defaultScope: "Singleton" });
//Permet de lier une interface avec une classe
myContainer.bind<IDatabase>(TYPES.IDatabase).to(MongoDb);
myContainer.bind<IJoinService>(TYPES.IJoinService).to(MongoJoinService);
myContainer.bind<Loader>(Loader).toSelf();

//Load dynamic
loader<AbstractMessage>(LOAD_TYPES.message);


  //set dependency injection for commands
function loader<Type>( folder : string)  {

  let symbolMap = new Map<string,symbol>();
  const patho : string = path.join(process.cwd(),"src","services", folder);

  let files = readdirSync(patho)
    .filter((file) => file.endsWith('.ts'));  
    //https://stackoverflow.com/questions/50328582/how-to-dynamically-bind-a-dynamically-imported-type
    for(var i = 0; i < files.length ; i++) {
      //import dynamic 
      let imported = require(`${patho}/${files[i]}`);
      //Ajout dans la liste des symbols pour l'injection de dépendance
      //Obligatoire car il peut y avoir des string identiques dans les commands et messages
      let symbol = Symbol(files[i]);
      symbolMap.set(files[i],symbol);
      myContainer.bind<Type>(symbol).to(imported.default);
    }
    DYNAMIC_LOAD.set(folder,symbolMap);
  }

export { myContainer };