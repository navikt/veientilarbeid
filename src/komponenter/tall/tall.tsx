interface Props {
    tall: Number;
    inverted?: boolean;
    aktiv?: boolean;
}

function hentStil(inverted?: boolean, aktiv?: boolean) {
    let stil = 'tall-sirkel';
    if (inverted) {
        stil = 'tall-sirkel-inverted';
    }
    if (aktiv) {
        stil = 'tall-sirkel-aktiv';
    }
    return stil;
}

function TallSirkel(props: Props) {
    const { tall, inverted, aktiv } = props;
    return (
        <div>
            <div className={hentStil(inverted, aktiv)}>{tall}</div>
        </div>
    );
}

export default TallSirkel;
