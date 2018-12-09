import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Components from '../../components'
import * as Models from '../../Models'
import { ArticleRepository } from '../../repositories/ArticleRepository'
interface AdminStates {
}
export class Admin extends React.Component<RouteComponentProps<any>, AdminStates> {
    constructor(props: any) {
        super(props);

        this.state = {
        };

    }
    componentWillMount() {
    }
    private SearchArticle() {

    }
    renderCkEditor() {
        return <Components.CkEditor data="yeah" onChange={(e) => console.log(e)} />
    }
    public render() {

        return <div>
            <div className="form-group">
                <label >Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" />
            </div>
            {this.renderCkEditor()}
        </div>
    }
}
