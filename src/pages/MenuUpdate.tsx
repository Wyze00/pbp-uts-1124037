import { NavLink, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import type { UpdateMenu } from "../types/UpdateMenu";

export default function MenuUpdate(): React.JSX.Element {
    const { id } = useParams();
    const [menu, setMenu] = useState<UpdateMenu | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const fetchDetail = useCallback(async () => {
        const response = await fetch(`http://localhost:5173/api/menu/${id}`);

        if(response.status === 200){
            const data: UpdateMenu = await response.json();
            setMenu(data);
        }

        setIsLoading(false);
    }, [id]);

    const updateMenu = useCallback(async (menuData: UpdateMenu) => {
        const response = await fetch(`http://localhost:5173/api/update-menu/${id}`, {
            method: 'PUT',
            body: JSON.stringify(menuData),
            headers: {
                'content-type': 'application/json',
            }
        });

        if(response.status === 200){
            setIsSuccess(true);
            alert('Menu berhasil diupdate');
        }
    }, [id]);

    useEffect(() => {
        try {
            fetchDetail();
        } catch (e) {
            console.log(e);
        }
    }, [id, isSuccess]);

    if(isLoading){
        return (
            <>
                Loading
            </>
        );
    }

    if(menu === null){
        return (
            <>
                No Menu With ID : ${id}
                <br />
                <NavLink to='/menu'><Button variant="outlined">Back To Menu</Button></NavLink>
            </>
        )
    }

    const handleUpdate: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();

        if(menu.nama === '' || menu.deskripsi === '' || menu.harga === 0){
            alert('Nama | Deskripsi | Harga : tidak boleh kososng');
            return;
        }

        try {
            updateMenu(menu);
        } catch (e) {
            console.log(e);
        }
    };

    return (

        <div key={id} style={{border: '1px solid black'}}>
            <NavLink to={`/menu`}><Button variant="outlined">Back To MenuList</Button></NavLink>
            <NavLink to={`/menu/${id}`}><Button variant="outlined">Back To Menu Detail</Button></NavLink>
            <p>Id : {id}</p>
            <br />
            Nama
            <input type="text" onChange={(e) => setMenu({...menu, nama: e.target.value})} value={menu.nama} />
            <br />
            <br />
            Deskripsi
            <input type="text" onChange={(e) => setMenu({...menu, deskripsi: e.target.value})} value={menu.deskripsi} />
            <br />
            Harga
            <input type="number" onChange={(e) => setMenu({...menu, harga: Number(e.target.value)})} placeholder={menu.harga.toString()}/>
            <br />
            <select value={menu.kategori} name="kategori" id="kategori" onChange={(e) => setMenu({...menu, kategori: e.target.value as UpdateMenu['kategori']})}>
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
            </select>
            <br />
            <select value={menu.label} name="label" id="label" onChange={(e) => setMenu({...menu, label: e.target.value as UpdateMenu['label']})}>
                <option value="vegan">Vegan</option>
                <option value="gluten_free">Gluten Free</option>
                <option value="halal">Halal</option>
                <option value="low_cal">Low Calorie</option>
            </select>
            <br />
            <select value={menu.size} name="size" id="size" onChange={(e) => setMenu({...menu, size: e.target.value as UpdateMenu['size']})}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
            <br />
            <Button variant="outlined" onClick={handleUpdate}>Update</Button>
        </div>
    );
}