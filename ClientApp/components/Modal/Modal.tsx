﻿import * as React from 'react';
import { Modal as ModalStrap } from 'reactstrap';
import * as LibComponents from '..';
import './index.css';

export declare type optionSize = 'lg' | 'md' | 'sm';

interface IModalProps {
    isOpen?: boolean,
    size?: optionSize,
    className?: string,
    iconClose?: boolean,
    headerTitle?: any,
    bodyContent?: any,
    footerContent?: any,
    footerDisabledCloseModal?: boolean,
    isBtnClose?: boolean,
    beforeShowModal?: Function,
    afterCloseModal?: Function,
    backdrop?: any // true, false, 'static'
}

interface IModalStates {
    isOpen: boolean
}

export class Modal extends React.Component<IModalProps, IModalStates> {
    constructor(props: any) {
        super(props)

        this.state = {
            isOpen: this.props.isOpen || false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    static defaultProps = {
        isOpen: false,
        size: 'md',
        iconClose: true,
        isBtnClose: true,
        backdrop: true
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isOpen != nextProps.isOpen) {
            this.setState({ isOpen: nextProps.isOpen})
        }
    }
    public handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    public render() {
        return <div>
            <ModalStrap isOpen={this.state.isOpen} toggle={this.handleClick} size={this.props.size}
                className={this.props.className} backdrop={this.props.backdrop} modalTransition={{timeout : 50}}>
                <div className='modal-header'>
                    <h4 className='modal-title'>{this.props.headerTitle}</h4>
                    {this.props.iconClose &&
                        <LibComponents.Button type='link' className='close' handleOnClick={this.handleClick}>
                            <LibComponents.CreateSVG size={14} linkHref='#next-icon-times' />
                        </LibComponents.Button>
                    }
                </div>
                <div className='modal-body'>{this.props.bodyContent}</div>
                {
                    (this.props.footerContent || this.props.isBtnClose) && 
                    <div className='modal-footer'>
                        {this.props.isBtnClose && <LibComponents.Button type='default' handleOnClick={this.handleClick}>Hủy</LibComponents.Button>}
                        {this.props.footerDisabledCloseModal ? 
                        <div className='col-auto 1'>{this.props.footerContent}</div> : 
                        <div className='col-auto 2' onClick={this.handleClick}>{this.props.footerContent}</div>}
                    </div>
                }
            </ModalStrap>
            <div onClick={this.handleClick}>{this.props.children}</div>
        </div>
    }
}