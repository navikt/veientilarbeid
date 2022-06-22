interface Props {
    tall: Number;
    inverted?: boolean;
    aktiv?: boolean;
    inaktiv?: boolean;
}

function hentStil(inverted?: boolean, aktiv?: boolean, inaktiv?: boolean) {
    let stil = 'tall-sirkel';
    if (inverted) {
        stil = 'tall-sirkel-inverted';
    }
    if (aktiv) {
        stil = 'tall-sirkel-aktiv';
    }
    if (inaktiv) {
        stil = 'tall-sirkel-inaktiv';
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
