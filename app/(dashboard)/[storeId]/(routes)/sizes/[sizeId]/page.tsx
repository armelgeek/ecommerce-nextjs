import React from 'react';
import {db} from "@/lib/db";
import BillboardForm from "@/app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/components/billboard-form";
import SizeForm from "./components/size-form";

const SizePage = async ({
    params
}: {
    params: { sizeId: string}
}) => {
    // @ts-ignore
    const size = await db.size.findUnique({
        where: {
            id: params.sizeId
        }
    })
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
               <SizeForm initialData={size}/>
            </div>
        </div>
    );
};

export default SizePage;
