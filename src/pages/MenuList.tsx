import { Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import { NavLink } from "react-router";
import type { Menu } from "../types/Menu";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { menuSliceActions } from "../redux/menuSlice";

export default function MenuList(): React.JSX.Element {
    const menuList = useAppSelector(({menu}) => menu);
    const dispatch = useAppDispatch();

    const fetchMenu = useCallback(async () => {
        const response = await fetch('http://localhost:5173/api/list-menu');
                
        if(response.status === 200){
            const data: Menu[] = await response.json();
            dispatch(menuSliceActions.setState(data));
        }
    }, []);

    useEffect(() => {
        try {
            fetchMenu();
        } catch (e) {
            console.log(e);
        }
    }, []);
    
    if(menuList.length === 0) {
        return (
            <>
                Tidak ada data
            </>
        );
    } 

    return (
        <div>
            {menuList.map((menu: Menu) => {
                return (
                    <div key={menu.id} style={{border: '1px solid black'}}>
                        <NavLink to={`/menu/${menu.id}`}><Button variant="outlined">Detail</Button></NavLink>
                        <p>Id : {menu.id}</p>
                        <p>Nama : {menu.nama}</p>
                        <p>Kategori : {menu.kategori}</p>
                        <p>Label : {menu.label}</p>
                        <p>Deskripsi : {menu.deskripsi}</p>
                        <p>Size : {menu.size}</p>
                        <p>Harga : {menu.harga}</p>
                        <p>CreatedAt : {menu.createdAt}</p>
                        <p>UpdatedAt : {menu.updatedAt}</p>
                    </div>
                );
            })}
        </div>
    );
}