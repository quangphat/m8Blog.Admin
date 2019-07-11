import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IArticleMeta } from '../../Models/IArticleMeta'
import * as Components from '../../components'
import * as Models from '../../Models'
import { ArticleRepository } from '../../repositories/ArticleRepository'
import * as Utils from '../../infrastructure/Utils'
import ReactNotification from "react-notifications-component";
import * as PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import './index.css'
import "react-notifications-component/dist/theme.css";
import 'cropperjs/dist/cropper.css';
import { MediaRepository } from '../../repositories/MediaRepository'
interface TestStates {
    categories: Models.ICategory[],
    content: string,
    onChange?: Function,
    getPlainText?: Function, rangeValue: number
}
export class Test extends React.Component<RouteComponentProps<any>, TestStates> {
    notificationDOMRef: any;
    ref_ContentEditor: Components.ContentEditor;
    cropper: any;
    ref_uploadImage: any;
    ref_pwe: any;
    constructor(props: any) {
        super(props);
        this.state = {
            categories: [],
            content: '',
            rangeValue : 1
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
        _sendCommentNotify: PropTypes.func,
        updateAccount: PropTypes.func
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

    private onUploadAvatar(blob) {
        MediaRepository.UploadAvatar(Utils.GetAccount().personId, blob, "").then(response => {
            if (response != null && response.error == null) {
                let account = Utils.GetAccount()
                account.avatar = response.data
                this.context.updateAccount(account)
            }
        })
    }
    //handleSelectImage(files) {
    //    if (files == null) return
    //    MediaRepository.UploadAvatar(Utils.GetAccount().personId, files[0], "").then(response => {
    //        if (response != null && response.error == null) {
    //            let account = Utils.GetAccount()
    //            account.avatar = response.data
    //            this.context.updateAccount(account)
    //        }
    //    })

    //}
    handleSelectImage(files) {
        //if (files == null) return
        
        const canvas = this.cropper.getCroppedCanvas().toDataURL()
        //let imageURL;
        fetch(canvas)
            .then(res => res.blob()).then(blob => {
                this.onUploadAvatar(blob)
            })
           

    }
    private onChangeCrop() {
        
        //console.log(this.cropper.getCroppedCanvas().toDataURL());
    }
    private onZoom(e) {
        if (e.detail.ratio > 1) {
            e.preventDefault();
            this.cropper.zoomTo = 1
        }
           
        console.log(e)
    }
    public render() {
        let account = Utils.GetAccount()
        let avatar = "https://my8-dev.s3-ap-southeast-1.amazonaws.com/5c0a8d6aeb562671178ff907ce0afddc-ef0a-45bd-97dd-5bf5f3e63f7c_avatar.png" 
        return <div className="pd-all-20">
            <Components.FileUpload ref={component => this.ref_uploadImage = component}
                onSelectFile={(files) => this.handleSelectImage(files)} isMultiple={false} className="position-relative">
                <div className='fileupload-text text-center'>
                    <Components.CreateSVG size={30} linkHref='#next-icon-camera-plus' />
                    <p className="mb-0 mt-2 text-secondary">Thêm hình ảnh</p>
                </div>

            </Components.FileUpload>
            <Cropper
                ref={cropper => this.cropper = cropper}
                src={avatar}
                style={{ height: 200, width: 200 }}
                aspectRatio={1 / 1}
                background={false}
                cropBoxResizable={false}
                dragMode={"move"}
                viewMode={1}
                movable={true}
                guides={false}
                zoomTo={1}
                minCanvasHeight={150}
                minCanvasWidth={150}
                maxCanvasWidth={200}
                maxCanvasHeight={200}
                zoom={(e)=>this.onZoom(e)}
                crop={() => this.onChangeCrop()} />
            <input type="range" max="1.5" min="0.3" step="0.0001" value={this.state.rangeValue} onChange={(e) => this.setState({ rangeValue: Number(e.target.value) })} />
        </div>

    }
}