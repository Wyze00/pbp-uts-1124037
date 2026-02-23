import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import type { Menu } from "./MenuList";

export default function MenuDetail(): React.JSX.Element {
    const { id } = useParams();
    const [menu, setMenu] = useState<Menu | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);

    useEffect(() => {
        const fetchDetail = async () => {
            const response = await fetch(`http://localhost:5173/api/menu/${id}`);

            if(response.status === 200){
                const data: Menu = await response.json();
                setMenu(data);
            }

            setIsLoading(false);
        };

        fetchDetail();
    }, [id]);

    if(isLoading) {
        return (
            <>
                Loading
            </>
        );
    } 
    
    if(menu === null){
        return (
            <>
                No Menu Detail With ID : ${id}
                <br />
                <NavLink to='/menu'><button>Back To Menu</button></NavLink>
            </>
        )
    }

    const handleDelete = async () => {

        if(!confirm('Yakin Delete Menu ?'))
            return;

        const response = await fetch(`http://localhost:5173/api/delete-menu/${id}`, {
            method: 'DELETE',
        })

        if(response.status === 200){
            setIsDeleteSuccess(true);
        }
    };

    if(isDeleteSuccess){
        return (
            <div>
                <p>Menu Berhasil Didelete</p>
                <NavLink to="/menu"><button>Menu List</button></NavLink>
            </div>
        );
    }

    return (
        <>
            <div key={menu.id} style={{border: '1px solid black'}}>
                <NavLink to={`/menu`}><button>Back To MenuList</button></NavLink>
                <NavLink to={`/menu/${menu.id}/update`}><button>UpdateMenu</button></NavLink>
                <button onClick={handleDelete}>Delete Menu</button>
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
        </>
    );
}