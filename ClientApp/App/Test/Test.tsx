import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IArticleMeta } from '../../Models/IArticleMeta'
import * as Components from '../../components'
import * as Models from '../../Models'
import { ArticleRepository } from '../../repositories/ArticleRepository'
import * as Utils from '../../infrastructure/Utils'
interface TestStates {
    categories: Models.ICategory[],
    content: string,
    onChange?: Function,
    getPlainText?: Function
}
export class Test extends React.Component<RouteComponentProps<any>, TestStates> {
    ref_ContentEditor: Components.ContentEditor;
    constructor(props: any) {
        super(props);
        this.state = {
            categories: [],
            content:''
        };

    }
    componentWillMount() {
       
    }
    private onChange(e) {
        debugger
        this.setState({ content: e });
        let text = this.ref_ContentEditor.getPlainText();
    }
    public render() {
       
        return <div className="pd-all-20"><div className="col-sm-12">
                <Components.DanteEditor
                    content={'ddd'} />
            </div>
            </div>
            
    }
}