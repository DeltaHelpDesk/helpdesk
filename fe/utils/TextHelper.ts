export const GetFirstLetters = (input: string): string => {
    if (!input) {
        return "";
    }
    const letters = input.split(" ");
    let output = "";
    letters.map((x) => output += x[0]);
    return output;

};
