var changeToThree=function (num) {
    num=parseFloat(Number(num).toFixed(2)).toString();
    var reg=num.indexOf('.') >-1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;//千分符的正则
    num=num.replace(reg, '$1');
    return num;
}
export default {
    changeToThree,
}