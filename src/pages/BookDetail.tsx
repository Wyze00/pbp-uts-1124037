import { useCallback, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { ArrowBack } from "@mui/icons-material";
import type { Book } from "@/types/Book.types";
import BookCardDetail from "@/components/BookCardDetail";

export default function bookDetail(): React.JSX.Element {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isBorrowedSuccess, setIsBorrowedSuccess] = useState<boolean>(false);

    const fetchDetail = useCallback(async () => {
        const response = await fetch(`/api/buku/${id}`);
        if(response.status === 200){
            const { data } : { data: Book } = await response.json();
            setBook(data);

            if (data.status === 'borrowed') {
                setIsBorrowedSuccess(true);
            }
        }
        setIsLoading(false);
    }, [id, isBorrowedSuccess]);
    
    const borrowBook = (pinjam: boolean) => {
         const borrow = async ()  => {
            const nama: string | null = prompt('Masukan Nama');

            if (nama === null)
                return;

             const response = await fetch(`/api/buku/${id}/pinjam`, {
                method: 'POST',
                body: JSON.stringify({
                    peminjam: {
                        nama:  nama,
                    }
                }),
                headers: { 'content-type': 'application/json' }
             });
         
            if(response.status === 200){
                alert('Success meminjam buku');
                setIsBorrowedSuccess(true);
            }
            setIsLoading(false);
        };

        const returnBook = async ()  => {
             const response = await fetch(`/api/buku/${id}/balik`, {
                method: 'POST',
             });
         
            if(response.status === 200){
                alert('Success mengembalikan buku');
                setIsBorrowedSuccess(false);
            }
            setIsLoading(false);
        };

        if (pinjam) {
            borrow();
        } else {
            returnBook();
        }
    } 

    useEffect(() => {
        try { fetchDetail(); } catch(e){ console.log(e); }
    }, [fetchDetail, isBorrowedSuccess]);

    if(isLoading) 
        return (
            <div className="text-center py-20 animate-pulse text-orange-400 font-bold">Memuat Detail...</div>
        );
    
    if(book === null){
        return (
            <div className="text-center py-20">
                <p className="text-slate-500 mb-6">{`book dengan ID ${id} tidak ditemukan.`}</p>
                <NavLink to='/book' className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold">
                    <ArrowBack fontSize="small" /> Kembali ke Daftar
                </NavLink>
            </div>
        )
    }

    return (
        <BookCardDetail book={book} onBorrow={borrowBook} />
    );
}