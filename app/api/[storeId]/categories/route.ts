import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
export async function POST(req: Request, {
    params
}: {
    params: {
        storeId: string
    }
}) {
    try {
        const  { userId } = auth();
        const body = await req.json();
        const { name , billboardId } = body;
        if(!userId) {
            return new NextResponse('Unauthorized', {status: 401 })
        }
        if(!name){
            return new NextResponse('Name is required', {status: 400})
        }
        if(!billboardId){
            return new NextResponse('billboardId is required', {status: 400})
        }
        if(!params.storeId){
            return new NextResponse('Store ID is required', {status: 400})
        }
        // @ts-ignore
        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if(!storeByUserId){
            return new NextResponse('Unauthorized', {status: 403})
        }
        // @ts-ignore
        const category = await db.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        })
        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORIES_POST',error);
        return new NextResponse('Internal error', {status: 500})
    }
}



export async function GET(req: Request, {
    params
}: {
    params: {
        storeId: string
    }
}) {
    try {
        if(!params.storeId){
            return new NextResponse('Store ID is required', {status: 400})
        }
        // @ts-ignore
        const categories = await db.category.findMany({
            where: {
                storeId: params.storeId
            }
        })
        return NextResponse.json(categories);
    } catch (error) {
        console.log('[BILLBOARDS_GET',error);
        return new NextResponse('Internal error', {status: 500})
    }
}
