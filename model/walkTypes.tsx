import  { Walk } from './walk';
import { ThemeWalk } from './theme-walk'

const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) =>
    obj[key];

export function GetWalkTypeByName(walkName: string): { walkTypeData: { name: string, type: any, apiUrl: string }, found: boolean } {
    let walkTypesKeys = Object.keys(WalkTypes);
    walkTypesKeys = walkTypesKeys.filter((el: any) => getKeyValue(WalkTypes)(el).name == walkName);
    if (walkTypesKeys.length == 0)
        return { walkTypeData: WalkTypes.Walk, found: false }

    return { walkTypeData: getKeyValue(WalkTypes)(walkTypesKeys[0] as any), found: true }
}

export function GetWalkTypeByType(key: any) {
    let walkTypesKeys = Object.keys(WalkTypes);
    walkTypesKeys = walkTypesKeys.filter((el: any) => el == key);
    if (walkTypesKeys.length == 0)
        return { walkTypeData: WalkTypes.Walk, found: false }

    return { walkTypeData: getKeyValue(WalkTypes)(walkTypesKeys[0] as any), found: true }
}

export const WalkTypes = {
    Walk: {
        name: 'a-la-carte' as string,
        type: Walk as any,
        apiUrl: `${process.env.NEXT_PUBLIC_APIDOMAIN}/walks` as string
    },
    ThemeWalk: {
        name: 'theme-walks' as string,
        type: ThemeWalk as any,
        apiUrl: `${process.env.NEXT_PUBLIC_APIDOMAIN}/theme-walks` as string
    }
} as const;