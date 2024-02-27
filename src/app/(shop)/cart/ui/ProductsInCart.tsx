'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Link from 'next/link';

export const ProductsInCart = () => {

    const productsInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProductFromCart = useCartStore(state => state.removeProductFromCart);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) return <p>Loading.....</p>

    return (
        <>
            {
                productsInCart.map(product => (

                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                            alt={product.title}
                            className="mr-5 rounded"
                        />

                        <div>
                            <Link
                                className="hover:underline cursor-pointer"
                                href={`/product/${product.slug}`}
                            >
                                {product.title} - Size: {product.size}
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
                            />

                            <button
                                className="underline mt-3"
                                onClick={() => removeProductFromCart(product)}
                            >
                                Remover
                            </button>
                        </div>

                    </div>

                ))
            }
        </>
    )
}
