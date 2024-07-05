"use client";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {ProductColumn, columns} from "../components/columns";
import ApiList from "@/components/ui/api-list";
interface ProductClientProps {
    data: ProductColumn[]
}
export const ProductClient = ({
    data
}: ProductClientProps) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex-col">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`Products (${data.length})`}
                        description="Manage products for your store"
                    />
                    <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                        <Plus className="mr-4 h-4 w-4"/>
                        Add New
                    </Button>
                </div>
            </div>
            <Separator/>
            <DataTable searchKey="label" columns={columns} data={data}/>
            <Heading
                title={`API`}
                description="API calls for products"
            />
            <ApiList entityName="products" entityIdName="productId"/>
        </>
    )
}
