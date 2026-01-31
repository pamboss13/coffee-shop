import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = { params: Promise<{ id: string }> };
// GET /api/categories/[id] - Get a single category

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    if(!id){
        console.error("No ID parameter provided");
        return NextResponse.json(
            { error: "ID parameter is required" },
            { status: 400 }
        );
    }
    try{
        const category = await prisma.category.findUnique({
            where: { id },
        });
        return NextResponse.json(category);
    } catch(error){
        console.error("Failed to fetch category:", error);
        return NextResponse.json(
            { error: "Failed to fetch category" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    if(!id){
        console.error("No ID parameter provided");
        return NextResponse.json(
            { error: "ID parameter is required" },
            { status: 400 }
        );
    }
    const body = await request.json();
    if(!body){
        console.error("No request body found!!!");
        return NextResponse.json(
            { error: "Request body is required" },
            { status: 400 }
        );
    }
    const { name, description } = body;
    if(!name || !description){
        console.error("Name and Description are required");
        return NextResponse.json(
            { error: "Name and Description are required" },
            { status: 400 }
        );
    }
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    try{
        const category = await prisma.category.update({
            where: { id },
            data: {
                name: trimmedName,
                description: trimmedDescription,
            },
        });
        return NextResponse.json(category);
    } catch(error){
        console.error("Failed to update category:", error);
        return NextResponse.json(
            { error: "Failed to update category" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  if(!id){
    console.error("No ID parameter provided");
    return NextResponse.json(
      { error: "ID parameter is required" },
      { status: 400 }
    );
  }
  try {
    await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Failed to delete category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
