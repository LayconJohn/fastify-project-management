import Fastify, { FastifyRequest, FastifyReply, FastifyInstance  } from "fastify";
import fjwt, { FastifyJWT } from "fastify-jwt"
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

declare module 'fastify' {
    export interface FastifyRequest {
      verifyJwt: () => Promise<void>;
    }
  }

  declare module 'fastify' {
    export interface FastifyInstance {
            jwt: {
              sign: (payload: any) => Promise<string>;
              verify: (token: string) => Promise<any>;
            };
        }
  }

export const server: FastifyInstance  = Fastify();

server.register(fjwt, {
    secret: "Secret_Key_Secret"
})

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.verifyJwt()
    } catch (error) {
        reply.send(error)
    }
})

server.get('/health', async function() {
    return {status: "OK"}
});

async function main(){

    for(const schema of userSchemas) {
        server.addSchema(schema)
    }

    server.register(userRoutes, {
        prefix: 'api/users'
    })

    try {
        await server.listen({
            port: 3000,
            host: '0.0.0.0'
        });
        console.log("Running on http://localhost:3000")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main();