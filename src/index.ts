import Fastify from "fastify";

const server = Fastify();

server.get('/health', async function(request, response) {
    return {status: "OK"}
});

async function main(){

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