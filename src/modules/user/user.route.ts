import { FastifyInstance } from "fastify";
import { loginHandler, registerUserHandler } from "./user.controller"
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance){
    server.post('/create', {
        schema: {
            body: $ref('createUserSchema'),
            response: {
                201: $ref('createUserResponseSchema')
            }
        }
    } ,registerUserHandler)

    server.post('/login', {

    }, loginHandler)
}

export default userRoutes