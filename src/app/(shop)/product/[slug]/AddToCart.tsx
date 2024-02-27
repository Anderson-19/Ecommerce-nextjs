'use client';

import { QuantitySelector, SizeSelector } from '@/components'
import type { CartProduct, ValidSizes,Product } from '@/interfaces';
import { useCartStore } from '@/store';
import React, { useEffect, useState } from 'react'

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore( state => state.addProductToCart );

    const [size, setSize] = useState<ValidSizes | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState<boolean>(false);

    useEffect(() => {
        setQuantity(1);
    }, [size]);

    const addToCart = () => {
        setPosted(true);

        if (!size) return;

        const cartProducts: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0],
        }

        addProductToCart(cartProducts);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    }

    return (
        <>

            {
                posted && !size && (
                    <span className="mt-2 text-red-500 fade-in">
                        Debe de selccionar una talla*
                    </span>
                )
            }
            {/* Selector de Tallas */}
            <SizeSelector
                selectedSize={size}
                onSizeChanged={(size) => setSize(size)}
                availableSizes={product.sizes}
            />

            {/* Selector de Cantidad */}

            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={(quantity) => setQuantity(quantity)}
            />

            {/* Button */}
            <button
                onClick={addToCart}
                className={`${size ? 'btn-primary my-5' : 'btn-primary my-5 cursor-not-allowed focus:outline-none disabled:opacity-75'}`}
            >
                Agregar al carrito
            </button>
        </>
    )
}
