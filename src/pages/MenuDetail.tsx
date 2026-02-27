import { useCallback, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import type { Menu } from "../types/Menu";
import { ArrowBack, Edit, Delete } from "@mui/icons-material";

export default function MenuDetail(): React.JSX.Element {
    const { id } = useParams();
    const [menu, setMenu] = useState<Menu | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);

    const fetchDetail = useCallback(async () => {
        const response = await fetch(`http://localhost:5173/api/menu/${id}`);
        if(response.status === 200){
            const data: Menu = await response.json();
            setMenu(data);
        }
        setIsLoading(false);
    }, [id]);

    const deleteMenu = useCallback(async () => {
        const response = await fetch(`http://localhost:5173/api/delete-menu/${id}`, { method: 'DELETE' })
        if(response.status === 200) setIsDeleteSuccess(true);
    }, [id]);

    useEffect(() => {
        try { fetchDetail(); } catch(e){ console.log(e); }
    }, [fetchDetail]);

    if(isLoading) 
        return (
            <div className="text-center py-20 animate-pulse text-orange-400 font-bold">Memuat Detail...</div>
        );
    
    if(menu === null || isDeleteSuccess){
        return (
            <div className="text-center py-20">
                <p className="text-slate-500 mb-6">{isDeleteSuccess ? 'Menu berhasil dihapus.' : `Menu dengan ID ${id} tidak ditemukan.`}</p>
                <NavLink to='/menu' className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold">
                    <ArrowBack fontSize="small" /> Kembali ke Daftar
                </NavLink>
            </div>
        )
    }

    const infoItem = (label: string, value: string) => (
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{label}</span>
            <span className="text-slate-700 font-medium">{value}</span>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <NavLink to="/menu" className="text-orange-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    <ArrowBack fontSize="small" /> Kembali ke List
                </NavLink>
                <div className="flex gap-3 w-full md:w-auto">
                    <NavLink to={`/menu/${menu.id}/update`} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-orange-100 text-orange-600 px-6 py-3 rounded-2xl font-bold hover:bg-orange-200 transition-colors">
                        <Edit fontSize="small" /> Update
                    </NavLink>
                    <button onClick={() => confirm('Yakin hapus?') && deleteMenu()} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold hover:bg-red-100 transition-colors">
                        <Delete fontSize="small" /> Hapus
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-4xl font-extrabold text-slate-800">{menu.nama}</h1>
                    <p className="text-lg text-slate-500 leading-relaxed bg-orange-50/50 p-6 rounded-[2rem] border border-orange-100">
                        {menu.deskripsi}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {infoItem("Kategori", menu.kategori)}
                        {infoItem("Label", menu.label)}
                        {infoItem("Ukuran", menu.size)}
                    </div>
                </div>
                <div className="bg-white border border-orange-100 p-8 rounded-[2.5rem] shadow-xl shadow-orange-100/30 h-fit">
                    <p className="text-slate-400 text-sm font-bold mb-2 uppercase">Harga Sekarang</p>
                    <p className="text-4xl font-black text-orange-500 mb-6">Rp {menu.harga.toLocaleString()}</p>
                    <div className="space-y-4 text-xs text-slate-400 italic">
                        <p>Dibuat: {new Date(menu.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                        <p>Diupdate: {new Date(menu.updatedAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}