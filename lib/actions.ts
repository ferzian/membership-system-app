"use server";

import { headers } from "next/headers";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import type { Prisma } from "@/src/generated/prisma/client";

export type MembershipTier = Prisma.MembershipTier;

type MembershipSummary = {
	tier: MembershipTier;
	label: string;
	summary: string;
	limit: number | "all";
};

const allowedMembershipTiers: MembershipTier[] = ["A", "B", "C"];

const tierLimits: Record<MembershipTier, number | "all"> = {
	A: 1,
	B: 3,
	C: "all",
};

const tierSummaries: Record<MembershipTier, Omit<MembershipSummary, "tier" | "limit">> = {
	A: {
		label: "Membership A",
		summary: "Starter access untuk memulai komunitas kecil.",
	},
	B: {
		label: "Membership B",
		summary: "Akses menengah untuk konten mingguan.",
	},
	C: {
		label: "Membership C",
		summary: "Akses penuh untuk semua konten premium.",
	},
};

export function getMembershipSummary(tier: MembershipTier): MembershipSummary {
	return {
		tier,
		limit: tierLimits[tier],
		...tierSummaries[tier],
	};
}

export function listMembershipSummaries(): MembershipSummary[] {
	return allowedMembershipTiers.map((tier) => getMembershipSummary(tier));
}

export function normalizeMembershipTier(
	tier: string | MembershipTier | null | undefined,
): MembershipTier | null {
	if (!tier) return null;
	const normalized = tier.toString().trim().toUpperCase();
	return allowedMembershipTiers.includes(normalized as MembershipTier)
		? (normalized as MembershipTier)
		: null;
}

export async function getServerSession() {
	return auth.api.getSession({
		headers: headers(),
	});
}

export async function requireUser() {
	const session = await getServerSession();
	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}
	return session.user;
}

export async function getCurrentUser() {
	const user = await requireUser();
	return prisma.user.findUnique({
		where: { id: user.id },
	});
}

export async function getCurrentMembershipTier(): Promise<MembershipTier> {
	const user = await requireUser();
	if (user.membershipTier) return user.membershipTier as MembershipTier;

	const record = await prisma.user.findUnique({
		where: { id: user.id },
		select: { membershipTier: true },
	});

	return record?.membershipTier ?? "A";
}

export async function setMembershipTier(
	tier: string | MembershipTier,
): Promise<{ id: string; membershipTier: MembershipTier }> {
	const user = await requireUser();
	const normalized = normalizeMembershipTier(tier);
	if (!normalized) {
		throw new Error("Invalid membership tier");
	}

	return prisma.user.update({
		where: { id: user.id },
		data: { membershipTier: normalized },
		select: { id: true, membershipTier: true },
	});
}

export async function updateProfileName(name: string) {
	const user = await requireUser();
	const trimmed = name.trim();
	if (!trimmed) {
		throw new Error("Name is required");
	}

	return prisma.user.update({
		where: { id: user.id },
		data: { name: trimmed },
		select: { id: true, name: true },
	});
}
