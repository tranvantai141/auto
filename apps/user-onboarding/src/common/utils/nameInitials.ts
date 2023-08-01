export function nameInitials(str: string) {
    const namesArray = str.trim().split(' ');
    const initials = namesArray.length > 1 ? namesArray[namesArray.length - 1][0] + namesArray[0][0] : namesArray[0][0]
    return initials
}