import { Coordinate } from '../shatter';
declare type Bound = {
    min: number;
    max: number;
};
export default class Bounds {
    x: Bound;
    y: Bound;
    constructor(coord: Coordinate);
    update(coord: Coordinate): void;
}
export {};
