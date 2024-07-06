"use client";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";
import {OrderColumn,columns} from "./columns";
interface OrderClientProps {
    data: OrderColumn[]
}
export const OrderClient = ({
    data
}: OrderClientProps) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage orders for your store"
            />
            <DataTable searchKey="name" columns={columns} data={data}/>
            <Heading
                title={`API`}
                description="API calls for orders"
            />
        </>
    )
}
