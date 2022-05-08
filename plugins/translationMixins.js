export default (context, inject) => {
    inject('getCurrentTranslationProperty', (property, currentLanguageCode, propertyName = 'text') => {
        let result = '';
        property?.forEach(element => {
            if (element.languageCode == currentLanguageCode) {
                result = element[propertyName];
            }
        })
        return result;
    })
}