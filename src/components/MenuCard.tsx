import { NavLink } from "react-router";
import type { Menu } from "../types/Menu";
import { Visibility } from "@mui/icons-material";

type MenuCardProps = {
    menu: Menu
}

export default function MenuCard({menu}: MenuCardProps): React.JSX.Element | null {
    return (
        <div key={menu.id} className="group bg-white border border-orange-100 p-6 rounded-3xl hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {menu.kategori}
                </span>
                <span className="text-orange-500 font-bold">Rp {menu.harga.toLocaleString()}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{menu.nama}</h3>
            <p className="text-slate-500 text-sm line-clamp-2 mb-6">{menu.deskripsi}</p>
            
            <NavLink to={`/menu/${menu.id}`} className="inline-flex items-center justify-center w-full gap-2 bg-orange-50 text-orange-600 font-bold py-3 rounded-2xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <Visibility fontSize="small" />
                Detail Menu
            </NavLink>
        </div>
    );
}