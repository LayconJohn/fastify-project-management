import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserSchema } from "./user.schema";

export async function createUser(input: CreateUserSchema){

    const { password, ...rest } = input;

    const {hash, salt} = hashPassword(password)

    const user = await prisma.user.create({
        data: {
            ...rest,
            salt,
            password: hash
        }
    })

    return user;
}

export async function findUserByemail(email: string){
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}