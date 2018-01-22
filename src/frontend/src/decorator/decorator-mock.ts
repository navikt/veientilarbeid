import withMenu from './decorator-header-withmenu';
import footer from './decorator-footer';
import styles from './decorator-styles';
import scripts from './decorator-scripts';
import skiplinks from './decorator-skiplinks';
import megamenu from './decorator-megamenu';

if (process.env.NODE_ENV === 'development') {
    document.body.innerHTML = document.body.innerHTML.replace('{{fragment.header-withmenu}}', withMenu);
    document.body.innerHTML = document.body.innerHTML.replace('{{fragment.footer}}', footer);
    document.body.innerHTML = document.body.innerHTML.replace('{{fragment.styles}}', styles);
    document.body.innerHTML = document.body.innerHTML.replace('{{fragment.scripts}}', scripts);
    document.body.innerHTML = document.body.innerHTML.replace('{{fragment.skiplinks}}', skiplinks);
    document.body.innerHTML = document.body.innerHTML.replace('{{fragment.megamenu-resources}}', megamenu);

}