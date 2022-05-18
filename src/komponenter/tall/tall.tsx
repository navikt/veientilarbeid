interface Props {
    tall: Number;
    inverted?: boolean;
}

function TallSirkel(props: Props) {
    const { tall, inverted } = props;
    return (
        <div>
            <div className={inverted ? 'tall-sirkel-inverted' : 'tall-sirkel'}>{tall}</div>
        </div>
    );
}

export default TallSirkel;
