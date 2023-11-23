import { Router } from "express";

const routers = Router();

routers.get('/', () => {
    'Hello World'
})

export default routers;