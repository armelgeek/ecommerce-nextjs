"use client";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {CategoryColumn, columns} from "./columns";
import ApiList from "@/components/ui/api-list";
interface CategoryClientProps {
    data: CategoryColumn[]
}
export const CategoryClient = ({
    data
}: CategoryClientProps) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex-col">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Categories (${data.length})`}
                        description="Manage cateories for your store"
                    />
                    <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                        <Plus className="mr-4 h-4 w-4"/>
                        Add New
                    </Button>
                </div>
            </div>
            <Separator/>
            <DataTable searchKey="name" columns={columns} data={data}/>
            <Heading
                title={`API`}
                description="API calls for categories"
            />
            <ApiList entityName="categories" entityIdName="categoryId"/>
        </>
    )
}
