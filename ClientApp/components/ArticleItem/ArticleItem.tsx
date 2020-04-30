import * as React from 'react';
import * as Models from '../../Models'
import * as Utils from '../../infrastructure/Utils'
import { NavLink } from 'react-router-dom';
import { Avatar, ArticleStatus, TagDisplay } from '../';
import * as RoutPath from '../../infrastructure/RoutePath'
import * as FormatHelper from '../../infrastructure/FormatHelper';
interface ArticleItemProps {
    article: Models.IArticle,
    isShowStatus?: boolean
}
interface ArticleItemStates {
    article: Models.IArticle
}
export class ArticleItem extends React.Component<ArticleItemProps, ArticleItemStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            article: this.props.article
        };

    }
    static defaultProps = {
        isShowStatus: false
    }
    componentWillMount() {

    }
    renderBody(data) {

    }
    private getPreviewContent(content: string) {
        if (Utils.isNullOrWhiteSpace(content)) return ''
        if (content.length < 200) return content;
        return `${content.substring(0, 200)}`
    }
    public render() {
        let { article } = this.state,
            { isShowStatus } = this.props
        if (Utils.isNullOrUndefined(article)) return null;
        return <div className="article-item-meta bg-white">
            <div className="">
                <h3>
                    <NavLink className="text-black" to={'/article/' + article.friendlyUrl}>{article.title}</NavLink>
                </h3>
                <div className="right">
                    <span><i className="bookmark like"></i> {article.likes} lượt thích</span>
                    <span><i className="bookmark like"></i> {article.comments} bình luận</span>
                </div>
            </div>

            <Avatar displayName={article.author.displayName} profileName={article.author.profileName}
                isShowName={true} img={article.author.avatar} size="s32" >
                <span className="text-small lh-20 ml-4">lúc {FormatHelper.FormatDateTimeFromDate(article.createdTime, '', '')}</span>
            </Avatar>
            <TagDisplay tags={article.tags} className="mt-5" routePath={RoutPath.Path.article_by_tags} />
            {isShowStatus && <ArticleStatus status={article.status} />}
            <p>{this.getPreviewContent(article.preview)}...</p>
        </div>
    }
}
