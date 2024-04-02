import { FastifyInstance } from "fastify";
import { registerUserHandler } from "./user.controller"

async function userRoutes(server: FastifyInstance){
    server.post('/create', registerUserHandler)
}

export default userRoutes