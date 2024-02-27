import { ValidSizes } from '@/interfaces';
import clsx from 'clsx';
import React from 'react'

interface Props {
    selectedSize?: ValidSizes;
    availableSizes: ValidSizes[];  // ['SX', 'M', 'XL', 'XXL']

    onSizeChanged: (size: ValidSizes) => void;
}

export const SizeSelector = ({ availableSizes, selectedSize, onSizeChanged }: Props) => {
    return (
        <div className="my-5">
            <h3 className="font-bold mb-4">Tallas disponibles</h3>

            <div className="flex">

                {
                    availableSizes.map(size => (
                        <button
                            key={size}
                            onClick={ () => onSizeChanged(size) }
                            className={
                                clsx(
                                    "mx-2 hover:underline text-lg",
                                    {
                                        'underline': size === selectedSize
                                    }
                                )
                            }
                        >
                            {size}
                        </button>
                    ))

                }

            </div>

        </div>
    )
}
