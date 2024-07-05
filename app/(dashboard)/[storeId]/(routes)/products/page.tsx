import { format } from 'date-fns';
import React from 'react';
import { ProductClient } from "./components/client";
import {db} from "@/lib/db";
import {ProductColumn} from "./components/columns";
import {formatter} from "@/lib/utils";
import {Product} from "@prisma/client";

const ProductsPage = async ({
    params }:{
    params: {storeId: string}
}) => {
    // @ts-ignore
    const products = await db.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedProducts: ProductColumn[] = products.map((product:any) => ({
        id: product.id,
        name: product.name,
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
        price: formatter.format(product.price.toNumber()),
        category: product.category.name,
        size: product.size.name,
        color: product.color.name,
        createdAt: format(product.createdAt, "MMM dd, yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient
                    data={formattedProducts}/>
            </div>
        </div>
    );
};

export default ProductsPage;
