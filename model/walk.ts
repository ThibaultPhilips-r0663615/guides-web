import { Label } from './label';
import { Language } from './language';
import { Guide } from './guide';
import { Address } from './address';
import { Filedata } from './fileData';

export class Walk {
    id: string;
    titles: {languageCode: string, title: string}[];
    descriptions: {languageCode: string, description: string}[];
    pricePerPerson: number;
    startLocation: Address;
    endLocation: Address;
    duration: number;
    labels: Label[];
    languages: Language[];
    guides: Guide[];
    banner: Filedata;
    images: Filedata[];
    seoTitles: {languageCode: string, title: string}[];
    seoDescriptions: {languageCode: string, description: string}[];
    seoKeyWords: {languageCode: string, keyWords: string}[];

    constructor() {
        
    }
}