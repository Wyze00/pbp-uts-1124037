import type { Book } from "@/types/Book.types";
import { NavLink } from "react-router";
import { ArrowBack, Edit, BookmarkAdd, BookmarkAdded, BookmarkRemove } from "@mui/icons-material";

type BookCardDetailProps = {
    book: Book;
    onBorrow: (pinjam: boolean) => void;
}

const infoItem = (label: string, value: string) => (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{label}</span>
        <span className="text-slate-700 font-medium">{value}</span>
    </div>
);

export default function BookCardDetail({ book, onBorrow }: BookCardDetailProps): React.JSX.Element {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <NavLink to="/book" className="text-orange-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    <ArrowBack fontSize="small" /> Kembali ke List
                </NavLink>
                <div className="flex gap-3 w-full md:w-auto">
                    <NavLink to={`/book/${book.id}/update`} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-orange-100 text-orange-600 px-6 py-3 rounded-2xl font-bold hover:bg-orange-200 transition-colors">
                        <Edit fontSize="small" /> Update
                    </NavLink>
                    {book.status === 'borrowed' ?
                        <button onClick={() => onBorrow(false)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-orange-100 text-orange-600 px-6 py-3 rounded-2xl font-bold hover:bg-orange-200 transition-colors">
                            <BookmarkRemove fontSize="small" /> Kembalikan
                        </button>
                        :
                        <button onClick={() => onBorrow(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-orange-100 text-orange-600 px-6 py-3 rounded-2xl font-bold hover:bg-orange-200 transition-colors">
                            <BookmarkAdd fontSize="small" /> Pinjam
                        </button>
                    }
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-4xl font-extrabold text-slate-800">{book.judul}</h1>
                    <p className="text-lg text-slate-500 leading-relaxed bg-orange-50/50 p-6 rounded-[2rem] border border-orange-100">
                        {book.deskripsi}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {infoItem("Kategori", book.kategori)}
                        {infoItem("Status", book.status)}
                        {infoItem("Tahun", book.tahun)}
                    </div>
                </div>
                <div className="bg-white border border-orange-100 p-8 rounded-[2.5rem] shadow-xl shadow-orange-100/30 h-fit">
                    <div>
                        <img src={book.imageUrl} alt={book.judul} />
                    </div>
                    <div className="space-y-4 text-xs text-slate-400 italic">
                        <p>Dibuat: {new Date(book.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                        <p>Diupdate: {new Date(book.updatedAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}