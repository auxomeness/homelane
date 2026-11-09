export type CategoryStatus = "All" | "Pending" | "Approved" | "Rejected";

export interface CategoryFilterProps {
    selectedCategory: CategoryStatus,
    onCategoryChange: (category: CategoryStatus) => void;
}

export type Action = "View Details";

export interface ActionProp {
    action: Action,
    link: string;
}

export interface list {
    image: string;
    title: string;
    location: string;
    intPrice: number;
    status: CategoryStatus;
    action?:ActionProp;
}

export const listData: list[] = [
    {
        image: "",
        title: "Three-bedroom townhome",
        location: "Quezon City",
        intPrice: 8500000,
        status: "Pending"
    },
    {
        image: "",
        title: "Ortigas Skyline Condo",
        location: "Pasig City",
        intPrice: 3200000,
        status: "Pending"
    },
    {
        image: "",
        title: "Garden-view family home",
        location: "San Juan",
        intPrice: 11900000,
        status: "Pending"
    },
    {
        image: "",
        title: "Makati Garden Residences",
        location: "Makati",
        intPrice: 9800000,
        status: "Approved"
    },
    {
        image: "",
        title: "Pasig Courtyard townhouse",
        location: "Pasig",
        intPrice: 7400000,
        status: "Rejected"
    },
]