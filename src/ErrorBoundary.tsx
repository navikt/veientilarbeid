import * as React from 'react';

export default class ErrorBoundary extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    /*static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }*/

    componentDidCatch(error: any, info: any) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
        console.log(error);
        console.log(info);
    }

    render() {
        /*if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }*/

        return this.props.children;
    }
}