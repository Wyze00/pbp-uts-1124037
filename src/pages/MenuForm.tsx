import { useCallback, useState } from "react";
import { NavLink } from "react-router";
import type { CreateMenu } from "../types/CreateMenu";
import { Save, ArrowBack } from "@mui/icons-material";

export default function MenuForm(): React.JSX.Element {
    const [menu, setMenu] = useState<CreateMenu>({
        nama: '', deskripsi: '', harga: 0, kategori: 'makanan', label: 'vegan', size: 'small',
    });
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const createMenu = useCallback(async (menuData: CreateMenu) => {
        const response = await fetch('http://localhost:5173/api/create-menu', {
            method: 'POST',
            body: JSON.stringify(menuData),
            headers: { 'content-type': 'application/json' }
        });
        if(response.status === 200) setIsSuccess(true);
    }, []);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if(menu.nama === '' || menu.deskripsi === '' || menu.harga === 0){
            alert('Nama | Deskripsi | Harga : tidak boleh kosong');
            return;
        }
        try { createMenu(menu); } catch (e) { console.log(e); }
    };

    if(isSuccess){
        return (
            <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Menu Berhasil Dibuat!</h2>
                <NavLink to="/menu" className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-orange-200">
                    Lihat Daftar Menu
                </NavLink>
            </div>
        );
    }

    const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all";

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">Tambah Menu Baru</h2>
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Nama Menu</label>
                    <input type="text" className={inputClass} onChange={(e) => setMenu({...menu, nama: e.target.value})} value={menu.nama} placeholder="Contoh: Nasi Goreng Spesial" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Deskripsi</label>
                    <textarea className={inputClass} rows={3} onChange={(e) => setMenu({...menu, deskripsi: e.target.value})} value={menu.deskripsi} placeholder="Ceritakan tentang menu ini..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Harga (Rp)</label>
                        <input type="number" className={inputClass} onChange={(e) => setMenu({...menu, harga: Number(e.target.value)})} placeholder="0" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Kategori</label>
                        <select className={inputClass} onChange={(e) => setMenu({...menu, kategori: e.target.value as CreateMenu['kategori']})}>
                            <option value="makanan">Makanan</option>
                            <option value="minuman">Minuman</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Label</label>
                        <select className={inputClass} onChange={(e) => setMenu({...menu, label: e.target.value as CreateMenu['label']})}>
                            <option value="vegan">Vegan</option>
                            <option value="gluten_free">Gluten Free</option>
                            <option value="halal">Halal</option>
                            <option value="low_cal">Low Calorie</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">Ukuran (Size)</label>
                        <select className={inputClass} onChange={(e) => setMenu({...menu, size: e.target.value as CreateMenu['size']})}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                </div>
                <div className="pt-4 flex gap-4">
                    <button type="button" onClick={handleClick} className="flex-1 bg-orange-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors">
                        <Save fontSize="small" /> Simpan Menu
                    </button>
                    <NavLink to="/menu" className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors">
                        Batal
                    </NavLink>
                </div>
            </form>
        </div>
    );
}