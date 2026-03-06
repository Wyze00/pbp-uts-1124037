export default function HomePage(): React.JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <span className="text-4xl">🍊</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
                Selamat Datang di <span className="text-orange-500">BookAps</span>
            </h1>
            <p className="text-slate-500 max-w-md">
                Kelola daftar buku dengan cepat dan baik.
            </p>
        </div>
    );
}