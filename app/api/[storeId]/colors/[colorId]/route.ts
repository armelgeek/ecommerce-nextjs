import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export async function PATCH(req: Request, { params}: {params: {
    colorId: string,
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
        if(!params.colorId){
            return new NextResponse('Color id is required', { status:400 })
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
        const color = await db.color.updateMany({
            where: {
                id: params.colorId
            },
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })
        return NextResponse.json(color);
    } catch (err) {
        console.log('[COLORS_PATCH] Error');
        return new NextResponse('Internal error', { status: 500})
    }

}

export async function DELETE(req: Request, { params}: {params: {
    colorId: string,
    storeId: string
}}) {
    try {
        const {userId} = auth();
        if(!userId){
            return new NextResponse('Unauthorized', { status: 401});
        }

        if(!params.colorId){
            return new NextResponse('Color id is required', { status:400 })
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
        const color = await db.color.deleteMany({
            where: {
                id: params.colorId
            }
        })
        return NextResponse.json(color);
    } catch (err) {
        console.log('[COLOR_DELETE] Error');
        return new NextResponse('Internal error', { status: 500})
    }

}


export async function GET(req: Request, { params}: {params: {
        colorId: string
    }}) {
    try {
        if(!params.colorId){
            return new NextResponse('Color id is required', { status:400 })
        }
        // @ts-ignore
        const color = await db.color.findUnique({
            where: {
                id: params.colorId
            }
        })
        return NextResponse.json(color);
    } catch (err) {
        console.log('[COLOR_DELETE] Error');
        return new NextResponse('Internal error', { status: 500})
    }

}

