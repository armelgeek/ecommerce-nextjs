import { format } from 'date-fns';
import React from 'react';
import {OrderClient} from "./components/client";
import {db} from "@/lib/db";
import {OrderColumn} from "./components/columns";
import {formatter} from "@/lib/utils";

const OrdersPage = async ({
    params }:{
    params: {storeId: string}
}) => {
    // @ts-ignore
    const orders = await db.order.findMany({
        where: {
            storeId: params.storeId
        },
        include:{
          orderItems: {
              include: {
                  product: true
              }
          }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    const formattedOrders: OrderColumn[] = orders.map((order:any) => ({
        id: order.id,
        phone: order.phone,
        address: order.address,
        products: order.orderItems.map((orderItem:any) => orderItem.product.name.join(', ')),
        totalPrice: formatter.format(order.orderItems.reduce((total:number, item:any) => {
            return total + Number(item.product.price);
        } )),
        isPaid: order.isPaid,
        createdAt: format(order.createdAt, "MMM dd, yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient   data={formattedOrders}/>
            </div>
        </div>
    );
};

export default OrdersPage;
