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
    if(!userId) {
        redirect('/sign-in');
        return  null;
    }
    // @ts-ignore
    const store = await db.store.findFirst({
        where: {
            userId
        }
    })
    if(store){
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    );
};

export default SetupLayout;
