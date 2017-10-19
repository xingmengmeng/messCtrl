var setLeftHeight=(function () {
    return {
        init(){
            /*var leftSide=document.querySelector('.leftSide'),
                rightSide=document.querySelector('.rightSide'),
                rightHeight=rightSide.offsetHeight;
            var minHeight=document.documentElement.offsetHeight-70;
            leftSide.style.height=minHeight>rightHeight?minHeight+'px':rightHeight+'px';*/
            var leftSide=document.querySelector('.leftSide'),
                rightSide=document.querySelector('.rightSide');
            var minHeight=document.documentElement.offsetHeight-62;
            leftSide.style.height=minHeight+'px';
            rightSide.style.height=minHeight+'px';
        }
    }
})();
export default {
    setLeftHeight,
}
