//import React from "react"

interface HeaderProps {
    title: string;
    showSearch?: boolean;
}
function Header({ title, showSearch}:HeaderProps) {
    return (
        <header>
            <h1> {title} </h1>
            {showSearch && (
            <div> 
                <input type="text"
                       placeholder="Поиск..."
                       className="search-input me-2 p-1"
                />
                <button className="btn btn-primary w-30px h-10px">Найти</button>
            </div>
        )}
        </header>
    )
}
export default Header;