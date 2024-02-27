'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prima";

export const getOrderByUser = async () => {

    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    const orders = await prisma.order.findMany({
        where: { userId },
        include: {
            OrderAddress: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    });

    return {
        ok: true,
        orders: orders,
    }
}