import * as React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import debounce from 'lodash/debounce';
import * as Utils from '../../infrastructure/Utils';
import { CustomToolbar } from './CustomToolbar';

import BlotFormatter, { DeleteAction, ResizeAction, ImageSpec } from 'quill-blot-formatter';
import './index.css';

class CustomImageSpec extends ImageSpec {
    getActions() {
        var self = this;
        return [ResizeAction, DeleteAction];
    }

    private selectionImageQuill = 1;

    setSelection() {
        //    var element = this.getTargetElement();
        //    var elementPosition = element.getBoundingClientRect().left;
        //    this.formatter.quill.setSelection(elementPosition)
    }

    onHide() {
        var self = this;
        // this.selectionImageQuill = self.formatter.quill.getSelection().index;

        // this.selectionImageQuill = self.formatter.quill.getSelection(self.formatter.quill.hasFocus()).index;

        window.addEventListener('keyup', function (e) {
            if (e.keyCode === 46 || e.keyCode === 8) {
                if (document.body.contains(self.img) && self.img !== null) {
                    var element = self.img;
                    element.parentNode.removeChild(self.img);
                }
                self.formatter.hide();
            }
        })
    }

}



Quill.register('modules/blotFormatter', BlotFormatter);
interface ContentEditorProps {
    content: string,
    onChange?: Function,
    isReadonly?: boolean,
    autoFocus?: boolean
}
class DisplayValueModel {
    display: string;
    value: string;
}
interface ContentEditorStates {
    content: any,
    imageModal: boolean,
    imageQuery: string,
    currentPageModalImage: number,
    defaultPageSizeModalImage: number,
    listImages: any,
    listUploadImages: any,
    listProductImages: any,
    totalRecordImage: number,
    modalImageAddHasNext: boolean,
    modalImageAddHasPrev: boolean,
    modalImageRemoveHasNext: boolean,
    modalImageRemoveHasPrev: boolean,
    isLoadingModalImageAdd: boolean,
    listSelectedImages: any,
    isUploadImage: boolean,
    controlFooterImage: boolean,
    listChecked: any[],
    apiType: string,
    rawHtml: any,
    showRaw: boolean,
    selectedDimensionImage: DisplayValueModel,
    selectedStyleAlign: DisplayValueModel,
    productSelectImageStatus: number,
    changeRawSourceCode: any,
    onChangeSourceCode: boolean
}



export class ContentEditor extends React.Component<ContentEditorProps, ContentEditorStates> {
    ref_modalContentEditor: any;
    constructor(props: any) {
        super(props)

        this.state = {
            content: this.props.content || '',
            imageModal: false,
            imageQuery: '',
            currentPageModalImage: 1,
            defaultPageSizeModalImage: 10,
            listImages: [],
            listUploadImages: [],
            listProductImages: [],
            totalRecordImage: 0,
            modalImageAddHasNext: false,
            modalImageAddHasPrev: false,
            modalImageRemoveHasNext: false,
            modalImageRemoveHasPrev: false,
            isLoadingModalImageAdd: false,
            listSelectedImages: [],
            isUploadImage: true,
            controlFooterImage: true,
            listChecked: [],
            apiType: 'upload-tab',
            rawHtml: '',
            showRaw: false,
            selectedDimensionImage: { display: "Grande(600x600)", value: 'grande' },
            selectedStyleAlign: { display: 'Mặc định', value: 'text-align: center' },
            productSelectImageStatus: 1,
            changeRawSourceCode: '',
            onChangeSourceCode: false
        }

        this.handleDebounceSelectAllModal = debounce(this.handleDebounceSelectAllModal, 500)
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handlerImagePick = this.handlerImagePick.bind(this);
        this.handleChangeViewHtml = this.handleChangeViewHtml.bind(this);
    }

    private ref_quill;
    private ref_customToolbar;

    componentWillReceiveProps(newProps) {
        let newContent = newProps.content;
        let oldContent = this.props.content;

        if (newContent != oldContent)
            this.setState({ content: newContent });
    }

    componentDidMount() {
        let self = this;
        var Block = Quill.import('blots/block');
        var fontSizeStyle = Quill.import('attributors/style/size');
        fontSizeStyle.whitelist = ['10px', '14px', '20px', '36px'];
        Quill.register(fontSizeStyle, true);
        Block.tagName = 'DIV';
        Quill.register(Block, true);
        this.settingImageQuill();
        if (this.props.autoFocus)
            this.ref_quill.focus();
    }
    public getPlainText() {
        let plaintText = this.ref_quill.editor.getText()
        if (plaintText)
            return plaintText
        return '';
    }
    handleFreetextImageFilter(e) {
        this.setState({ imageQuery: e.target.value }, () => this.handleDebounceSelectAllModal())
    }

    handleDebounceSelectAllModal() {
        this.getImageData(this.state.apiType)
    }

    handleSelectedImageItem(item) {
        var listSelectedImages = this.state.listSelectedImages;
        var existItem = listSelectedImages.find(m => m.id == item.id)
        if (existItem) return true
        return false
    }
    settingImageQuill() {
        var BlockEmbed = Quill.import('blots/block/embed');
        let SizeStyle = Quill.import('attributors/style/size');
        let AlignStyle = Quill.import('attributors/style/align');
        

        class ImageBlot extends BlockEmbed {
            static blotName: string;
            static tagName: string;
            static create(value) {
                let node = super.create();
                if (!Utils.isNullOrUndefined(value.style)) {
                    node.setAttribute("style", value.style)
                }
                let img = document.createElement("img");
                img.setAttribute("src", `${value.url}`);
                if (!Utils.isNullOrUndefined(value.alt)) {
                    img.setAttribute('alt', value.alt);
                }
                if (!Utils.isNullOrUndefined(value.width)) {
                    img.setAttribute('width', value.width);
                }
                if (!Utils.isNullOrUndefined(value.height)) {
                    img.setAttribute('height', value.height);
                }
                img.setAttribute('class', "img-fluid");
                node.appendChild(img);
                return node;
            }

            static value(node) {
                if (node && node.firstChild && node.firstChild.nodeType != 3 && node.firstChild.getAttribute('src') != null) {
                    return {
                        alt: node.firstChild.getAttribute('alt'),
                        url: node.firstChild.getAttribute('src'),
                        style: node.getAttribute('style'),
                        width: node.firstChild.getAttribute('width'),
                        height: node.firstChild.getAttribute('height')
                    }
                }
            }

        }
        ImageBlot.blotName = 'image';
        ImageBlot.tagName = 'p';

        Quill.register(ImageBlot, true);
        Quill.register(SizeStyle, true);
        Quill.register(AlignStyle, true)
    }

    handleModalImageAddGetPrev(e) {
        var self = this;
        this.setState({
            isLoadingModalImageAdd: true
        }, () => {
            let currentPage = self.state.currentPageModalImage
            currentPage -= 1
            if (currentPage <= 0) {
                currentPage = 1;
            }
            let modalImageAddHasPrev = currentPage * self.state.defaultPageSizeModalImage > 10 ? true : false
            self.setState({
                currentPageModalImage: currentPage,
                modalImageAddHasPrev: modalImageAddHasPrev
            }, () => self.getImageData(this.state.apiType))
        })
    }

    handleModalImageAddGetNext(e) {
        var self = this;
        let currentPage = self.state.currentPageModalImage
        currentPage += 1
        self.setState({
            isLoadingModalImageAdd: true
        }, () => {
            self.setState({ currentPageModalImage: currentPage }, () => self.getImageData(this.state.apiType))
        })
    }


    handleClickItemPopupAdd(e) {
        let listSelectedImages = this.state.listSelectedImages,
            listData = this.state.listImages,
            listProductImages = this.state.listProductImages;
    }

    getImageData(type: string) {
        var currentPage = this.state.currentPageModalImage
        var currentQuery = this.state.imageQuery
    }

    changeDimensionImage(imageUrl, typeId: string = null) {
        let url = imageUrl,
            dimension = this.state.selectedDimensionImage;

        let res = url
        if (typeId != 'url-tab')
            res = url.replace(/\.jpe?g|\.ico|\.gif|\.png|\.svg/gi, `_${dimension.value}$&`)

        return res;
    }

    addImages() {
        let self = this;
        let listCurrentImage = this.state.listSelectedImages
        if (this.state.apiType == 'url-tab') {
            let imageUrl = this.ref_customToolbar.imageUrl
            if (imageUrl != null || imageUrl != '') {
                let item = null
                if (!Utils.isNullOrEmpty(this.ref_customToolbar.alt)) {
                    item = {
                        url: imageUrl,
                        alt: this.ref_customToolbar.alt
                    }
                }
                else {
                    item = {
                        url: imageUrl,
                    }
                }
                listCurrentImage.push(item)
            }
        }
        let imagesIds = []
        listCurrentImage.forEach(c => imagesIds.push(c.key))
        let currentIndex = 0
        if (self.ref_quill && self.ref_quill.getEditor() && self.ref_quill.getEditor().selection && self.ref_quill.getEditor().selection.savedRange) {
            currentIndex = self.ref_quill.getEditor().selection.savedRange.index
        }
        let nextIndex = currentIndex + 1
        let alignStyle = this.state.selectedStyleAlign.value
        listCurrentImage.map((item) => {
            if (item.url != null) {
                let itemClean = item.url.replace(/^https?:\/\//, '//');
                if (item.alt != null) {
                    self.ref_quill.getEditor().insertEmbed(nextIndex, "image", {
                        url: self.changeDimensionImage(itemClean),
                        alt: !Utils.isNullOrEmpty(this.ref_customToolbar.alt) ? this.ref_customToolbar.alt : item.alt,
                        style: alignStyle,
                        width: 'auto',
                        height: 'auto'
                    });
                }
                else {
                    self.ref_quill.getEditor().insertEmbed(nextIndex, "image", {
                        url: self.changeDimensionImage(itemClean),
                        alt: !Utils.isNullOrEmpty(this.ref_customToolbar.alt) ? this.ref_customToolbar.alt : item.alt,
                        style: alignStyle,
                        width: 'auto',
                        height: 'auto'
                    });
                }

                nextIndex++
                self.ref_quill.getEditor().setSelection(nextIndex)
            }
        })
        this.setState({ listSelectedImages: [] })
        self.ref_customToolbar.handleCloseModalImageRemove();
    }

    handleFileUploadModal(file) {
        let listImages = this.state.listImages;

        listImages.unshift(file);
        this.setState({
            listImages: listImages
        },)
    }

    handleOpenPopup() {
        this.getImageData('upload-tab')
    }

    renderPopupcontent(item) {
        let styleSelected = {
            border: "solid 1px #0078bd"
        }
        return <div key={item.key} className='content-editor--image' style={item.selected ? styleSelected : null}>
            {
               
            }
        </div>
    }


    handlerImagePick(e) {
        this.setState({ apiType: 'upload-tab' }, () => {
            this.getImageData('upload-tab');
        })
    }

    handleViewHTML() {
        const isEditingRaw = this.state.showRaw;
        this.setState({ showRaw: !isEditingRaw })
        this.syncViews(isEditingRaw)
    }

    syncViews(fromRaw) {
        if (fromRaw) this.setState({ content: this.state.rawHtml })
        else this.setState({ rawHtml: this.ref_quill.getEditor().root.innerHTML })
    }

    handleUpdateContentEditor() {
        let { changeRawSourceCode } = this.state;

        if (this.state.onChangeSourceCode) {
            this.setState({ content: changeRawSourceCode })
        }
        this.setState({
            onChangeSourceCode: false
        }, () => {
            this.ref_customToolbar.handleCloseModalSourceCode();
        })
    }

    handleChangeViewHtml(event) {
        let html = (typeof event == "string") ? event : event.target.value
        this.setState({
            changeRawSourceCode: html,
            onChangeSourceCode: true
        })
    }

    handleStateShowRaw(value) {
        this.setState({
            showRaw: value
        })
    }

    handleSetDimensionImage(value) {
        if (value != null) {
            this.setState({
                selectedDimensionImage: value
            })
        }
    }
    handleSetAlignStyleImage(value) {
        if (value != null) {
            this.setState({
                selectedStyleAlign: value
            })
        }
    }

    handleTabChange(e) {
        let id = e.target.id;
        if (id === 'url-tab') {

            this.setState({
                isUploadImage: false,
                apiType: id
            })
        } else {
            this.setState({
                isUploadImage: true
            })
        }

        if (id === 'upload-tab') {


            this.setState({
                controlFooterImage: true,
                apiType: id,
                productSelectImageStatus: 1
            })
            this.getImageData(id)
        } else {
            this.setState({
                controlFooterImage: false,
                apiType: id,
                productSelectImageStatus: 1
            })
            this.getImageData(id)
        }
    }

    settingModule() {
        return {
            toolbar: {
                container: "#toolbar",
                handlers: {
                    'image': this.handlerImagePick,
                    'source': this.handlerImagePick
                }
            },
            clipboard: {
                matchVisual: false
            },
            blotFormatter: {
                specs: [
                    CustomImageSpec,
                ],
                overlay: {
                    className: 'blot-formatter__overlay',
                    style: {
                        position: 'absolute',
                        boxSizing: 'border-box',
                        border: '1px dashed #444',
                        backgroundColor: 'pink',
                        opacity: "0.8"
                    },
                },
                resize: {
                    handleClassName: 'blot-formatter__resize-handle',
                    handleStyle: {
                        position: 'absolute',
                        height: '12px',
                        width: '12px',
                        backgroundColor: 'white',
                        border: '1px solid #777',
                        boxSizing: 'border-box',
                        opacity: '0.80',
                    },
                }
            }
        }
    }
    private onChange(value) {
        this.setState({ content: value })
        if (this.props.onChange)
            this.props.onChange(value)
    }

    public setFocus() {
        this.ref_quill.focus();
    }
    handleModalClose() {
        this.setState({
            imageModal: false
        }, () => {
            console.log(this.state.imageModal);
        })
    }

    onChangeSelection(event) {
        // if(event != null)
        //     console.log(event.index);
    }
    private onChangeStatus(e) {
        this.setState({ productSelectImageStatus: e })
    }
    public render() {
        let self = this;
        return <div className={this.state.showRaw ? "showRaw" : ""}>

            <div className="content-editor">
                <CustomToolbar  {...this.state}
                    onChangeProductSelectImageStatus={(e) => this.onChangeStatus(e)}
                    ref={component => self.ref_customToolbar = component}
                    handleFileUploadModal={this.handleFileUploadModal.bind(this)}
                    handleFreetextImageFilter={this.handleFreetextImageFilter.bind(this)}
                    renderPopupcontent={this.renderPopupcontent.bind(this)}
                    handleClickItemPopupAdd={this.handleClickItemPopupAdd.bind(this)}
                    handleModalImageAddGetPrev={this.handleModalImageAddGetPrev.bind(this)}
                    handleModalImageAddGetNext={this.handleModalImageAddGetNext.bind(this)}
                    handleTabChange={this.handleTabChange.bind(this)}
                    addImages={this.addImages.bind(this)}
                    key={'customtoolbar-0'}
                    handleViewHTML={this.handleViewHTML.bind(this)}
                    handleChangeViewHtml={this.handleChangeViewHtml.bind(this)}
                    handleStateShowRaw={this.handleStateShowRaw.bind(this)}
                    handleSetDimensionImage={this.handleSetDimensionImage.bind(this)}
                    handleSetAlignStyleImage={this.handleSetAlignStyleImage.bind(this)}
                    handleUpdateContentEditor={this.handleUpdateContentEditor.bind(this)}
                />
                <ReactQuill
                    ref={component => self.ref_quill = component}
                    theme='snow'
                    value={this.state.content}
                    readOnly={this.props.isReadonly}
                    
                    onChange={value => this.onChange(value)}
                    onChangeSelection={(event) => this.onChangeSelection(event)}
                    modules={this.props.isReadonly ? null : self.settingModule()}
                />
            </div>
        </div>
    }
}


