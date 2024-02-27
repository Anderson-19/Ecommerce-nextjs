'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { useRouter } from 'next/navigation';

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState<boolean>(false);
    const router = useRouter();

    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    //if ( productsInCart.length < 1 ) router.push('/');

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
                            <span>
                                {product.title} - Size: {product.size} ({ product.quantity })
                            </span>
                            <p className="font-bold">{ currencyFormat(product.price * product.quantity) }</p>

                        </div>

                    </div>

                ))
            }
        </>
    )
}
