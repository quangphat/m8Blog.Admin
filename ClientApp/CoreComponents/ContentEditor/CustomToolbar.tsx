import * as React from 'react';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import * as PropTypes from 'prop-types';
import { FileUpload, Input, Button, CreateSVG, Modal } from '../'
class DisplayValueModel {
    display: string;
    value: string;
}

interface CustomToolbarProps {
    handleTabChange: Function,
    imageQuery: string,
    handleFreetextImageFilter: Function,
    listImages: any,
    listProductImages: any,
    renderPopupcontent: Function,
    handleClickItemPopupAdd: Function,
    handleModalImageAddGetPrev: Function,
    modalImageAddHasPrev: boolean,
    handleModalImageAddGetNext: Function,
    modalImageAddHasNext: boolean,
    isUploadImage: boolean,
    controlFooterImage: boolean,
    listChecked: any[],
    apiType: string,
    rawHtml: any,
    showRaw: boolean,
    selectedDimensionImage: DisplayValueModel,
    selectedStyleAlign: DisplayValueModel,
    handleSetDimensionImage: Function,
    handleSetAlignStyleImage: Function,
    addImages: Function,
    handleChangeViewHtml: Function,
    handleStateShowRaw: Function,
    handleViewHTML: Function,
    handleFileUploadModal: Function,
    productSelectImageStatus: number,
    onChangeProductSelectImageStatus?: Function,
    handleUpdateContentEditor?: Function
}

interface CustomToolbarStates {
    isLoading: boolean,
    isLockButton: boolean,
    productSelectImageStatus: number,
    listImages: any,
    listProductImages: any,
    imageUrl: string,
    alt: string
}


export class CustomToolbar extends React.Component<CustomToolbarProps, CustomToolbarStates>{
    ref_modalImage: Modal;
    ref_uploadImage: FileUpload;
    ref_modalSourceCode: any;
    constructor(props: any) {
        super(props)

        this.state = {
            isLoading: false,
            isLockButton: false,
            productSelectImageStatus: this.props.productSelectImageStatus,
            listImages: this.props.listImages,
            listProductImages: this.props.listProductImages,
            imageUrl: '',
            alt: ''
        }

    }
    static contextTypes = {
        ShowMessage: PropTypes.func
    }
    componentWillReceiveProps(newProps) {
        if (this.props.productSelectImageStatus != newProps.productSelectImageStatus) {
            this.setState({ productSelectImageStatus: newProps.productSelectImageStatus })
        }
        if (this.props.listImages != newProps.listImages) {
            this.setState({ listImages: newProps.listImages })
        }
        if (this.props.listProductImages != newProps.listProductImages) {
            this.setState({ listProductImages: newProps.listProductImages })
        }
    }
    public handleCloseModalImageRemove() {
        this.ref_modalImage.handleClick();
    }


    handleSelectImage(files) {
        let listImage = this.state.listImages
       
    }

    public handleCloseModalSourceCode() {
        this.ref_modalSourceCode.handleClick()
    }
    private onChangeStatus(e) {
        if (this.props.onChangeProductSelectImageStatus)
            this.props.onChangeProductSelectImageStatus(e)
    }
    public imageUrl = ''
    public alt = ''
    private onChangeUrl(e) {
        if (e == null) return
        this.setState({ imageUrl: e.target.value })
        this.imageUrl = e.target.value
    }
    private onChangeAlt(e) {
        if (e == null) return
        this.alt = e.target.value
        this.setState({ alt: e.target.value })
    }
    render() {
        let { handleTabChange, imageQuery, handleFreetextImageFilter, renderPopupcontent, handleClickItemPopupAdd, handleModalImageAddGetPrev,
            modalImageAddHasPrev, handleModalImageAddGetNext, selectedDimensionImage, selectedStyleAlign, handleSetDimensionImage, handleSetAlignStyleImage, modalImageAddHasNext, isUploadImage, controlFooterImage,
            addImages, handleChangeViewHtml, rawHtml, handleStateShowRaw, handleViewHTML, handleFileUploadModal, handleUpdateContentEditor } = this.props;
        let productSelectImageStatus = this.state.productSelectImageStatus
        let listImages = this.state.listImages,
            listProductImages = this.state.listProductImages
        return <div id="toolbar" key={123}>
            <select className="ql-font">
            </select>
            <select title="Size" className="ql-size" defaultValue='20px'>
                <option value="10px">Small</option>
                <option value="14px">Normal</option>
                <option value="20px">Large</option>
                <option value="36px">Huge</option>
            </select>
            <select className="ql-align">
            </select>
            <button className="ql-direction">
            </button>
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
            <select className="ql-color">
            </select>
            <select className="ql-background">
            </select>
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
            <button className="ql-blockquote" />
            <button className="ql-code-block" />

            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="+1" />
            <button className="ql-indent" value="-1" />
            <button className="ql-clean" />
            <button className="ql-link" />
            {/* <button className="ql-video" /> */}


            <Modal
                ref={component => this.ref_modalImage = component}
                headerTitle="Chèn hình ảnh"
                className="text-center content-editor--modalImage"
                isBtnClose={false}
                footerDisabledCloseModal={true}
                bodyContent={
                    <div className="">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="upload-tab" data-toggle="tab" href="#upload" role="tab" aria-controls="upload" aria-selected="true" onClick={(e) => handleTabChange(e)}>Upload Image</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="product-tab" data-toggle="tab" href="#product" role="tab" aria-controls="product" aria-selected="false" onClick={(e) => handleTabChange(e)}>Product images</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="url-tab" data-toggle="tab" href="#url" role="tab" aria-controls="url" aria-selected="false" onClick={(e) => handleTabChange(e)}>URL</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="upload" role="tabpanel" aria-labelledby="upload-tab">
                                <div className="pd-all-20 my-2">
                                    <div className="content-editor--searchImage">
                                        

                                        <div className="content-editor--btngroup">
                                            <div className='btn-group'>
                                                <Button className='mr-0' type='default' onClick={(e) => handleModalImageAddGetPrev(e)} isDisabled={!modalImageAddHasPrev}>
                                                    <CreateSVG svgName='iconArrow' size={14} rotate={180}></CreateSVG>
                                                </Button>
                                                <Button className='ml-0' type='default' onClick={(e) => handleModalImageAddGetNext(e)} isDisabled={!modalImageAddHasNext}>
                                                    <CreateSVG svgName='iconArrow' size={14}></CreateSVG>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pd-all-20 my-2 content-editor--editImage">
                                    <div className="row">
                                        <div className="col text-left">
                                            <label htmlFor="" className="my-2">Chèn với kích thước</label>
                                           
                                        </div>

                                        <div className="col text-left">
                                            <label htmlFor="" className="my-2">Canh chỉnh</label>
                                            
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-left">
                                            <label htmlFor="" className="my-2">Alt:</label>
                                            <Input id={'content-editor--alt'} onChange={(e) => this.onChangeAlt(e)}
                                                value={this.state.alt} placeholder=""></Input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="product" role="tabpanel" aria-labelledby="product-tab">
                                <div className="pd-all-20 my-2">
                                    <div className="content-editor--searchImage">
                                       

                                        <div className="content-editor--btngroup">
                                            <div className='btn-group'>
                                                <Button className='mr-0' type='default' onClick={(e) => handleModalImageAddGetPrev(e)} isDisabled={!modalImageAddHasPrev}>
                                                    <CreateSVG svgName='iconArrow' size={14} rotate={180}></CreateSVG>
                                                </Button>
                                                <Button className='ml-0' type='default' onClick={(e) => handleModalImageAddGetNext(e)} isDisabled={!modalImageAddHasNext}>
                                                    <CreateSVG svgName='iconArrow' size={14}></CreateSVG>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pd-all-20 my-2 content-editor--editImage">
                                    <div className="row">
                                        <div className="col text-left">
                                            <label htmlFor="" className="my-2">Chèn với kích thước</label>
                                            
                                        </div>

                                        <div className="col text-left">
                                            <label htmlFor="" className="my-2">Canh chỉnh</label>
                                           
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-left">
                                            <label htmlFor="" className="my-2">Alt:</label>
                                            <Input id={'content-editor--alt'} onChange={(e) => this.onChangeAlt(e)}
                                                value={this.state.alt} placeholder=""></Input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="url" role="tabpanel" aria-labelledby="url-tab">
                                <div className="pd-all-20 my-2">
                                    <Input prefix="http://" onChange={(e) => this.onChangeUrl(e)}
                                        value={this.state.imageUrl}
                                        placeholder="Đường dẫn hình">
                                    </Input>
                                </div>

                                <div className="pd-all-20 my-2 content-editor--editImage">
                                    {/*<div className="row">
                                        <div className="col text-left">
                                            <label htmlFor="" className="my-2">Chèn với kích thước</label>
                                            <LibComponents.Selection
                                                keyControl='type'
                                                dataId='value'
                                                dataLabel='display'
                                                value={selectedDimensionImage}
                                                data={AppOptions.contentEditorModalDimension}
                                                handleOnClickItem={(e) => handleSetDimensionImage(e)} />
                                        </div>

                                        <div className="col text-left">
                                            <label htmlFor="" className="my-2">Canh chỉnh</label>
                                            <LibComponents.Selection
                                                keyControl='type'
                                                dataId='value'
                                                dataLabel='display'
                                                value={selectedStyleAlign}
                                                data={AppOptions.contentEditorModalAlign}
                                                handleOnClickItem={(e) => handleSetAlignStyleImage(e)} />
                                        </div>
                                    </div>*/}
                                    <div className="row">
                                        <div className="col text-left">
                                            <label htmlFor="" className="my-2">Alt:</label>
                                            <Input id={'content-editor--alt'} onChange={(e) => this.onChangeAlt(e)} value={this.state.alt} placeholder=""></Input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                footerContent={
                    <div className='row align-items-center'>
                        <div className="col-3">
                            <div className="btn-group pull-left">
                                {
                                    isUploadImage ? [
                                        <Button key="uploadImage-9" className='mr-0' type='default' onClick={(e) => handleModalImageAddGetPrev(e)} isDisabled={!modalImageAddHasPrev}>
                                            <CreateSVG svgName='iconArrow' size={14} rotate={180}></CreateSVG>
                                        </Button>,
                                        <Button key="uploadImage-10" className='ml-0' type='default' onClick={(e) => handleModalImageAddGetNext(e)} isDisabled={!modalImageAddHasNext}>
                                            <CreateSVG svgName='iconArrow' size={14}></CreateSVG>
                                        </Button>
                                    ] : null
                                }

                            </div>
                        </div>

                        <div className="col-9 text-right content-editor--modalFooter">


                            <Button type='default' className='ml-0' onClick={this.handleCloseModalImageRemove.bind(this)}>
                                <span>Hủy</span>
                            </Button>

                            {
                                controlFooterImage ? <FileUpload ref={component => this.ref_uploadImage = component}
                                    onSelectFile={(files) => this.handleSelectImage(files)} isMultiple={false}>
                                    <Button type='primary' className='ml-0' >
                                        <span>Tải</span>
                                    </Button>
                                </FileUpload>
                                    : null
                            }
                            <Button type='primary' onClick={addImages}>
                                <span>Chèn hình</span>
                            </Button>
                        </div>
                    </div>
                }>
                <button className="ql-image" />
            </Modal>

            <Modal className="content-editor--modalSource"
                ref={comp => this.ref_modalSourceCode = comp}
                headerTitle="Source code"
                isBtnClose={false}
                footerDisabledCloseModal={true}
                bodyContent={
                    <div className="pb-all-20">
                    </div>
                }
                footerContent={
                    <div className="row">
                        <div className="col text-right">
                            <Button onClick={this.handleCloseModalSourceCode.bind(this)} type='default' className="mr-2">
                                <span>Hủy</span>
                            </Button>
                            <Button type='primary' onClick={handleUpdateContentEditor}>
                                <span>Cập nhật</span>
                            </Button>
                        </div>
                    </div>
                }
                afterCloseModal={
                    () => {
                        handleStateShowRaw(false);
                    }
                }
            >
                <Button onClick={handleViewHTML} type="clean">
                    code
        </Button>
            </Modal>


        </div>
    }
}
