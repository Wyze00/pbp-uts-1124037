import type { BookStatus } from "./BookStatus.types";
import type { BookUpdatePayload } from "./BookUpdatePayload.types";

export interface Book extends BookUpdatePayload {
    createdAt: string;
    id: string;
    imageUrl: string;
    peminjam: null | string;
    status: BookStatus;
    updatedAt: string;
}

