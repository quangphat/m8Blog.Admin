import * as React from 'react';
import * as Utils from '../../infrastructure/Utils'
interface TagDisplayProps {
    tags: string[],
    routePath?:string,
    className?: string
}
interface TagDisplayStates {
    tags: string[]
}
export class TagDisplay extends React.Component<TagDisplayProps, TagDisplayStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            tags: this.props.tags
        };

    }
    static defaultProps = {
        className:''
    }
    componentWillReceiveProps(newProps: TagDisplayProps) {
        if (this.props.tags != newProps.tags) {
            this.setState({ tags: newProps.tags })
        }
    }
    private onClickItem(item) {
        if (!Utils.isNullOrWhiteSpace(this.props.routePath)) {
            let history = Utils.history
            history.push(Utils.buildSearchQuery(this.props.routePath, { tags:encodeURIComponent(item)}))
        }
    }
    public render() {
        let { tags } = this.state
        if (Utils.isNullOrUndefined(tags)) return null;
        return <div className={`${this.props.className} next-token-list__wrapper`}>
            <ul className='next-token-list pd-0'>
                {tags.map((item, index) => {
                    return <li key={'input-tags' + index} className='tagit-choice table-break-word' onClick={() => this.onClickItem(item)}>
                        <span className='tagit-label'>{item}</span>
                    </li>
                })}
            </ul>
        </div>
    }
}
