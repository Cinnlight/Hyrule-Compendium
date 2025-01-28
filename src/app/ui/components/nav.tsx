import Link from 'next/link';
import Search from './searchbar';

export default function Nav() {
    return (
        <nav>
            <ul>
                <Search />
                <li>
                    <Link
                        href="/"
                    >
                        <span className="material-icons-round">
                            home
                        </span>
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href="/compendium"
                    >
                        <span className="material-icons-round">
                            travel_explore
                        </span>
                        Compendium
                    </Link>
                </li>
                <li>
                    <Link
                        href="/forum"
                    >
                        <span className="material-icons-round">
                            forum
                        </span>
                        Forum
                    </Link>
                </li>
                <li>
                    <Link
                        href="/profile"
                    >
                        <span className="material-icons-round">
                            settings
                        </span>
                        Profile
                    </Link>
                </li>
            </ul>
        </nav>
    )
}