"use client";
import React, {useState} from 'react';
import {Store} from "@prisma/client";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {SeparatorHorizontal, Trash} from "lucide-react";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {AlertModal} from "@/components/modals/alert-modal";
interface SettingsFormProps {
    initialData: Store
}
const formSchema = z.object({
    name: z.string().min(1)
});
type SettingsFormPropsValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> =({
    initialData
})=> {
    const params = useParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useForm<SettingsFormPropsValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })
    const onSubmit = async (data: SettingsFormPropsValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`,data);
            toast.success('Store updated successfully');
            router.refresh();
        }catch (err) {
            toast.error('Something went wrong');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try{
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh();
            router.push('/');
            toast.success('Store deleted successfully');
        }catch (err) {
            toast.error('Something went wrong');
            setLoading(false);
        }finally {

        }
    }
    return (
        <>
            <AlertModal
                isOpen={isOpen}
                onClose={()=> setIsOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage your store settings"
                />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() =>  setIsOpen(true)}
                >
                    <Trash className="h-4 w-4"/>
                </Button>
            </div>
            <Separator/>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                           control={form.control}
                            name="name"
                            render={({ field }) =>(
                                <FormItem>
                                    <FormLabel>Name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder={"Store name"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className={"mt-3"} type={"submit"}>
                        Save changes
                    </Button>
                </form>
            </Form>
        </>
    );
}

export default SettingsForm;
