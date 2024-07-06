
import {Modal} from "@/components/ui/modal";import {useStoreModal} from "@/hooks/use-store-modal";
import React from "react";
import {db} from "@/lib/db";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import ProductList from "@/components/ProductList";

export default async function SetupPage() {
    // @ts-ignore
    const products = await db.product.findMany({
        where: {
            isFeatured: true
        },
        include:{
            images: true,
            category: true
        }
    })
    //const onOpen = useStoreModal(state => state.onOpen);
    //const isOpen = useStoreModal(state => state.isOpen);
    /**useEffect(()=> {
            if(!isOpen){
                onOpen();
            }
{}    },[isOpen, onOpen])**/
    // @ts-ignore

    return (
    <>
      <Navbar/>
      <div className="container">
          <Billboard/>
          <ProductList title="Featured Products" items={products}/>
      </div>
    </>
  );
}
