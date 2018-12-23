import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IArticleMeta } from '../../Models/IArticleMeta'
import * as Components from '../../components'
import * as Models from '../../Models'
import { ArticleRepository } from '../../repositories/ArticleRepository'
import * as Utils from '../../infrastructure/Utils'
interface ArticleDetailStates {
    categories: Models.ICategory[],
    article: Models.IArticle
}
export class ArticleDetail extends React.Component<RouteComponentProps<any>, ArticleDetailStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            categories: [],
            article: null
        };

    }
    componentWillMount() {
        let id = this.props.match.params.id
        this.getArticleDetail(id)
    }
    private getArticleDetail(id) {
        
        if (Utils.isNullOrUndefined(id))
            this.props.history.push('/article');
        ArticleRepository.GetDetail(id).then(res => {
            if (res.data != null) {
                this.setState({ article: res.data })
            }
        })
    }
    private renderBody() {
        let article = this.state.article
        if (Utils.isNullOrUndefined(article)) return null
        return <React.Fragment>
            <div className="form-group">
                <label>Tiêu đề</label>
                <Components.Input isReadOnly={true} value={article.title} />
            </div>
            <div className="form-group">
                <label>Nội dung</label>
                <Components.HtmlParser className='background-white pd-all-20' data={article.content} />
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
            <Components.HeaderPage>
                <Components.Button type='primary' className='ml-3'
                    handleOnClick={() => { this.props.history.push(`/article/${this.state.article.id}/edit`) }} >
                    <Components.CreateSVG size={12} linkHref='#next-icon-edit' className='mr-3' />
                    <span>Chỉnh sửa</span>
                </Components.Button>
            </Components.HeaderPage>
                <div className="col-sm-12">
                    <div className="col-sm-8">
                        {this.renderBody()}
                    </div>
                </div>
        </React.Fragment>
    }
}