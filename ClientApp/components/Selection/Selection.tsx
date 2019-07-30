import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classnames from 'classnames';
import { Loading } from '../Loading/Loading';
import * as Utils from '../../infrastructure/Utils';
import { CreateSVG } from '../CreateSVG'
import { Input } from '../Input/Input'
import './index.css';

export declare type ISelectionType = 'InputSearch' | 'Select'

interface ISelectionProps {
    keyControl: string,
    type?: ISelectionType,
    placeholder?: string,
    getData?: Function,
    dataId: string,
    dataLabel: string,
    value?: any,
    datas?: any, // edit listData
    className?: string,
    handleOnClickItem?: Function
    isInputSelect?: boolean
    handleOpenDropdown?: Function,
    renderData?: Function,
    hasAddNew?: boolean,
    createNewTitle?: string,
    onCreateNew?: Function,
    selectedValues?: any,
    defaultItem?: any,
    isBackdrop ?: any
}

interface ISelectionStates {
    initedData: boolean,
    isLoading: boolean,
    isOpenDropdown: boolean,
    value: any,
    isValueNew?: boolean,
    listData: any,
    listSuggest: any,
    dropUp: boolean,
    isBackdrop : boolean
}

export class Selection extends React.Component<ISelectionProps, ISelectionStates> {
    ref_selectionComponent: HTMLDivElement;
    constructor(props: any) {
        super(props)

        this.state = {
            initedData: false,
            isLoading: false,
            isOpenDropdown: false,
            value: this.props.value ,
            listData: this.props.datas || [],
            listSuggest: this.props.datas || [],
            dropUp: false,
            isBackdrop : this.props.isBackdrop
        }

        this.handleClickDropdown = this.handleClickDropdown.bind(this)
        this.handleOnClickItem = this.handleOnClickItem.bind(this)
        this.determineDropUp = this.determineDropUp.bind(this)
        this.handleTabChange= this.handleTabChange.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    static ref_content

    static defaultProps = {
        ISelectionType: 'Select',
        isBackdrop : true
    }

    componentWillReceiveProps(newProps) {
        if (this.props.datas != newProps.datas) {
            this.setState({
                listData: newProps.data,
                listSuggest: newProps.data
            })
        }
        if (this.props.value != newProps.value) {
            this.setState({ value: newProps.value })
        }
    }

    componentDidMount(this) {
        this.node = ReactDOM.findDOMNode(this);
        document.addEventListener('keyup', this.handleTabChange);
        window.addEventListener('resize', this.determineDropUp);
        window.addEventListener('scroll', this.determineDropUp);
        document.addEventListener('mousedown', this.handleClickOutside);
        this.determineDropUp();
    }

    componentWillUnmount(this) {
        document.removeEventListener('keyup', this.handleTabChange);
        window.removeEventListener('resize', this.determineDropUp);
        window.removeEventListener('scroll', this.determineDropUp);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    determineDropUp(this) {
        if (!this.node) return;
        const windowHeight = window.innerHeight;
        const menuHeight = this.ref_content.offsetHeight;
        const instOffsetWithMenu = this.node.getBoundingClientRect().bottom + menuHeight;
        this.setState({
            dropUp: instOffsetWithMenu >= windowHeight
        });
    }

    handleClickOutside(event) {
        if (this.ref_selectionComponent && !this.ref_selectionComponent.contains(event.target)) {
            this.setState({
                isOpenDropdown: false
            })
        }
    }

    getDataAPI() {
        if (this.props.getData) {
            this.setState({
                isLoading: true
            }, () => {
                this.props.getData().then(rsp => {
                    let listData = (rsp.data && rsp.data.length > 0) ? rsp.data : []
                    this.setState({
                        listData: listData,
                        listSuggest: listData,
                        isLoading: false,
                        initedData: true
                    })
                }).catch(() => {
                    this.setState({ isLoading: false })
                });
            })
        }
    }

    handleClickDropdown() {
        if (!this.state.initedData) {
            this.getDataAPI()
        }
        if (this.props.handleOpenDropdown)
            this.props.handleOpenDropdown()

        this.setState(prevState => ({
            isOpenDropdown: !prevState.isOpenDropdown
        }), () => {
            this.determineDropUp()
        });
    }

    handleOnClickItem(item?) {
        let { dataId, dataLabel } = this.props,
            { value } = this.state
        let selectedItem = item
        if (item) {
            value = item[dataId]
        } else {
            value = '0'
        }
        this.setState({
            isOpenDropdown: false,
            value: value,
            isValueNew: false
        }, () => {
            if (this.props.handleOnClickItem)
                this.props.handleOnClickItem(selectedItem)
        })
    }

    handleTabChange(e) {
        let tab = e.which || e.keyCode;
        if (tab == 9) {
            this.setState({
                isOpenDropdown: false
            })
        }
    }

    renderAddNew() {
        let { dataLabel, hasAddNew } = this.props,
            { value, isValueNew } = this.state

        const valueNew = value[dataLabel]

        return (hasAddNew && isValueNew) &&
            <li onClick={() => this.handleOnClickItem()}>
                <div className='row no-gutters align-items-center'>
                <div className='col-auto mr-2'>
                    <CreateSVG size={12} svgName='#next-icon-plus-circle' />
                    </div>
                    <div className='col'>
                        <span className='ml-2 break-word'><span>Thêm</span> "{valueNew}"</span>
                    </div>
                </div>
            </li>
    }

    renderTypeControl() {
        let { dataId, dataLabel } = this.props
        let { listSuggest, value } = this.state
        let item = listSuggest.find(p => p[dataId] == value)
        if (item == null) item = { [dataId]: '0', [dataLabel]:''}
        return <div className='ui-select-control' tabIndex={0} onClick={() => this.handleClickDropdown()}>
            <div className='ui-select-cell'>
                <div className='ui-select-value text-truncate'>{item[dataLabel]}</div>
                <div className='ui-select-arrow'>
                    <CreateSVG size={10} rotate={90} svgName='iconArrow' />
                </div>
            </div>
        </div>
    }

    renderDropdownSelect(this) {
        let { keyControl, defaultItem } = this.props,
            { listSuggest, value } = this.state
       

        return <div className='select-menu-outer' ref={component => this.ref_content = component}>
            {this.state.isLoading
                ? <Loading size='icon' />
                : <ul>
                    {/*this.renderAddNew()*/}
                    {defaultItem && <li key={defaultItem[this.props.dataLabel]}
                        onClick={() => this.handleOnClickItem(defaultItem)}>{defaultItem[this.props.dataLabel]}</li>}
                    {(listSuggest && listSuggest.length > 0) && listSuggest.map((item, index) => {
                        const key = keyControl + index

                        if (this.props.selectedValues != null && this.props.selectedValues.includes(item[this.props.dataId])) return

                        return <li key={key}
                            onClick={() => this.handleOnClickItem(item)}
                            className={(value == item[this.props.dataId]) ? "active-selection--component" : ''} >{item[this.props.dataLabel]}
                        </li>
                    })}
                </ul>}
        </div>
    }

    public render() {
        const { className } = this.props
        const clasesWrapper = classnames({
            'ui-selectbox': true,
            'ui-selectbox--openning': this.state.isOpenDropdown,
            'ui-dropup': this.state.dropUp,
            [className]: className
        });

        return <div className={clasesWrapper} ref={ component => this.ref_selectionComponent = component}>
            {this.renderTypeControl()}
            {this.renderDropdownSelect()}
            {(this.state.isOpenDropdown && this.state.isBackdrop) &&
                <div className='ui-backdrop-control' tabIndex={0}
                    onClick={() => this.handleClickDropdown()}></div>}
        </div>
    }
}