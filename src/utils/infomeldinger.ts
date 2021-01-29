function antallSynligeInfomeldinger(): number {
    const dittNav = document.getElementById('dittnav-main-container');
    if (!dittNav) return 0;

    const synligeInfomeldinger = dittNav.querySelectorAll(
        '.infomeldinger-list > a, .infomeldinger-list > div:not(.varslinger-inngang-wrapper)'
    );
    return synligeInfomeldinger.length;
}

export default antallSynligeInfomeldinger;
