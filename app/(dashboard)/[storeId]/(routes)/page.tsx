import React from "react";
import {db} from "@/lib/db";

interface DashboardPageProps {
    params: {
        storeId: string
    }
}
const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    // @ts-ignore
    const store = await db.store.findFirst({
        where: {
            id: params.storeId
        }
    })
    return (
        <div>

        </div>
    )
}
export default DashboardPage;
