import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByemail } from "./user.service";
import { CreateUserSchema, LoginRequest } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../..";

export async function registerUserHandler(request: FastifyRequest<{
   Body: CreateUserSchema     
}>, reply: FastifyReply) {
    const body = request.body;

    try {
        const user = await createUser(body);
        return reply.code(201).send(user);
    } catch(err) {
        console.log(err);
        return reply.code(500).send(err)
    }
}

export async function loginHandler(request: FastifyRequest<{
    Body: LoginRequest
}>, reply: FastifyReply) {
    const body = request.body;

    const user = await findUserByemail(body.email);

    if(user) {
        const isCorrectPassword = verifyPassword({
            candidatePassword: body.password, 
            salt: user?.salt, 
            hash: user?.password
        })

        if (isCorrectPassword) {
            const { password, salt, ...rest } = user;
            
            return {acessToken: server.jwt.sign(rest)}
        }
    }

    return reply.code(401).send({
        message: "Invalid Email or password"
    })

}