const mysql = require("mysql2");
const notification = require("./notification.js");
let connection = null;

async function __connect(){
    return new Promise((resolve, reject)=>{
        connection = mysql.createConnection({
            host: "localhost",
            user: "abhidb",
            password:"admin",
            database:"ALMS"
            });
        
            connection.connect();
            console.log("yay, resource.js have connected to database!");
            resolve(true);
    });
}

async function __createAssemblyLineTable(){
    await __connect();

    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
    
        const sql_query = `CREATE TABLE if not exists assemblyLine(
    assemblyLineId int auto_increment primary key,
    name varchar(300) NOT NULL,
    capacity int NOT NULL,
    LCUserId int,
    otherInfo varchar(300),
    CONSTRAINT fk_machine FOREIGN KEY (LCUserId) REFERENCES user(userid)  
        ON DELETE CASCADE
    );`;
    
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            //console.log(results);
            console.log("Assembly Line Table has been created successfully!");
            resolve(true);
        })
    });
    
}

async function __createAssemblyLineLayoutTable(){
    await __connect();

    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
    
        const sql_query = `CREATE TABLE if not exists assemblyLineLayout(
    recordId int auto_increment primary key,
    assemblyLineId int,
    machineId int ,
    productionId int,
    position int ,
    hourlyTarget int,
    otherInfo varchar(300)
    );`;

    /*
    3 NOT NULL
     CONSTRAINT fk_assemblyline_layout FOREIGN KEY (assemblyLineId) REFERENCES assemblyLine(assemblyLineId),
    CONSTRAINT fk_machine_layout FOREIGN KEY (machineId) REFERENCES machine(machineId),
    CONSTRAINT fk_production_layout FOREIGN KEY (productionId) REFERENCES production(productionId)
    */
    
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;
            //console.log(results);
            console.log("Assembly Line Layout Table has been created successfully!");
            resolve(true);
        })
    });
    
}

async function registerAssemblyLine(name, capacity, otherInfo){
    return new Promise((resolve, reject)=>{
        const sql_query = "INSERT into assemblyLine(name, capacity, otherInfo) values('"+name+"', "+capacity+", '"+otherInfo+"');";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            //TODO: Notify Supervisor,LC on new assembly line addition.
            //notification.__notify(, "");
            resolve(results);
        });
    }
    );
}

async function __saveAssemblyLineLayoutEntry(assemblyLineId, machineId, position, otherInfo){
    return new Promise((resolve, reject)=>{
        const sql_query = "INSERT into assemblyLineLayout(assemblyLineId, machineId, position, otherInfo) values("+assemblyLineId+", "+machineId+", "+position+", '"+otherInfo+"');";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            //TODO: Notify Supervisor,LC on layout set.
            //notification.__notify(, "");
            resolve(results);
        });
    }
    );
}

async function saveAssemblyLineLayout(assemblyLineId, layoutArr){ // [{machineId: 1, position: 5, otherInfo: "None"}]
    await __deleteOldLayout(assemblyLineId);
    for(let i=0; i<layoutArr.length; i++){
        await __saveAssemblyLineLayoutEntry(assemblyLineId, layoutArr[i].machineId, layoutArr[i].position, layoutArr[i].otherInfo);
    }
    return "Successful Save!";
}

async function getAssemblyLineLayout(assemblyLineId){
    return new Promise((resolve, reject)=>{
        const sql_query = " SELECT * FROM assemblyLine t1,assemblyLineLayout t2, machine t3 where t1.assemblyLineId=t2.assemblyLineId and t2.machineId=t3.machineId and t1.assemblyLineId = "+assemblyLineId+";";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }

            resolve(results);
        });
    }
    );
}

async function getAssemblyLineList(){
    return new Promise((resolve, reject)=>{
        const sql_query = " SELECT * FROM assemblyLine";
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function __deleteOldLayout(assemblyLineId){
    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
        
        const sql_query = "delete from assemblyLineLayout where assemblyLineId="+assemblyLineId+";"; 
    
        connection.query(sql_query, (err, results, fields)=>{
            if(err) throw err;

            if(results.length!=0) resolve("VALID_USER_HASH");
            else resolve("INVALID_USER_HASH");
        })
    });
}

async function assignLC(assemblyLineId, LCUserId){
    return new Promise((resolve, reject)=>{
        if(connection==null){
            console.log("Connect to databse first!");
            reject(false);
        }
        
            const sql_query = "UPDATE assemblyLine SET LCUserId ="+LCUserId+" WHERE assemblyLineId="+assemblyLineId; 
        
            connection.query(sql_query, (err, results, fields)=>{
                if(err) throw err;
                //console.log(results);
                console.log(LCUserId + " LC has been assigned successfully!");
                notification.__notify(LCUserId, "Production Manager has assigned you to assembly Line "+assemblyLineId);
                resolve(true);
            })
    });
}

module.exports = { registerAssemblyLine, __createAssemblyLineTable, __createAssemblyLineLayoutTable, __saveAssemblyLineLayoutEntry, saveAssemblyLineLayout, getAssemblyLineLayout, getAssemblyLineList, assignLC}