// app/ui/components/searchbar.tsx
export default function Search() {
    return (
        <li id="searchBar">
            <input
                id="navSearch" 
                type="text"
                placeholder="Search"
            />
            <button id="navSearchButton">
                <span className="material-icons-round">
                    search
                </span>
            </button>
        </li>
    )
}