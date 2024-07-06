import React from "react";
import {db} from "@/lib/db";
import Billboard from "@/components/Billboard";
import Filter from "./components/Filter";
interface CategoryProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        colorId: string;
        sizeId: string;
    };
}

export default async function CategoryPage({params, searchParams}:CategoryProps) {
    // @ts-ignore
    const colors = await db.color.findMany({});
    // @ts-ignore
    const sizes = await db.size.findMany({});
    // @ts-ignore
    const category  = await db.category.findUnique({
        where: {
            id: params.categoryId
        }
    })
    // @ts-ignore
    const products = await db.product.findMany({
        where: {
            categoryId: params.categoryId,
            colorId: searchParams.colorId || undefined,
            sizeId: searchParams.colorId || undefined
        }
    })
    return (
        <div className="bg-white">
            <div className="container">
                <Billboard
                    data={category.billboard}
                />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="hidden lg:block">
                        <Filter
                            valueKey={"sizeId"}
                            name={"Sizes"}
                            data={sizes}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
