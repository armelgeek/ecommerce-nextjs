import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";

const SetupLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const {userId} = auth()
    if (!userId) {
        return redirect('/sign-in')
    }
    // @ts-ignore
   // const billboard = await db.billboard
    const store = await db.store.findFirst({
        where: {
            userId
        }
    })
    if(store){
        return redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    );
};

export default SetupLayout;
