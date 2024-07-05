import React from 'react';
import {db} from "@/lib/db";
import ProductForm from "./components/product-form";

const ProductPage = async ({
    params
}: {
    params: {
        productId: string,
        storeId: string
    }
}) => {
    // @ts-ignore
    const product = await db.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    })
// @ts-ignore
    const categories = await db.category.findMany({
        where: {
            storeId: params.storeId
        }
    })
    // @ts-ignore
    const sizes = await db.size.findMany({
        where: {
            storeId: params.storeId
        }
    })
    // @ts-ignore
    const colors = await db.color.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
               <ProductForm
                   colors={colors}
                   categories={categories}
                   sizes={sizes}
                   initialData={product}
               />
            </div>
        </div>
    );
};

export default ProductPage;
