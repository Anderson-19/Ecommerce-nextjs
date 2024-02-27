export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getOrdersByUser, getUser } from "@/actions";
import { auth } from "@/auth.config";
import prisma from "@/lib/prima";
import Link from "next/link";
import Image from 'next/image';
import { redirect } from "next/navigation";
import { TableOrders } from "./ui/TableOrders";

export default async function ProfilePage() {

    const session = await auth();

    const user = await getUser();
    const { orders } = await getOrdersByUser();
    const allOrders = await prisma.order.findMany({});

    if (!session?.user) redirect('/');

    return (
        <>
            <div className="h-full">
                <div className="bg-white rounded-lg shadow-xl pb-8">

                    <div className="w-full h-[250px] bg-slate-100"></div>
                    <div className="flex flex-col items-center -mt-20">
                        <Image src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg" className="w-40 border-4 border-white rounded-full" alt={""} />
                        <div className="flex items-center space-x-2 mt-2">
                            <p className="text-2xl">{session.user.name}</p>
                        </div>
                        {/* <p className="text-gray-700">Senior Software Engineer at Tailwind CSS</p> */}
                        <p className="text-sm text-gray-500">{user?.city}, {user?.country.id}</p>
                    </div>
                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="w-full flex flex-col 2xl:w-1/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Información personal</h4>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex border-y py-2">
                                    <span className="font-bold w-24">Full name:</span>
                                    <span className="text-gray-700">{session.user.name}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Birthday:</span>
                                    <span className="text-gray-700">{new Date().getDate()}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Joined:</span>
                                    <span className="text-gray-700">{new Date().getDate()}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Mobile:</span>
                                    <span className="text-gray-700">{user?.phone}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Email:</span>
                                    <span className="text-gray-700">{session.user.email}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Location:</span>
                                    <span className="text-gray-700">{user?.city}, {user?.country.id}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Languages:</span>
                                    <span className="text-gray-700">English, Spanish</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col w-full 2xl:w-2/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <Link href={'/orders'} className="text-xl text-gray-900 font-bold mb-6">Ordenes</Link>
                            <table className="w-full">
                                <thead className="bg-gray-200 border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            #ID
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Estado
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Fecha de compra
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {session.user.role === "user" ?
                                        orders?.map(order => (
                                            <TableOrders order={order} key={order.id}/>
                                        )) : (
                                            allOrders?.map(order => (
                                                <TableOrders order={order} key={order.id} id={session.user.id } />
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
