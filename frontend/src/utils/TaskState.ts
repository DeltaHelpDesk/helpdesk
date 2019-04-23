export enum States {
    UNRESOLVED = 'UNRESOLVED',
    SOLVING = 'SOLVING',
    SOLVED = 'SOLVED',
    RETURNED = 'RETURNED',
}

const unresolved: string = 'UNRESOLVED';
const solved: string = 'SOLVED';
const solving: string = 'SOLVING';
const returned: string = 'RETURNED';

const background: string[] = [];
background[unresolved] = 'red-background';
background[solving] = 'orange-background';
background[solved] = 'green-background';
background[returned] = 'red-background';

export default background;