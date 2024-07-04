"use client";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {SizeColumn, columns} from "./columns";
import ApiList from "@/components/ui/api-list";
interface SizeClientProps {
    data: SizeColumn[]
}
export const SizeClient = ({
    data
}: SizeClientProps) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex-col">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Sizes (${data.length})`}
                        description="Manage sizes for your store"
                    />
                    <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                        <Plus className="mr-4 h-4 w-4"/>
                        Add New
                    </Button>
                </div>
            </div>
            <Separator/>
            <DataTable searchKey="name" columns={columns} data={data}/>
            <Heading
                title={`API`}
                description="API calls for sizes"
            />
            <ApiList entityName="sizes" entityIdName="sizeId"/>
        </>
    )
}
