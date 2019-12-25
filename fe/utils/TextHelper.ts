/**
 * @param  {string} input
 */
export const GetFirstLetters = (input: string): string => {
    if (!input) {
        return "";
    }
    const letters = input.split(" ");
    let output = "";
    letters.map((x) => output += x[0]);
    return output;

};

/**
 * @param  {number} current
 * @param  {number} max
 * @param  {string} onExceed
 * @param  {number} min?
 * @param  {string} onShort?
 */
export const GetHelperText = (
    current: number,
    max: number,
    onExceed: string,
    min?: number,
    onShort?: string,
): string => {

    if (current > max) {
        return `${onExceed} (${max})`;
    }

    if (min !== null && onShort !== null) {
        if (current > 0 && current < min) {
            return `${onShort} (<${min})`;
        }
    }

    return `${current}/${max}`;
};

/**
 * @param  {number} current
 * @param  {number} max
 * @param  {number} min?
 */
export const IsTextfieldError = (
    current: number,
    max: number,
    min?: number,
): boolean => {

    if (current > max) {
        return true;
    }

    if (min !== null) {
        if (current > 0 && current < min) {
            return true;
        }
    }

    return false;
};
