import { format } from 'date-fns';
import React from 'react';
import {db} from "@/lib/db";
import {ColorColumn} from "./components/columns";
import {ColorClient} from "./components/client";

const ColorsPage = async ({
    params }:{
    params: {storeId: string}
}) => {
    // @ts-ignore
    const colors = await db.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    const formattedColors: ColorColumn[] = colors.map((color: any) => ({
        id: color.id,
        name: color.name,
        value: color.value,
        createdAt: format(color.createdAt, "MMM dd, yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient   data={formattedColors}/>
            </div>
        </div>
    );
};

export default ColorsPage;
