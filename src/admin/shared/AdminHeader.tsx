import { BellDot, CircleUser, MessageCircleText, type LucideIcon } from 'lucide-react';
import './sharedStyles.css'
import { Link } from 'react-router';

interface headerIcon {
    label: string,
    icon: LucideIcon
    // href: string
}

const headerIcons: headerIcon[] = [
    {
        label: "notification",
        icon: BellDot
    },
    {
        label: "chat",
        icon: MessageCircleText
    },
    {
        label: "profile",
        icon: CircleUser
    }
]

export default function AdminHeader() {
    return (
        <header id='admin-header'>
            <h3 id='header-title'>HOMELANE</h3>

            <div className="right-header">
                <div className="header-role">
                    <p>Admin</p>
                </div>

                <div className="header-icons">
                    {headerIcons.map((icons) => {
                                const HeaderNavIcons = icons.icon;

                                return (
                                    <Link to={`/icons`}
                                        className="header-icons"
                                        key={icons.label}
                                    >
                                        <HeaderNavIcons size={24}/>
                                    </Link>
                                );
                            })}
                </div>
            </div>
        </header>
    );
}