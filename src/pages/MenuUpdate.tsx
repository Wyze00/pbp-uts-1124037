import { NavLink, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import type { UpdateMenu } from "../types/UpdateMenu";
import { Save, ArrowBack } from "@mui/icons-material";

export default function MenuUpdate(): React.JSX.Element {
    const { id } = useParams();
    const [menu, setMenu] = useState<UpdateMenu | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const fetchDetail = useCallback(async () => {
        const response = await fetch(`http://localhost:5173/api/menu/${id}`);

        if (response.status === 200) {
            const data: UpdateMenu = await response.json();
            setMenu(data);
        }

        setIsLoading(false);
    }, [id]);

    const updateMenu = useCallback(async (menuData: UpdateMenu) => {
        const response = await fetch(`http://localhost:5173/api/update-menu/${id}`, {
            method: 'PUT',
            body: JSON.stringify(menuData),
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

    if(menu === null){
        return (
            <div className="text-center py-20">
                <p className="text-slate-500 mb-6">Menu tidak ditemukan.</p>
                <NavLink to='/menu' className="bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold">Kembali</NavLink>
            </div>
        )
    }

    const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all";

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <NavLink to={`/menu/${id}`} className="p-3 bg-slate-100 rounded-xl text-slate-500 hover:bg-orange-100 hover:text-orange-500 transition-colors">
                    <ArrowBack fontSize="small" />
                </NavLink>
                <h2 className="text-2xl font-bold text-slate-800">Update Menu</h2>
            </div>
            
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Nama Menu</label>
                    <input type="text" className={inputClass} onChange={(e) => setMenu({...menu, nama: e.target.value})} value={menu.nama} />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Deskripsi</label>
                    <textarea className={inputClass} rows={3} onChange={(e) => setMenu({...menu, deskripsi: e.target.value})} value={menu.deskripsi} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Harga (Rp)</label>
                        <input type="number" className={inputClass} onChange={(e) => setMenu({...menu, harga: Number(e.target.value)})} value={menu.harga} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Kategori</label>
                        <select value={menu.kategori} className={inputClass} onChange={(e) => setMenu({...menu, kategori: e.target.value as UpdateMenu['kategori']})}>
                            <option value="makanan">Makanan</option>
                            <option value="minuman">Minuman</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Label</label>
                        <select value={menu.label} className={inputClass} onChange={(e) => setMenu({...menu, label: e.target.value as UpdateMenu['label']})}>
                            <option value="vegan">Vegan</option>
                            <option value="gluten_free">Gluten Free</option>
                            <option value="halal">Halal</option>
                            <option value="low_cal">Low Calorie</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Ukuran</label>
                        <select value={menu.size} className={inputClass} onChange={(e) => setMenu({...menu, size: e.target.value as UpdateMenu['size']})}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                </div>
                <button type="button" onClick={() => updateMenu(menu)} className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all">
                    <Save fontSize="small" /> Perbarui Data Menu
                </button>
            </form>
        </div>
    );
}