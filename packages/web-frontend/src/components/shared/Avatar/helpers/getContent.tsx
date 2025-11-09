export const getContent = (name: string): string | null => {
    if (name[0] && name[1]) return `${name[0]}${name[1]}`.toUpperCase();
    return "-";
};
