import { format } from 'date-fns';
import React from 'react';
import {BillboardClient} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/client";
import {db} from "@/lib/db";
import {BillboardColumn} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/columns";
import {Billboard} from "@prisma/client";

const BillboardPage = async ({
    params }:{
    params: {storeId: string}
}) => {
    // @ts-ignore
    const billboards = await db.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    const formattedBillBoards: BillboardColumn[] = billboards.map((billboard:Billboard) => ({
        id: billboard.id,
        label: billboard.label,
        createdAt: format(billboard.createdAt, "MMM dd, yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient   data={formattedBillBoards}/>
            </div>
        </div>
    );
};

export default BillboardPage;
