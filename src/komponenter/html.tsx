import * as React from 'react';

interface HtmlProps {
    html: string;
}

const Html: React.SFC<HtmlProps> = (props: HtmlProps) => {
    return <span dangerouslySetInnerHTML={{ __html: props.html }}/>;
};

export default Html;