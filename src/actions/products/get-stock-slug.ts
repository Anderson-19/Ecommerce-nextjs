'use server';

import prisma from "@/lib/prima";

export const getStockSlug = async(slug: string): Promise<number> => {
    try {

        const stock = await prisma.product.findUnique({
            where: { slug },
            select: { inStock: true }
        });

        return stock?.inStock ?? 0;
        
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo cargar el producto');
    }
}