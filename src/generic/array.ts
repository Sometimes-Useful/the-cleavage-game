export const uniqueOrArrayToArray = <T>(uniqueOrArray: T | T[]): T[] => Array.isArray(uniqueOrArray) ? uniqueOrArray : [uniqueOrArray]
