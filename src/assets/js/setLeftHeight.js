var setLeftHeight=(function () {
    return {
        init(){
            var leftSide=document.querySelector('.leftSide'),
                rightSide=document.querySelector('.rightSide'),
                rightHeight=rightSide.offsetHeight;
            var minHeight=document.documentElement.offsetHeight-70;
            leftSide.style.height=minHeight>rightHeight?minHeight+'px':rightHeight+'px';
        }
    }
})();
export default {
    setLeftHeight,
}
