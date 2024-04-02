import { z } from "zod"

const createUserSchema = z.object({
    email: z.string({
        required_error: "Email is Required",
        invalid_type_error: "email must be a string"
    }).email(),
    name: z.string(),
    password: z.string({
        required_error: "Password is Required",
        invalid_type_error: "Password must be a string"
    })
})

export type CreateUserSchema = z.infer<typeof createUserSchema>