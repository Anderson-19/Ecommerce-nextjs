'use server';

import prisma from "@/lib/prima";

export const getProductSlug = async( slug: string ) => {

    try {
        const product = await prisma.product.findFirst({
            include: {
                ProductImage: {
                    select: {
                        url: true
                    }
                }
            },
            where: { slug }
        });

        if ( !product ) return null;

        return {
            ...product,
            images: product.ProductImage.map( ({ url }) => url )
        }
        
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo cargar el producto');
    }

}
