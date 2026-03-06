import { useCallback, useEffect, useState } from "react";
import type { Book } from "../types/Book.types";
import BookCard from "@/components/BookCard";
import { Marquee } from "@/components/ui/marquee";
import { BlurFade } from "@/components/ui/blur-fade";

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
        <>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-[100px]">
                {bookList.map((book: Book, idx: number) => (
                    <BlurFade delay={0.1 * idx}>
                        <BookCard book={book} key={book.id} />
                    </BlurFade>
                ))}
            </div>

            <div className="flex w-full flex-col items-center justify-center overflow-hidden my-20 ">
                <Marquee pauseOnHover className="[--duration:60s]">
                    {bookList.map((book: Book) => (
                    <BookCard book={book} />
                ))}
                </Marquee>
                <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
                <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
            </div>
        </>
    );
}