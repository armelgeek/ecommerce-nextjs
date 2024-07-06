'use client';
import React from 'react';
import NoResults from "@/components/NoResults";
import ProductCard from "@/components/ui/product-card";

const ProductList = ({title,items}:any) => {
    return (
        <div className="px-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
               <h3 className="font-bold text-3xl">{title}</h3>
            <div className="grid grid-col-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4">
                {items.map((item:any) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
            {items.length === 0 && <NoResults/>}
        </div>
    );
};

export default ProductList;
