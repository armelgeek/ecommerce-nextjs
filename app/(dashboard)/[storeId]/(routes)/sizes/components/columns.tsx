"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "./cell-action";

export type SizeColumn = {
    id: string
    name: string
    value: string
    createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
    {
        accessorKey: "name",
        header: "name",
    },
    {
        accessorKey: "value",
        header: "Value",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        accessorKey: "actions",
        cell: ({ row }) => <CellAction data={row.original}/>,
    }
]
