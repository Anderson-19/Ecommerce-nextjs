'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prima";

export const getUser = async() => {
    try {
        const user = await auth();

        const userProfile = await prisma.userAddress.findUnique({
            where: { userId: user?.user.id },
            select: {
                address: true,
                address2: true,
                city: true,
                country: true,
                countryId: true,
                firstName: true,
                lastName: true,
                phone: true,
                postalCode: true
            }
        });

        return userProfile;
    } catch (error) {
        console.log(error);
    }
}