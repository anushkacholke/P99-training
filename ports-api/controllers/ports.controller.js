
import { readFileSync, stat } from "fs";
import { join } from "path";


const dataPath=join(import.meta.dirname, "../data/ports.json");
let ports=JSON.parse(readFileSync(dataPath, "utf-8"));

const ok= (res, data, status=200)=>
    res.status(status).json({success: true, data});


const fail=(res, message, status)=>
    res.status(status).json({success: false, error: message});

//                    get all ports
export const getAllPorts=(req,res)=>{
    // ok(res, { ports });
    const { country, status, port_role, page, limit }=req.query;
    let result=[...ports];

    if(country){
        result=result.filter((p)=>
            p.country?.toLowerCase().includes(country.toLowerCase())
        );
};

if (status){
    result=result.filter(
        (p)=>p.status.toLowerCase()===status.toLowerCase()
    );
}
if (port_role){
    result=result.filter(
        (p)=>p.port_role.toLowerCase()===port_role.toLowerCase()
    );
}



// pagination 
const pageNum=Math.max(1, parseInt(page) || 1);
const limitNum=Math.min(100, Math.max(1, parseInt(limit) || 10));
const total=result.length;
const totalPages=Math.ceil(total/limitNum);
const start=(pageNum-1)*limitNum;
const paginated=result.slice(start, start +limitNum);

ok(res,{
    ports: paginated,
    pagination:{
        total,
        page:pageNum,
        limit:limitNum,
        totalPages,
    },
});

};
//         GET /port/:code
export const getPortByCode=(req,res)=>{
    const { code }=req.params;

    //unlocode comparision in case-insenstitive
    const port = ports.find(
        (p)=> p.unlocode.toLowerCase()===code.toLowerCase()
    );

    if (!port){
        return fail(res, `Port woth unlocode "${code}" not found`,404);
    }
    ok(res,port);
};


//                     create port
export const createPort=(req,res)=>{
    const { unlocode, name, country }=req.body;

    const missing=[];
    if(!unlocode) missing.push("unlocode");
    if(!name) missing.push("name");
    if(!country) missing.push("country");

    if (missing.length>0){
        return fail(res, `Missing required fields: ${missing.join(", ")}`, 400);
    }
    const exists=ports.some(
        (p)=>p.unlocode.toLowerCase()===unlocode.toLowerCase()
    );
    if(exists){
        return fail(res, `A port with unlocode "${unlocode}" already exists`,400);
    }
    const newPort={ ...req.body, unlocode: unlocode.toUpperCase() };
    ports.push(newPort);

    ok(res, newPort, 201);
};


//         delete port-- remove port by unlocode       /port/:code
export const deletePort=(req,res)=>{
    const { code }=req.params;

    const index=ports.findIndex(
        (p)=>p.unlocode.toLowerCase()===code.toLowerCase()
    );
    if(index===-1){
        return fail(res, `Port with unlocode "${code}" not found`,404);
    }

    const [removed]=ports.splice(index,1);
    ok(res, {message: `Port "${removed.unlocode}" deleted successfully`});
};


 export default getAllPorts;





