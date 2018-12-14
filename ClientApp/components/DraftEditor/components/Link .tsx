import * as React from 'react';

interface LinkProps {
    contentState: any,
    entityKey :any
}
export class Link extends React.Component<LinkProps, {}> {
    constructor(props: any) {
        super(props);
        this.state = {
            
        };

    }

    public render() {
        const { contentState, entityKey } = this.props;
        const { url } = contentState.getEntity(entityKey).getData();
        return <a className="link"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            aria-label={url}
        >{this.props.children}</a>
    }
}