import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IArticleMeta } from '../../Models/IArticleMeta'
import * as Components from '../../components'
import * as Models from '../../Models'
import { ArticleRepository } from '../../repositories/ArticleRepository'
import * as Utils from '../../infrastructure/Utils'
import ReactNotification from "react-notifications-component";
import * as PropTypes from 'prop-types';
import './index.css'
import "react-notifications-component/dist/theme.css";
interface TestStates {
    categories: Models.ICategory[],
    content: string,
    onChange?: Function,
    getPlainText?: Function
}
export class Test extends React.Component<RouteComponentProps<any>, TestStates> {
    notificationDOMRef: any;
    ref_ContentEditor: Components.ContentEditor;
    constructor(props: any) {
        super(props);
        this.state = {
            categories: [],
            content: ''
        };
        this.notificationDOMRef = React.createRef();
    }
    componentWillMount() {

    }
    static contextTypes = {
        ShowMessage: PropTypes.func,
        ShowErrorMessage: PropTypes.func,
        ShowSuccessMessage: PropTypes.func,
        ShowSmartMessage: PropTypes.func,
        _sendCommentNotify: PropTypes.func
    }
    private onChange(e) {
        this.setState({ content: e });
        let text = this.ref_ContentEditor.getPlainText();
    }
    addNotification() {
        this.context.ShowErrorMessage()
    }
    NotiFySuccess() {
        this.context.ShowSuccessMessage()
    }
    NotiFyCustom() {
        let content = <div className={`notification-custom-success`}>
            <div className="notification-custom-icon">
                <i className='' />
            </div>
            <div className="notification-custom-content">
                <p className="notification-message">
                    yeah
                </p>
            </div>
        </div>
        this.context.ShowSmartMessage('success', content)
    }
    private sendNotify() {
        let notify = {
            id: "1",
            content: "yeah",
            ownerActionId: "5c0a8d6aeb562671178ff907",
            receiversId: ["5c0a8e96eb562671178ff92e"]
        } as Models.INotification
        this.context._sendCommentNotify(notify)
    }
    public render() {

        return <div className="pd-all-20">
            <div className="col-sm-12">
                <div className="app-content">
                    <ReactNotification ref={com => this.notificationDOMRef = com} />
                    <button onClick={() => this.addNotification()} className="btn btn-primary">
                        Danger
                    </button>
                    <button onClick={() => this.NotiFySuccess()} className="btn btn-primary">
                        Success
                    </button>
                    <button onClick={() => this.NotiFyCustom()} className="btn btn-primary">
                        Custom
                    </button>
                    <button onClick={() => this.sendNotify()} className="btn btn-primary">
                        Signalr
                    </button>
                </div>
            </div>
        </div>

    }
}