'use client';

import { getStockSlug } from "@/actions";
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState<number>(0);
    const [isloading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getStock();
    });

    const getStock = async () => {
        const totalInStock = await getStockSlug(slug);
        setStock(totalInStock);
        setIsLoading(false);
    }
    return (
        <>
            {
                isloading ? (
                    <h1 className={`antialiased font-bold text-lg bg-gray-200 animate-pulse`}>
                        &nbsp;
                    </h1>
                ) : (
                    <h1 className={`antialiased font-bold text-lg`}>
                        Stock: { stock }
                    </h1>
                )

            }
        </>
    )
}
