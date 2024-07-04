import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export async function PATCH(req: Request, { params}: {params: {
    sizeId: string,
    storeId: string
}}) {
    try {
        const {userId} = auth();
        const body = await req.json();

        const { name, value } =  body;
        if(!userId){
            return new NextResponse('Unauthorized', { status: 401});
        }

        if(!name){
            return new NextResponse('Name is required', { status: 400})
        }
        if(!value){
            return new NextResponse('Image URL is required', { status: 400})
        }
        if(!params.sizeId){
            return new NextResponse('Size id is required', { status:400 })
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
        const size = await db.size.updateMany({
            where: {
                id: params.sizeId
            },
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })
        return NextResponse.json(size);
    } catch (err) {
        console.log('[SIZES_PATCH] Error');
        return new NextResponse('Internal error', { status: 500})
    }

}

export async function DELETE(req: Request, { params}: {params: {
    sizeId: string,
    storeId: string
}}) {
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse('Unauthorized', { status: 401});
        }

        if(!params.sizeId){
            return new NextResponse('Size id is required', { status:400 })
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
        const size = await db.size.deleteMany({
            where: {
                id: params.sizeId
            }
        })
        return NextResponse.json(size);
    } catch (err) {
        console.log('[SIZE_DELETE] Error');
        return new NextResponse('Internal error', { status: 500})
    }

}


export async function GET(req: Request, { params}: {params: {
        sizeId: string
    }}) {
    try {
        if(!params.sizeId){
            return new NextResponse('Size id is required', { status:400 })
        }
        // @ts-ignore
        const billboard = await db.size.findUnique({
            where: {
                id: params.sizeId
            }
        })
        return NextResponse.json(billboard);
    } catch (err) {
        console.log('[BILLBOARD_DELETE] Error');
        return new NextResponse('Internal error', { status: 500})
    }

}

