import type { BookCategory } from "./BookCategory.types";

export interface BookUpdatePayload {
    deskripsi: string;
    judul: string;
    kategori: BookCategory;
    tahun: string;
}