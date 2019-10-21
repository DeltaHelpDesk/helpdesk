export const GetFirstLetters = (input: string): string => {
    // const matches = input.match(/\b(\w)/g);
    if (!input) { return ''; }
    else {
        const letters = input.split(' ');
        let output = '';
        letters.map(x => output += x[0]);
        return output;

        // const acronym = matches.join('');
        // return acronym;
    }

}