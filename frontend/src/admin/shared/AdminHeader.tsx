import { BellDot, CircleUser, MessageCircleText, type LucideIcon } from 'lucide-react';
import '../styles.css'

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
        <header>
            <h3 id='header-title'>HOMELANE</h3>

            <div className="right-header">
                <div className="header-role">
                    <p>Admin</p>
                </div>

                <div className="header-icons">
                    {headerIcons.map((icons) => {
                                const HeaderNavIcons = icons.icon;

                                return (
                                    <a
                                        className="header-icons"
                                        key={icons.label}
                                        // href={icons.href}
                                    >
                                        <HeaderNavIcons size={24}/>
                                    </a>
                                );
                            })}
                </div>
            </div>
        </header>
    );
}