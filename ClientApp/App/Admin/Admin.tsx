import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { CkEditor } from '../../CoreComponents'
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
        return <CkEditor data="yeah" onChange={(e) => console.log(e)} />
    }
    public render() {

        return <div>
            <div className="form-group">
                
            </div>
        </div>
    }
}
