// @ts-ignore
(function (doc, win) {
    let resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
    let recalc = function () {

        let clientWidth = document.documentElement.clientWidth;
        if (clientWidth > 1300) {
            let remsize = clientWidth / 100;
            document.documentElement.style.fontSize = (remsize > 26 ? 26 : remsize) + 'px';
            // console.log("更改尺寸", document.documentElement.style.fontSize)
            // document.documentElement.style.fontSize = remsize + 'px';
        }
        //let remsize = document.documentElement.clientWidth / 90;
        //// document.documentElement.style.fontSize = (remsize > 16 ? 16 : remsize) + 'px';
        //document.documentElement.style.fontSize = remsize + 'px';
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
