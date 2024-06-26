import React from "react";
import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import SettingsForm from "./components/SettingsForm";

interface SettingPageProps {
    params: {
        storeId: string
    }
}
const SettingPage: React.FC<SettingPageProps> = async ({  params }) => {
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
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-8">
                <SettingsForm initialData={store}/>
            </div>
        </div>
    )
}
export default SettingPage;
