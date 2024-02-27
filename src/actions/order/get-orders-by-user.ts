'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prima";

export const getOrdersByUser = async () => {

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
            OrderAddress: true,
            OrderItem: {
                select: {
                    price: true,
                    quantity: true,
                    size: true,

                    product: {
                        select: {
                            title: true,
                            slug: true,

                            ProductImage: {
                                select: {
                                    url: true
                                },
                                take: 1
                            }
                        }
                    }
                }
            }
        }
    });

    return {
        ok: true,
        orders: orders,
    }
}