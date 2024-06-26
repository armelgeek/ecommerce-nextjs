import { format } from 'date-fns';
import React from 'react';
import {CategoryClient} from "./components/client";
import {db} from "@/lib/db";
import {CategoryColumn} from "./components/columns";
import {Category} from "@prisma/client";

const CategoriesPage = async ({
    params }:{
    params: {storeId: string}
}) => {
    // @ts-ignore
    const categories = await db.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    const formattedCategories: CategoryColumn[] = categories.map((category:Category) => ({
        id: category.id,
        name: category.name,
        billboardLabel: category.billboard.label,
        createdAt: format(category.createdAt, "MMM dd, yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient   data={formattedCategories}/>
            </div>
        </div>
    );
};

export default CategoriesPage;
