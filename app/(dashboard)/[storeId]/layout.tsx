import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import Navbar from "@/components/ui/navbar";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { storeId: string}
}) {
    const {userId} = auth()
    if (!userId) {
        return redirect('/sign-in')
    }
    // @ts-ignore
    const store = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    if(!store) {
        return redirect('/');
    }
    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}
