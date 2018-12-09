import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IArticleMeta } from '../../Models/IArticleMeta'
interface ArticleMetaProps {
    data: IArticleMeta
}
interface ArticleMetaStates {
    
}
export class ArticleMeta extends React.Component<ArticleMetaProps, ArticleMetaStates> {
    constructor(props: any) {
        super(props);

        this.state = {

        };

    }


    public render() {
        return <div className="meta">
            <span className="author">
                <img src={this.props.data.author.avatar} className="img-circle" alt="" />
                by <a href="author/gouri-sohoni.html" rel="nofollow" target="_blank">{this.props.data.author.lastName}</a></span>
            <span> on Jan 28</span>
        </div>
    }
}
