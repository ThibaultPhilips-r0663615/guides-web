import { Language } from './language';
import { Filedata } from './fileData';

export class Guide {
    id: string;
    firstName: string;
    lastName: string;
    nickName: string;
    email: string;
    phoneNumber: string;
    descriptions: {languageCode: string, description: string}[];
    languages: Language[];
    profilePicture: Filedata;
    images: Filedata[];
    seoTitles: {languageCode: string, title: string}[];
    seoDescriptions: {languageCode: string, description: string}[];
    seoKeyWords: {languageCode: string, keyWords: string}[];
    
    constructor() {

    }
}