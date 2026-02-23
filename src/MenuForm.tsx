import { Button } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router";

export type CreateUpdateMenu = {
    nama: string;
    deskripsi: string;
    harga: number;
    kategori: 'makanan' | 'minuman';
    label: 'vegan' | 'gluten_free' | 'halal' | 'low_calorie';
    size: 'small' | 'large' | 'medium';
}

export default function MenuForm(): React.JSX.Element {
    const [menu, setMenu] = useState<CreateUpdateMenu>({
        nama: '',
        deskripsi: '',
        harga: 0,
        kategori: 'makanan',
        label: 'vegan',
        size: 'small',
    });

    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        if(menu.nama === '' || menu.deskripsi === '' || menu.harga === 0){
            alert('Nama | Deskripsi | Harga : tidak boleh kososng');
            return;
        }

        try {
            const createMenu = async () => {
                const response = await fetch('http://localhost:5173/api/create-menu', {
                    method: 'POST',
                    body: JSON.stringify(menu),
                    headers: {
                        'content-type': 'application/json',
                    }
                });
    
                if(response.status === 200){
                    setIsSuccess(true);
                }
            };
            
            createMenu();
        } catch (e) {
            console.log(e);
        }
    };

    if(isSuccess){
        return (
            <div>
                <p>Menu Berhasil Dibuat</p>
                <NavLink to="/menu"><Button variant="outlined">Menu List</Button></NavLink>
            </div>
        );
    }

    return (
        <div>
            <form>
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
                <select name="kategori" id="kategori" onChange={(e) => setMenu({...menu, kategori: e.target.value as CreateUpdateMenu['kategori']})}>
                    <option value="makanan">Makanan</option>
                    <option value="minuman">Minuman</option>
                </select>
                <br />
                <select name="label" id="label" onChange={(e) => setMenu({...menu, label: e.target.value as CreateUpdateMenu['label']})}>
                    <option value="vegan">Vegan</option>
                    <option value="gluten_free">Gluten Free</option>
                    <option value="halal">Halal</option>
                    <option value="low_cal">Low Calorie</option>
                </select>
                <br />
                <select name="size" id="size" onChange={(e) => setMenu({...menu, size: e.target.value as CreateUpdateMenu['size']})}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
                <br />
                <Button variant="outlined" onClick={handleClick}>Create Menu</Button>
            </form>
        </div>
    );
}