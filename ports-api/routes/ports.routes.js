import { Router } from "express";
import { createPort, deletePort, getAllPorts, getPortByCode } from "../controllers/ports.controller.js";
const router = Router();

//get all ports with optional filtering and pagination
router.get("/",getAllPorts);

//
router.get("/:code",getPortByCode);

router.post("/", createPort);
router.delete("/:code", deletePort);

export default router;

// http://localhost:3000/ --- health check
// http://localhost:3000/port  --- get all ports
// http://localhost:3000/port?country=china&page=1&limit=5  --- get ports with country filter and pagination
// http://localhost:3000/port/AEJEA  --- get port by unlocode

// http://localhost:3000/port  --- create new port (POST)
// {
//   "unlocode": "ZZABC",
//   "name": "Test Port",
//   "country": "Testland",
//   "port_role": "DESTINATION",
//   "status": "active"
// }

// http://localhost:3000/port/AEJEA  --- delete port by unlocode (DELETE)