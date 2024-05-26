export const getContent = (userName: string): string | null => {
    if (userName[0] && userName[1]) return `${userName[0]}${userName[1]}`.toUpperCase();
    return "-";
};
