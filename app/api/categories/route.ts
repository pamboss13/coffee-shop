import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
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
    console.error("Name is required");
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    );
  }
  
  const trimmedName = name.trim();
  const trimmedDescription = description.trim();
  
  try {
    const category = await prisma.category.create({
      data: {
        name: trimmedName,
        description: trimmedDescription,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Failed to create category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
