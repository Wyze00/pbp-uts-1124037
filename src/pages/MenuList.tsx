import { useCallback, useEffect } from "react";
import type { Menu } from "../types/Menu";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { menuSliceActions } from "../redux/menuSlice";
import MenuCard from "../components/MenuCard";

export default function MenuList(): React.JSX.Element {
    const menuList = useAppSelector(({menu}) => menu);
    const dispatch = useAppDispatch();

    const fetchMenu = useCallback(async () => {
        const response = await fetch('http://localhost:5173/api/list-menu');
        if(response.status === 200){
            const data: Menu[] = await response.json();
            dispatch(menuSliceActions.setState(data));
        }
    }, [dispatch]);

    useEffect(() => {
        try { fetchMenu(); } catch (e) { console.log(e); }
    }, [fetchMenu]);
    
    if(menuList.length === 0) {
        return (
            <div className="flex flex-col items-center py-20">
                <p className="text-slate-400 italic">Belum ada data menu tersedia...</p>
            </div>
        );
    } 

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuList.map((menu: Menu) => (
                <MenuCard menu={menu}></MenuCard>
            ))}
        </div>
    );
}