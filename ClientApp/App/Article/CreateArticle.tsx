import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IArticleMeta } from '../../Models/IArticleMeta'
import * as Components from '../../components'
import * as Models from '../../Models'
import * as Enums from '../../Enums/AppEnums'
import { ArticleRepository } from '../../repositories/ArticleRepository'
import * as Utils from '../../infrastructure/Utils'
import { CategoryRepository } from '../../repositories/CategoryRepository'
interface CreateArticleStates {
    categories: Models.ICategory[],
    article: Models.IArticle
}
export class CreateArticle extends React.Component<RouteComponentProps<any>, CreateArticleStates> {
    ref_ContentEditor: Components.ContentEditor;
    ref_pwe: Components.PowerEditor;
    constructor(props: any) {
        super(props);
        let model = new Object as Models.IArticle
        model.content = ''
        this.state = {
            categories: [],
            article: model
        };

    }
    componentWillMount() {
        this.getCategories()
    }
    private getCategories() {
        CategoryRepository.GetAll().then(res => {
            if (res != null && res.error == null) {
                this.setState({ categories: res.data });
            }
        })
    }
    private async onCreateArticle() {
        let { article } = this.state
        if (article == null) return
        if (Utils.isNullOrUndefined(article.category)) return
        article.content = this.ref_pwe.getContent()
        if (Utils.isNullOrEmpty(article.title) || Utils.isNullOrEmpty(article.content)) return
        article.preview = '';
        if (article.preview.length > 300)
            article.preview = article.preview.substring(0, 300);
        article.status = Enums.ArticleStatus.Pending;
        article.friendlyUrl = Utils.NonUnicode(article.friendlyUrl)
       
        let res = await ArticleRepository.CreateArticle(article)
        this.setState({ article: article })
        console.log(res)
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
        return <React.Fragment>
            <Components.HeaderPage>
                <Components.Button type='primary' className='ml-3'
                    handleOnClick={() => this.onCreateArticle()} >
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
                            <Components.PowerEditor ref={ref_pwe => this.ref_pwe = ref_pwe} content='' />
                        </div>
                        <div className="form-group">
                            <label>Đường dẫn thân thiện</label>
                            <Components.Input value={article.friendlyUrl}
                                onChange={(e) => this.setState({ article: { ...this.state.article, friendlyUrl: e.target.value } })} />
                        </div>
                        <div className="form-group">
                            <p className="collection-seo--preview-url text-truncate mb-0">
                                {'https://wwww.greencode.vn/' + Utils.NonUnicode(article.friendlyUrl)}
                            </p>
                        </div>
                </div>
                <div className="col-sm-2">
                    <div className="form-group">
                        <label></label>
                        {!Utils.isArrNullOrHaveNoItem(categories) && <Components.CategoryTree categories={this.state.categories}
                            onSelect={(c) => this.setState({ article: { ...this.state.article, category: c } })} />}
                    </div>
                </div>
            </div>
        </div >
        </React.Fragment>
    }
}
const listData = [
    { value: '0', display: 'item1' },
    { value: '1', display: 'item2' },
]