import { useCallback, useEffect, useState } from "react";
import type { Book } from "../types/Book.types";
import BookCard from "@/components/BookCard";

export default function BookList(): React.JSX.Element {
    const [bookList, setBookList] = useState<Book[]>([]);

    const fetchMenu = useCallback(async () => {
        const response = await fetch('/api/buku/');

        if(response.status === 200){
            const { data }: {data: Book[]} = await response.json()
            setBookList(data);
        }
    }, []);

    useEffect(() => {
        try { fetchMenu(); } catch (e) { console.log(e); }
    }, []);
    
    if(bookList.length === 0) {
        return (
            <div className="flex flex-col items-center py-20">
                <p className="text-slate-400 italic">Belum ada data buku tersedia...</p>
            </div>
        );
    } 

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookList.map((book: Book) => (
                <BookCard book={book} />
            ))}
        </div>
    );
}