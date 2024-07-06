
import {Modal} from "@/components/ui/modal";import {useStoreModal} from "@/hooks/use-store-modal";
import React from "react";
import {db} from "@/lib/db";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import ProductList from "@/components/ProductList";
import {ProductColumn} from "@/app/(dashboard)/[storeId]/(routes)/products/components/columns";
import {format} from "date-fns";

export default async function SetupPage() {
    // @ts-ignore
    const products = await db.product.findMany({
        where: {
            isFeatured: true
        },
        include:{
            images: true,
            category: true,
            size: true,
            color: true
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
    //const onOpen = useStoreModal(state => state.onOpen);
    //const isOpen = useStoreModal(state => state.isOpen);
    /**useEffect(()=> {
            if(!isOpen){
                onOpen();
            }
{}    },[isOpen, onOpen])**/
    // @ts-ignore

    return (
      <div className="container">
          <Billboard/>
          <ProductList title="Featured Products" items={formattedProducts}/>
      </div>
  );
}
