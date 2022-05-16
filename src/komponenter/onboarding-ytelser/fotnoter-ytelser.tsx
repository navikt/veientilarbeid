import ByttKortLenke from './bytt-kort-lenke';

interface Props {
    valgtYtelse: string;
    handleByttKortKlikk: (e: React.MouseEvent) => void;
    kanViseDagpengerKomponent: boolean;
}

function FotnoterYtelser(props: Props) {
    const { valgtYtelse, handleByttKortKlikk, kanViseDagpengerKomponent } = props;
    return (
        <>
            {kanViseDagpengerKomponent && (
                <ByttKortLenke valgtYtelserVisning={valgtYtelse} handleByttKortKlikk={handleByttKortKlikk} />
            )}
        </>
    );
}

export default FotnoterYtelser;
