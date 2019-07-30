import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IArticleMeta } from '../../Models/IArticleMeta'
import { ArticleStatus, TableList, HeaderPage, Button, CreateSVG } from '../../components'
import { IArticle, IPaging } from '../../Models'
import { ArticleRepository } from '../../repositories/ArticleRepository'
import * as Utils from '../../infrastructure/Utils'
import { NavLink } from 'react-router-dom';
import * as PagingHelpers from '../../infrastructure/PagingHelpers'
import * as RoutePath from '../../infrastructure/RoutePath'
interface ArticleListStates {
    articles: IArticle[],
    paging: IPaging
}
export class ArticleList extends React.Component<RouteComponentProps<any>, ArticleListStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            articles: [],
            paging: Utils.createNewPaging()
        };

    }
    componentWillMount() {
        let pagingUrl = PagingHelpers.parsePaging(this.props.location.search);
        let { paging } = this.state
        paging.query = pagingUrl.query
        paging.page = pagingUrl.page;
        paging.limit = pagingUrl.limit
        this.setState({ paging: paging }, () => this.getArticle())
    }
    componentWillReceiveProps(newProps) {
        const newParam = `${newProps.location.search}${newProps.location.hash ? newProps.location.hash : ''}`
        const oldParam = this.props.location.search

        if (newParam != oldParam) {
            let pagingUrl = PagingHelpers.parsePaging(newParam);
            let { paging } = this.state
            paging.page = pagingUrl.page;
            paging.limit = pagingUrl.limit
            paging.query = pagingUrl.query
            this.setState({ paging: paging }, () => {
                this.getArticle()
            })

        }
    }
    private getArticle() {
        let { paging } = this.state
        ArticleRepository.Search(paging.query, paging.authorId, paging.status, paging.page, paging.limit).then(res => {
            if (res.data != null) {
                this.setState({ articles: res.data.datas })
            }
        })
    }
    renderTableBody(data: IArticle[]) {
        return data.map((item) => {
            return <tr key={item.id}>
                <td className='text-left text-normal'>
                    <div className="table-break-word">
                        <NavLink to={RoutePath.Path.article_detail(item.id)} className="d-inline-block">
                            <div className="font-weight-bold">{item.title}</div>
                        </NavLink>
                    </div>
                </td>
                <td>
                    <span>{item.author.email}</span>
                </td>
                <td className='text-center'>
                    {item.views}
                </td>
                <td className='text-center'>
                    {item.likes}
                </td>
                <td className='text-center'>
                    {item.comments}
                </td>
                <td>
                    <ArticleStatus status={item.status} />
                </td>
            </tr>
        })
    }
    private renderArticleTable() {
        let { articles } = this.state
        if (Utils.isArrNullOrHaveNoItem(articles)) return null;
        let tableHeader = [
            { title: 'Tiêu đề', classes: 'table-header--id cursor-pointer text-uppercase font-weight-bold', sortFieldName: 'transfer_number' },
            { title: 'Tác giả', classes: 'table-header--datetime cursor-pointer text-uppercase font-weight-bold', sortFieldName: 'receive_date' },
            { title: 'Lượt xem', classes: 'min-width-250px table-header--25per text-uppercase font-weight-bold', sortFieldName: '' },
            { title: 'Lượt thích', classes: 'text-center cursor-pointer text-uppercase font-weight-bold', sortFieldName: 'input_location_id' },
            { title: 'Bình luận', classes: 'min-width-250px table-header--25per', sortFieldName: '' },
            { title: 'Tình trạng', classes: 'table-header--status cursor-pointer text-uppercase font-weight-bold', sortFieldName: 'status' }
        ]
        return <TableList listData={articles}
            dataTableHeader={tableHeader}
            location={this.props.location}
            pathName={RoutePath.Path.articles}
            totalRecord={articles.length}
            hasPagination={true}
            renderTableBody={() => this.renderTableBody(articles)} >

        </TableList>
    }
    public render() {

        return <React.Fragment>
            <HeaderPage>
                <Button type='primary' className='ml-3'
                    onClick={() => { this.props.history.push(RoutePath.Path.article_create) }} >
                    <CreateSVG size={12} svgName='iconCheckmark' className='mr-3' />
                    <span>Tạo bài viết mới</span>
                </Button>
            </HeaderPage>
            <div className="pd-all-20">
                <div className="col-sm-12">
                    {this.renderArticleTable()}
                </div>
            </div>
        </React.Fragment>
    }
}
