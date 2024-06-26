import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { storeId: string}
}) {
    const {userId} = auth()
    if(!userId) {
        redirect('/sign-in');
    }
    // @ts-ignore
    const store = new db.store.findFirst({
        where: {
            storeId: params.storeId,
            userId
        }
    })
    if(!store) {
        redirect('/');
    }
    return (
        <>
        <div>This will be a navbar</div>
            {children}
        </>
    )
}
