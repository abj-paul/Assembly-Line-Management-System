const db_service = require("./DatabaseService.js");
const productionModel = require("./production.model.js");


FLOOR_TABLE_CREATE_QUERY = `
    CREATE TABLE if not exists floor(
        floorNumber int,
        productionId int,
        CONSTRAINT fk_floor_user_productionId FOREIGN KEY (productionId) REFERENCES production(productionId)
    ON DELETE CASCADE
    );
                `;

async function create_floor_table(){
    await db_service.createTable("floor", FLOOR_TABLE_CREATE_QUERY);
    await __initialize_floors();
}
async function create_dummy_production(){
    await productionModel.startNewProduction("Dummy Production", 100);
}

async function __initialize_floors(){
    await create_dummy_production(); // ProductionId = 1
    console.log("Initializing floors.");
    let INSERT_DATA_QUERY = "INSERT into floor(floorNumber, productionId) values(1,1);";
    await db_service.insertData(INSERT_DATA_QUERY);

    INSERT_DATA_QUERY = "INSERT into floor(floorNumber, productionId) values(2,1);";
    await db_service.insertData(INSERT_DATA_QUERY);

    INSERT_DATA_QUERY = "INSERT into floor(floorNumber, productionId) values(3,1);";
    await db_service.insertData(INSERT_DATA_QUERY);

    INSERT_DATA_QUERY = "INSERT into floor(floorNumber, productionId) values(4,1);";
    await db_service.insertData(INSERT_DATA_QUERY);

    INSERT_DATA_QUERY = "INSERT into floor(floorNumber, productionId) values(5,1);";
    await db_service.insertData(INSERT_DATA_QUERY);

    INSERT_DATA_QUERY = "INSERT into floor(floorNumber, productionId) values(6,1);";
    await db_service.insertData(INSERT_DATA_QUERY);

    INSERT_DATA_QUERY = "INSERT into floor(floorNumber, productionId) values(7,1);";
    await db_service.insertData(INSERT_DATA_QUERY);
}

async function register_new_production(floorNumber, productionId){
    const connection = await db_service.getDBConnection();
    sql_query = "UPDATE floor set productionId="+productionId+" where floorNumber="+floorNumber+" ;";

    return new Promise((resolve, reject)=>{
        connection.query(sql_query, (err, results, fields)=>{
            if(err) {
                reject(err);
            }
            resolve(results);
        });
    }
    );
}

async function get_productionId_for_floor(floorNumber){
    sql_query = "select * from floor where floorNumber="+floorNumber;
    const rows = await getData(sql_query);
    return rows[0].productionId;
}

module.exports = {create_floor_table, register_new_production, get_productionId_for_floor}