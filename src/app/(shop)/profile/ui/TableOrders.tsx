'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

interface Props {
    order: any;
    id?: string;
}

export const TableOrders = ({ order, id }: Props) => {

    const router = useRouter();
    return (
        <tr
            key={order.id}
            onClick={() =>  order.userId === id ? router.push('/orders') : router.push('/admin/orders')}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.id.split('-').at(-1)}
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                {order.isPaid ? (
                    <>
                        <IoCardOutline className="text-green-800" />
                        <span className='mx-2 text-green-800'>Pagada</span>
                    </>
                ) : (
                    <>
                        <IoCardOutline className="text-red-800" />
                        <span className='mx-2 text-red-800'>No Pagada</span>
                    </>
                )}

            </td>
            <td className="text-gray-900 font-light whitespace-nowrap">
                {order.createdAt.getDate()}/{order.createdAt.getMonth() + 1}/{order.createdAt.getFullYear()}
            </td>
        </tr>
    )
}
