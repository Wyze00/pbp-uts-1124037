import type { CreateMenu } from "./CreateMenu";

export type Menu = CreateMenu & { id: string, createdAt: string; updatedAt: string };