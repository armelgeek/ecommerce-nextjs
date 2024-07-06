import React from 'react';
import {db} from "@/lib/db";
import ProductList from "@/components/ProductList";
import Gallery from "@/components/ui/gallery";
import {ProductColumn} from "@/app/(dashboard)/[storeId]/(routes)/products/components/columns";
import {formatter} from "@/lib/utils";
import {format} from "date-fns";
import Info from "@/components/ui/info";
interface ProductPageProps{
    params: {
        productId: string
    }
}
const Page:React.FC<ProductPageProps> = async ({ params }) => {
   //@ts-ignore
    const product = await db.product.findFirst({
        where: {
            id: params.productId
        },
        include:{
            category: true,
            images: true,
            color: true,
            size: true
        }
    })

    // @ts-ignore
    const products = await db.product.findMany({
        where: {
            categoryId: product?.category.id
        },
        include:{
            category: true,
            images: true,
            color: true,
            size: true
        }
    })
    const formattedProducts: ProductColumn[] = products.map((item:any) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: item.price,
        category: item.category.name,
        size: item.size.name,
        color: item.color.name,
        images: item.images,
        createdAt: format(item.createdAt, "MMM dd, yyyy")
    }))
    return (
        <>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                <Gallery images={product?.images}/>
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <Info data={product}/>
                </div>
            </div>
        </div>
        <ProductList title="Related Products" items={formattedProducts}/>
        </>
    );
};

export default Page;
