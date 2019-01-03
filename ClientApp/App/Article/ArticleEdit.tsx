import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IArticleMeta } from '../../Models/IArticleMeta'
import * as Components from '../../components'
import * as Models from '../../Models'
import * as Enums from '../../Enums/AppEnums'
import { ArticleRepository } from '../../repositories/ArticleRepository'
import * as Utils from '../../infrastructure/Utils'
import { CategoryRepository } from '../../repositories/CategoryRepository'
import * as RoutePath from '../../infrastructure/RoutePath'
import * as Markdown from 'react-markdown';

interface ArticleEditStates {
    categories: Models.ICategory[],
    article: Models.IArticle
}
export class ArticleEdit extends React.Component<RouteComponentProps<any>, ArticleEditStates> {
    ref_ContentEditor: Components.ContentEditor;
    constructor(props: any) {
        super(props);
        this.state = {
            categories: [],
            article: null
        };

    }
    componentWillMount() {
        this.getCategories()
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
    private getCategories() {
        CategoryRepository.GetAll().then(res => {
            if (res != null && res.error == null) {
                this.setState({ categories: res.data });
            }
        })
    }
    private async onSaveArticle() {
        let { article } = this.state
        if (article == null) return
        if (Utils.isNullOrUndefined(article.category)) return
        if (Utils.isNullOrEmpty(article.title) || Utils.isNullOrEmpty(article.content)) return
        article.preview = this.ref_ContentEditor.getPlainText();
        if (article.preview.length > 300)
            article.preview = article.preview.substring(0, 300);
        article.status = Enums.ArticleStatus.Pending;
        article.friendlyUrl = Utils.NonUnicode(article.friendlyUrl)
        let res = await ArticleRepository.Update(article.id, article)
        if (res.success == true) {
            this.props.history.push(RoutePath.Path.article_detail(article.id))
        }
    }
    private onChangeTitle(e) {
        if (e == null) return
        let { article } = this.state
        article.title = e.target.value
        article.friendlyUrl = article.title
        this.setState({ article: article })
    }
    public render() {
        let { categories, article } = this.state
        if (Utils.isArrNullOrHaveNoItem(categories) || article == null) return null
        return <React.Fragment>
            <Components.HeaderPage>
                <Components.Button type='primary' className='ml-3'
                    handleOnClick={() => this.onSaveArticle()} >
                    <Components.CreateSVG size={12} linkHref='#next-icon-checkmark' className='mr-3' />
                    <span>Lưu</span>
                </Components.Button>
                
            </Components.HeaderPage>
            <div className="pd-all-20">

                <div className="col-sm-12">

                    <div className="col-sm-10">
                        <div className="form-group">
                            <label>Tiêu đề</label>
                            <Components.Input value={article.title}
                                onChange={(e) => this.onChangeTitle(e)} />
                        </div>
                        <div className="form-group">
                            <label>Nội dung</label>
                            <Components.ContentEditor
                                ref={ref => this.ref_ContentEditor = ref}
                                content={article.content}
                                onChange={(value) => this.setState({ article: { ...this.state.article, content: value } })} />
                        </div>
                        <div className="form-group">
                            <label>Đường dẫn thân thiện</label>
                            <Components.Input value={article.friendlyUrl}
                                onChange={(e) => this.setState({ article: { ...this.state.article, friendlyUrl: e.target.value } })} />
                        </div>
                        <div className="form-group">
                            <p className="collection-seo--preview-url text-truncate mb-0">
                                {'https://wwww.greencode.vn/article' + Utils.NonUnicode(article.friendlyUrl)}
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label></label>
                            {!Utils.isArrNullOrHaveNoItem(categories) && <Components.CategoryTree selectedItem={article.category}
                                categories={this.state.categories}
                                onSelect={(c) => this.setState({ article: { ...this.state.article, category: c } })} />}
                        </div>
                    </div>
                </div>
            </div >
        </React.Fragment>
    }
}
