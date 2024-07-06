import React from 'react';
import {db} from "@/lib/db";
interface BillboardProps {
    data: {
        id: string;
        label: string;
        imageUrl: string
    }
}
const Billboard = async () => {
    // @ts-ignore
    const billboard = await db.billboard.findFirst({
       where: {
           id: '2a98b49d-5573-4ef8-a31c-547e2540b18c'
       }
    })
    return (
        <div className="px-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <div
                className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden"
                style={{
                backgroundImage: `url(${billboard?.imageUrl}`
            }}>
               <div className="w-full h-full flex flex-col justify-center items-center text-center gap-x-3">
                    <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                        {billboard.label}
                    </div>
               </div>
            </div>
        </div>
    );
};

export default Billboard;
