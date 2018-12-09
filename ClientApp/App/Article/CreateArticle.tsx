import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IArticleMeta } from '../../Models/IArticleMeta'
import * as Components from '../../components'
import * as Models from '../../Models'
import { ArticleRepository } from '../../repositories/ArticleRepository'
import * as Utils from '../../infrastructure/Utils'
import { CategoryRepository } from '../../repositories/CategoryRepository'
interface CreateArticleStates {
    categories: Models.ICategory[],
    article: Models.IArticle
}
export class CreateArticle extends React.Component<RouteComponentProps<any>, CreateArticleStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            categories: [],
            article: new Object as Models.IArticle
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
        if (Utils.isNullOrEmpty(article.title) || Utils.isNullOrEmpty(article.content)) return
        let res = await ArticleRepository.CreateArticle(article)
        console.log(res)
    }
    public render() {
        let { categories } = this.state
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
                
                <div className="col-sm-8">
                    <div className="form-group">
                        <label>Tiêu đề</label>
                        <Components.Input value={this.state.article.title}
                            onChange={(e) => this.setState({ article: { ...this.state.article, title: e.target.value } })} />
                    </div>
                    <div className="form-group">
                            <label>Nội dung</label>
                            <Components.CkEditor data={this.state.article.content}
                                onChange={(value) => this.setState({ article: { ...this.state.article, content: value } })} />
                    </div>
                </div>
                <div className="col-sm-4">
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