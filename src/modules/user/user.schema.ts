import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod"

const userCore = {
    email: z.string({
        required_error: "Email is Required",
        invalid_type_error: "email must be a string"
    }).email(),
    name: z.string(),
}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: "Password is Required",
        invalid_type_error: "Password must be a string"
    })
})

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore
})

export type CreateUserSchema = z.infer<typeof createUserSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema
})