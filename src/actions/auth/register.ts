'use server';

import prisma from "@/lib/prima";
import bcryptjs from 'bcryptjs';

interface User {
    name: string;
    email: string;
    password: string;
}

export const registerUser = async ({ name, email, password }: User) => {

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync( password )
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return {
            ok: true,
            user,
            message: 'Usuario creado'
        }
    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }

} 