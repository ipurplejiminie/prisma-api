import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const id: number = parseInt(params.id);
  const users = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  return NextResponse.json(users);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const id: number = parseInt(params.id);
  const users = await prisma.user.delete({
    where: {
      id,
    },
  });
  return NextResponse.json(users);
};
