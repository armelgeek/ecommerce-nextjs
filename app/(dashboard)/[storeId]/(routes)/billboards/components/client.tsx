"use client";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {BillboardColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/columns";
import ApiList from "@/components/ui/api-list";
interface BillingClientProps {
    data: BillboardColumn[]
}
export const BillboardClient = ({
    data
}: BillingClientProps) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex-col">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Billboards (${data.length})`}
                        description="Manage billboards for your store"
                    />
                    <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                        <Plus className="mr-4 h-4 w-4"/>
                        Add New
                    </Button>
                </div>
            </div>
            <Separator/>
            <Heading
                title={`API`}
                description="API calls for billboards"
            />
            <DataTable searchKey="label" columns={columns} data={data}/>
            <ApiList entityName="billboards" entityIdName="billboardId"/>
        </>
    )
}
