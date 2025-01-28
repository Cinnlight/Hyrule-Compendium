import Link from 'next/link';
import Search from './searchbar';

export default function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link
                        href="/"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    Compendium
                </li>
                <li>
                    Bestiary
                </li>
                <li>
                    Map
                </li>
                <li>
                    Settings
                </li>
                <Search />
            </ul>
        </nav>
    )
}