export interface comboboxProps {
    options: { value: string | number; label: string | number }[];
    placeholder: string;
    searchPlaceholder: string;
    emptyText: string;
}