// Midlertig hack for å fikse error:
// https://github.com/facebookincubator/create-react-app/issues/3199
window.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
    return 0;
};