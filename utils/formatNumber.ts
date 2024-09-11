export const formatNumber = (number: number | bigint | null): string => {
    let strNumber = number?.toString();
    strNumber = strNumber?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return strNumber
};