import type { StatusType } from "../shared/Status";

export type CategoryStatus = "All" | "Pending" | "Approved" | "Rejected";

export interface CategoryFilterProps {
    selectedCategory: CategoryStatus,
    onCategoryChange: (category: CategoryStatus) => void;
}

export interface SeearchFilterProps {
    searchQuery: string,
    onSearchChange: (query: string) => void;
    placeholder: string;
}

export interface list {
    image: string;
    title: string;
    location: string;
    intPrice: number;
    status: StatusType;
}

export const listData: list[] = [
    {
        image: "",
        title: "Three-bedroom townhome",
        location: "Quezon City",
        intPrice: 8500000,
        status: "pending"
    },
    {
        image: "",
        title: "Ortigas Skyline Condo",
        location: "Pasig City",
        intPrice: 3200000,
        status: "pending"
    },
    {
        image: "",
        title: "Garden-view family home",
        location: "San Juan",
        intPrice: 11900000,
        status: "pending"
    },
    {
        image: "",
        title: "Makati Garden Residences",
        location: "Makati",
        intPrice: 9800000,
        status: "approved"
    },
    {
        image: "",
        title: "Pasig Courtyard townhouse",
        location: "Pasig",
        intPrice: 7400000,
        status: "cancelled"
    },
]

export const Agents = [
    {
        image:'', name: "Xian Humping de los reyes", title: "PRC#0029182", location: "Naga City, PH", status: "pending"
    },
    {
        image:'', name: "Neil Anlene Villanueva", title: "PRC#0029183", location: "San Fernando City, PH", status: "approved"
    },
    {
        image:'', name: "Syxied Sebven Abelado", title: "PRC#0029182", location: "Naga City, PH", status: "cancelled"
    },
    {
        image:'', name: "Syxied Sebven Abelado", title: "PRC#0029182", location: "Naga City, PH", status: "cancelled"
    },
    {
        image:'', name: "Syxied Sebven Abelado", title: "PRC#0029182", location: "Naga City, PH", status: "cancelled"
    },
] as const
