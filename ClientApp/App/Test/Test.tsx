import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IArticleMeta } from '../../Models/IArticleMeta'
import * as Components from '../../components'
import * as Models from '../../Models'
import { ArticleRepository } from '../../repositories/ArticleRepository'
import * as Utils from '../../infrastructure/Utils'
interface TestStates {
    categories: Models.ICategory[]
}
export class Test extends React.Component<RouteComponentProps<any>, TestStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            categories: []
        };

    }
    componentWillMount() {
        let categories = []
        let rootId = Utils.getNewGuid()
        let root = {
            id: rootId,
            categoryName: ".Net",
            isRoot: true,
            level: 0,
            subCategories: []
        } as Models.ICategory

        let item1 = {
            id: Utils.getNewGuid(),
            categoryName: "C#",
            isRoot: false,
            level: 1,
            parentCategoryId: rootId,
            subCategories: []
        } as Models.ICategory
        root.subCategories.push(item1)

        let item2Id = Utils.getNewGuid()
        let item2 = {
            id: item2Id,
            categoryName: ".NET core",
            isRoot: false,
            level: 1,
            parentCategoryId: rootId,
            subCategories: []
        } as Models.ICategory
        let subItem2 = {
            id: Utils.getNewGuid(),
            categoryName: "Thuật toán",
            isRoot: false,
            level: 2,
            parentCategoryId: item2Id,
            subCategories: []
        } as Models.ICategory
        item2.subCategories.push(subItem2)
        root.subCategories.push(item2)
        categories.push(root)
        categories.push(root)
        this.setState({ categories: categories })
    }
    renderTableBody(data) {
        return (data && data.length > 0)
            ? data.map((item, index) => {
                const key = 'tranfer-list-' + index
                return <tr key={key}>
                    <td>

                    </td>
                    <td></td>
                    <td className='text-right text-normal'>
                        <div className="table-break-word">
                            ccc
                        </div>
                    </td>
                    <td className='text-center'>

                    </td>
                    <td className='text-normal'>
                        <div className="table-break-word">
                            cc
                        </div>
                    </td>
                    <td>
                        cc
                    </td>
                    <td className='text-center'>ff</td>
                </tr>
            })
            : null
    }
    public render() {
        let tableHeader = [
            { title: 'Mã', classes: 'table-header--id cursor-pointer text-uppercase font-weight-bold', sortFieldName: 'transfer_number' },
            { title: 'Ngày nhận', classes: 'table-header--datetime cursor-pointer text-uppercase font-weight-bold', sortFieldName: 'receive_date' },
            { title: '', classes: 'min-width-250px table-header--25per text-uppercase font-weight-bold', sortFieldName: '' },
            { title: 'Kho', classes: 'text-center cursor-pointer text-uppercase font-weight-bold', sortFieldName: 'input_location_id' },
            { title: '', classes: 'min-width-250px table-header--25per', sortFieldName: '' },
            { title: 'Tình trạng', classes: 'table-header--status cursor-pointer text-uppercase font-weight-bold', sortFieldName: 'status' },
            { title: 'Số lượng', classes: 'table-header--inventory cursor-pointer text-uppercase font-weight-bold', sortFieldName: 'total_items' },
        ]
        return <div className="col-sm-12">
                <div className="col-sm-9">
                    <div className='box-body'>
                        <Components.Selection keyControl='' dataId='value' dataLabel='display'
                            value={'0'}
                            datas={listData} />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className='box-body'>
                        <Components.Selection keyControl='' dataId='value' dataLabel='display'
                            value={'0'}
                            datas={listData} />
                    </div>
                </div>
            </div>
    }
}
const listData = [
    { value: '0', display: 'item1' },
    { value: '1', display: 'item2' },
]