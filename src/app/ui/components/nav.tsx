'use client';

import Link from 'next/link';
import Search from './searchbar';
import ConditionalRender from './conditionalRender';
import Logout from './logout';

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
                <ConditionalRender
                    renderIfTrue={
                        <li>
                            <Link
                                href="/dashboard"
                            >
                                <span className="material-icons-round">
                                    dashboard
                                </span>
                                Dashboard
                            </Link>
                        </li>
                    }
                    renderIfFalse={null} // no dashboard link if user is not logged in
                />
                 {/* Conditional rendering based on whether the user is logged in */}
                <ConditionalRender 
                    renderIfTrue={
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
                    }
                    renderIfFalse={
                        <li>
                            <Link
                                href="/login"
                            >
                                <button>
                                    Login or Register
                                </button>
                            </Link>
                        </li>
                    }
                />
                <ConditionalRender 
                renderIfTrue={
                    <li>
                        <Logout />
                    </li>
                }
                renderIfFalse={null} // no logout button if user is not logged in
            />
            </ul>
        </nav>
    )
}