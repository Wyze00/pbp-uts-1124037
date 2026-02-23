import { NavLink, useParams } from "react-router";
import type { CreateUpdateMenu } from "./MenuForm";
import { useEffect, useState } from "react";

export default function MenuUpdate(): React.JSX.Element {
    const { id } = useParams();
    const [menu, setMenu] = useState<CreateUpdateMenu | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        const fetchDetail = async () => {
            const response = await fetch(`http://localhost:5173/api/menu/${id}`);

            if(response.status === 200){
                const data: CreateUpdateMenu = await response.json();
                setMenu(data);
            }

            setIsLoading(false);
        };

        fetchDetail();
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
                <NavLink to='/menu'><button>Back To Menu</button></NavLink>
            </>
        )
    }

    const handleUpdate: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();

        if(menu.nama === '' || menu.deskripsi === '' || menu.harga === 0){
            alert('Nama | Deskripsi | Harga : tidak boleh kososng');
            return;
        }

        const updateMenu = async () => {
            const response = await fetch(`http://localhost:5173/api/update-menu/${id}`, {
                method: 'PUT',
                body: JSON.stringify(menu),
                headers: {
                    'content-type': 'application/json',
                }
            });

            if(response.status === 200){
                console.log(await response.json());
                setIsSuccess(true);
                alert('Menu berhasil diupdate');
            }
        };
        
        updateMenu();
    };

    return (

        <div key={id} style={{border: '1px solid black'}}>
            <NavLink to={`/menu`}><button>Back To MenuList</button></NavLink>
            <NavLink to={`/menu/${id}`}><button>Back To Menu Detail</button></NavLink>
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
            <select value={menu.kategori} name="kategori" id="kategori" onChange={(e) => setMenu({...menu, kategori: e.target.value as CreateUpdateMenu['kategori']})}>
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
            </select>
            <br />
            <select value={menu.label} name="label" id="label" onChange={(e) => setMenu({...menu, label: e.target.value as CreateUpdateMenu['label']})}>
                <option value="vegan">Vegan</option>
                <option value="gluten_free">Gluten Free</option>
                <option value="halal">Halal</option>
                <option value="low_cal">Low Calorie</option>
            </select>
            <br />
            <select value={menu.size} name="size" id="size" onChange={(e) => setMenu({...menu, size: e.target.value as CreateUpdateMenu['size']})}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
            <br />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}