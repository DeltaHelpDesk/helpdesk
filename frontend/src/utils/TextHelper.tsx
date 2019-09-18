export const GetFirstLetters = (input: string): string => {
    const matches = input.match(/\b(\w)/g);
    if (!matches) { return ''; }
    else {
        const acronym = matches.join('');
        return acronym;
    }
}