import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

type MembershipTier = "A" | "B" | "C";

type MembershipPayload = {
  tier?: MembershipTier;
};

const allowedTiers: MembershipTier[] = ["A", "B", "C"];

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as MembershipPayload;
  const tier = body?.tier;

  if (!tier || !allowedTiers.includes(tier)) {
    return NextResponse.json({ error: "Invalid membership tier" }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: { membershipTier: tier },
    select: { id: true, membershipTier: true },
  });

  return NextResponse.json({ membership: updated });
}
