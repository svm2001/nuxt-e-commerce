export const formatNumber = (number: number | bigint): string => {
    let strNumber = number.toString();
    strNumber = strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return strNumber;
};