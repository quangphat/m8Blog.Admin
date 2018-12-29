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
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface TestStates {
    categories: Models.ICategory[],
    content: string,
    onChange?: Function,
    getPlainText?: Function
}
export class Test extends React.Component<RouteComponentProps<any>, TestStates> {
    notificationDOMRef: any;
    ref_ContentEditor: Components.ContentEditor;
    cropper: any;
    ref_uploadImage: any;
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
            receiversId: ["5c0a8e96eb562671178ff92e", "5c2338ec71479b759ab01807"]
        } as Models.INotification
        this.context._sendCommentNotify(notify)
    }
    private resultantImage() {
        let el = this.refs.reactCroppie
        //el.croppie('result', {
        //    type: 'rawcanvas',
        //    circle: true,
        //    // size: { width: 300, height: 300 },
        //    format: 'png'
        //}).then(function (canvas) {

        //});
        //el.result({ format: 'base64', size: { width: 100, height: 100 } }).then(function (resp) {
        //    console.log(resp);
        //    var image = new Image();
        //    image.src = resp;
        //    document.body.appendChild(image);
        //});

    }
    _crop() {
        // image in dataUrl
        console.log(this.cropper.getCroppedCanvas().toDataURL());
    }
    public render() {

        return <div className="pd-all-20">
            <div className="col-sm-12">
                <div className="col-sm-3">
                    <Components.Badge type="aqua" content="Chờ duyệt" />
                    <Components.Badge type="blue" content="Chờ duyệt" />
                    <Components.Badge type="orrange" content="Chờ duyệt" />
                    <Components.Badge type="green" content="Chờ duyệt" />
                </div>
                <div className="app-content">
                    <Components.ImageEmpty />
                    <Components.ImageResize
                        src='https://res.cloudinary.com/quangphat/image/upload/c_fit/static/nancy_thumb.jpg' />
                    <Components.FileUpload ref={component => this.ref_uploadImage = component}
                        onSelectFile={() => this.setState({ content: '' })} isMultiple ={false} className="position-relative">
                        <div className='fileupload-text text-center'>
                            <Components.CreateSVG size={30} linkHref='#next-icon-camera-plus' />
                            <p className="mb-0 mt-2 text-secondary">Thêm hình ảnh</p>
                        </div>

                    </Components.FileUpload>
                </div>
            </div>
        </div>

    }
}