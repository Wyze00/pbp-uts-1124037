import { useEffect, useState } from "react";
import { NavLink } from "react-router";

export type Menu = {
    createdAt: string;
    deskripsi: string;
    harga: number;
    id: string;
    kategori: 'makanan' | 'minuman';
    label: 'vegan' | 'glutten-free' | 'halal' | 'low calorie';
    size: 'small' | 'large' | 'medium';
    nama: string;
    updatedAt: string;
}

export default function MenuList(): React.JSX.Element {
    const [menuList, setMenuList] = useState<Menu[]>([]);

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch('http://localhost:5173/api/list-menu');
            
            if(response.status === 200){
                const data: Menu[] = await response.json();
                console.log(data);
                setMenuList(data);
            }
        };

        fetchMenu();
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
                        <NavLink to={`/menu/${menu.id}`}><button>Detail</button></NavLink>
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