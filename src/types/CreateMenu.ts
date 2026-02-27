export type CreateMenu = {
    nama: string;
    deskripsi: string;
    harga: number;
    kategori: MenuKategori;
    label: MenuLabel;
    size: MenuSize
}

export type MenuKategori = 'makanan' | 'minuman';
export type MenuLabel = 'vegan' | 'gluten_free' | 'halal' | 'low_cal';
export type MenuSize = 'small' | 'large' | 'medium';