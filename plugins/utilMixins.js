export default (context, inject) => {
    inject('getAmountOfRows', (arrayParamter, columnWidth) => {
        const list = [];
        const count = Math.ceil(arrayParamter.length / columnWidth);
        for (let i = 0; i < count; i++) {
            list.push(i);
        }
        return list;
    }),
    inject('getElementsOfCurrentRow', (arrayParamater, index, columnWidth) => {
        return arrayParamater.slice(index * columnWidth, index * columnWidth + columnWidth);
    })
}