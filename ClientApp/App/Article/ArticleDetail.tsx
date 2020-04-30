import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IArticleMeta } from '../../Models/IArticleMeta'
import { Button, Input, CodeBlock, CreateSVG } from '../../CoreComponents'
import { HeaderPage } from '../../components'
import { IArticle } from '../../Models'
import { ArticleRepository } from '../../repositories/ArticleRepository'
import * as Utils from '../../infrastructure/Utils'
import * as RoutePath from '../../infrastructure/RoutePath'
import * as Markdown from 'react-markdown';
interface ArticleDetailStates {
    article: IArticle
}
export class ArticleDetail extends React.Component<RouteComponentProps<any>, ArticleDetailStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            article: null
        };

    }
    componentWillMount() {
        let id = this.props.match.params.id
        this.getArticleDetail(id)
    }
    private getArticleDetail(id) {
        
        if (Utils.isNullOrUndefined(id))
            this.props.history.push(RoutePath.Path.articles);
        ArticleRepository.GetDetail(id).then(res => {
            if (res.data != null) {
                this.setState({ article: res.data })
            }
        })
    }
    private async onApprove() {
        let { article } = this.state
        let response = await ArticleRepository.Approve(article.id);
        if (response == null || response.error)
            return;
        this.props.history.push(RoutePath.Path.articles)
    }
    private renderBody() {
        let article = this.state.article
        if (Utils.isNullOrUndefined(article)) return null
        return <React.Fragment>
            <div className="form-group">
                <label>Tiêu đề</label>
                <Input isReadOnly={true} value={article.title} />
            </div>
            <div className="form-group">
                <label>Nội dung</label>
                <Markdown source={article.content} escapeHtml={false}
                    renderers={{ code: CodeBlock }}
                    skipHtml={false} />
            </div>
            <div className="form-group">
                <label>Đường dẫn thân thiện</label>
                <p className="collection-seo--preview-url text-truncate mb-0">
                    {'https://wwww.greencode.vn/article/' + article.friendlyUrl}
                </p>
            </div>
        </React.Fragment>
    }
    public render() {
        return <React.Fragment>
            <HeaderPage>
                <Button type='primary' className='ml-3'
                    onClick={() => { this.props.history.push(RoutePath.Path.article_edit(this.state.article.id)) }} >
                    <CreateSVG size={12} svgName='iconEdit' className='mr-3' />
                    <span>Chỉnh sửa</span>
                </Button>
                <Button type='primary' className='ml-3'
                    onClick={() => this.onApprove()} >
                    <CreateSVG size={12} svgName='iconEdit' className='mr-3' />
                    <span>Xuất bản</span>
                </Button>
            </HeaderPage>
                <div className="col-sm-12">
                    <div className="col-sm-8">
                        {this.renderBody()}
                    </div>
                </div>
        </React.Fragment>
    }
}