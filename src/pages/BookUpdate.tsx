import { NavLink, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { Save, ArrowBack } from "@mui/icons-material";
import type { BookUpdatePayload } from "@/types/BookUpdatePayload.types";

export default function BookUpdate(): React.JSX.Element {
    const { id } = useParams();
    const [book, setBook] = useState<BookUpdatePayload | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const fetchDetail = useCallback(async () => {
        const response = await fetch(`http://localhost:5173/api/buku/${id}`);

        if (response.status === 200) {
            const { data }: { data: BookUpdatePayload } = await response.json();
            setBook(data);
        }

        setIsLoading(false);
    }, [id]);

    const updateBook = useCallback(async (bookData: BookUpdatePayload) => {
        const response = await fetch(`/api/buku/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                data: bookData
            }),
            headers: { 'content-type': 'application/json' }
        });

        if(response.status === 200){
            setIsSuccess(true);
            alert('Menu berhasil diupdate');
        }
    }, [id]);

    useEffect(() => {
        try { fetchDetail(); } catch (e) { console.log(e); }
    }, [fetchDetail, isSuccess]);

    if(isLoading) 
        return (
            <div className="text-center py-20 text-orange-400 font-bold">Loading...</div>
        );

    if(book === null){
        return (
            <div className="text-center py-20">
                <p className="text-slate-500 mb-6">Buku tidak ditemukan.</p>
                <NavLink to='/menu' className="bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold">Kembali</NavLink>
            </div>
        )
    }

    const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all";

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <NavLink to={`/book/${id}`} className="p-3 bg-slate-100 rounded-xl text-slate-500 hover:bg-orange-100 hover:text-orange-500 transition-colors">
                    <ArrowBack fontSize="small" />
                </NavLink>
                <h2 className="text-2xl font-bold text-slate-800">Update Buku</h2>
            </div>
            
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Judul Buku</label>
                    <input type="text" className={inputClass} onChange={(e) => setBook({...book, judul: e.target.value})} value={book.judul} />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Deskripsi</label>
                    <textarea className={inputClass} rows={3} onChange={(e) => setBook({...book, deskripsi: e.target.value})} value={book.deskripsi} />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Tahun</label>
                    <input type="number" className={inputClass} onChange={(e) => setBook({...book, tahun: String(e.target.value)})} placeholder={book.tahun} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Kategori</label>
                        <select value={book.kategori} className={inputClass} onChange={(e) => setBook({...book, kategori: e.target.value as BookUpdatePayload['kategori']})}>
                            <option value="majalah">Majalah</option>
                            <option value="novel">Novel</option>
                            <option value="komik">Komik</option>
                        </select>
                    </div>
                </div>
                <button type="button" onClick={() => updateBook(book)} className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all">
                    <Save fontSize="small" /> Perbarui Data Buku
                </button>
            </form>
        </div>
    );
}