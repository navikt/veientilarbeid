import styles from './tall.module.css';

interface Props {
    tall: number;
    inverted?: boolean;
    aktiv?: boolean;
    inaktiv?: boolean;
}

function hentStil(inverted?: boolean, aktiv?: boolean, inaktiv?: boolean) {
    let stil = styles.tallSirkel;
    if (inverted) {
        stil = styles.tallSirkelInverted;
    }
    if (aktiv) {
        stil = styles.tallSirkelAktiv;
    }
    if (inaktiv) {
        stil = styles.tallSirkelInaktiv;
    }
    return stil;
}

function TallSirkel(props: Props) {
    const { tall, inverted, aktiv, inaktiv } = props;
    return (
        <div>
            <div className={hentStil(inverted, aktiv, inaktiv)}>{tall}</div>
        </div>
    );
}

export default TallSirkel;
