import { Home, ListAlt, AddCircleOutline } from "@mui/icons-material";
import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";

export default function Layout(props: PropsWithChildren): React.JSX.Element {
    return (
        <div className="min-h-screen overflow-y-scroll bg-[#FFF8F1] font-sans text-slate-700">
            {/* Navbar Modern */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo/Brand */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
                            <span className="text-white font-bold text-xl">M</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                            MenuApps
                        </span>
                    </div>

                    {/* Navigasi */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <NavLink 
                            to="/" 
                            end
                            className={({ isActive }) => `
                                flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium
                                ${isActive 
                                    ? "bg-orange-100 text-orange-600 shadow-sm" 
                                    : "text-slate-500 hover:bg-orange-50 hover:text-orange-400"}
                            `}
                        >
                            <Home fontSize="small" />
                            <span className="hidden sm:inline">Home</span>
                        </NavLink>

                        <NavLink 
                            to="/menu" 
                            className={({ isActive }) => `
                                flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium
                                ${isActive 
                                    ? "bg-orange-100 text-orange-600 shadow-sm" 
                                    : "text-slate-500 hover:bg-orange-50 hover:text-orange-400"}
                            `}
                        >
                            <ListAlt fontSize="small" />
                            <span className="hidden sm:inline">Menu List</span>
                        </NavLink>

                        <NavLink 
                            to="/menu/create" 
                            className={({ isActive }) => `
                                flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium
                                ${isActive 
                                    ? "bg-orange-100 text-orange-600 shadow-sm" 
                                    : "text-slate-500 hover:bg-orange-50 hover:text-orange-400"}
                            `}
                        >
                            <AddCircleOutline fontSize="small" />
                            <span className="hidden sm:inline">Create Menu</span>
                        </NavLink>
                    </div>
                </div>
            </nav>

            {/* Container Konten Utama */}
            <main className="max-w-7xl mx-auto p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-orange-100/50 min-h-[70vh] border border-orange-50/50">
                    {props.children}
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="text-center py-8 text-slate-400 text-sm">
                &copy; 2026 MenuApps. Dibuat dengan tema Pastel Oranye Modern.
            </footer>
        </div>
    );
}