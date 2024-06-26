import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export async function PATCH(req: Request, { params}: {params: {
    billboardId: string,
    storeId: string
}}) {
    try {
        const {userId} = auth();
        const body = await req.json();

        const { label,imageUrl } =  body;
        if(!userId){
            return new NextResponse('Unauthorized', { status: 401});
        }

        if(!label){
            return new NextResponse('Label is required', { status: 400})
        }
        if(!imageUrl){
            return new NextResponse('Image URL is required', { status: 400})
        }
        if(!params.billboardId){
            return new NextResponse('Billboard id is required', { status:400 })
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
        const billboard = await db.billboard.updateMany({
            where: {
                id: params.billboardId
            },
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })
        return NextResponse.json(billboard);
    } catch (err) {
        console.log('[STORE_PATCH] Error');
        return new NextResponse('Internal error', { status: 500})
    }

}

export async function DELETE(req: Request, { params}: {params: {
    billboardId: string,
    storeId: string
}}) {
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse('Unauthorized', { status: 401});
        }

        if(!params.billboardId){
            return new NextResponse('Billboard id is required', { status:400 })
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
        const billboard = await db.billboard.deleteMany({
            where: {
                id: params.billboardId
            }
        })
        return NextResponse.json(billboard);
    } catch (err) {
        console.log('[STORE_DELETE] Error');
        return new NextResponse('Internal error', { status: 500})
    }

}


export async function GET(req: Request, { params}: {params: {
        billboardId: string
    }}) {
    try {
        if(!params.billboardId){
            return new NextResponse('Billboard id is required', { status:400 })
        }
        // @ts-ignore
        const billboard = await db.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        })
        return NextResponse.json(billboard);
    } catch (err) {
        console.log('[STORE_DELETE] Error');
        return new NextResponse('Internal error', { status: 500})
    }

}

