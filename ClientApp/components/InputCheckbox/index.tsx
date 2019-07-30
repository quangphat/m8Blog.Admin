import * as React from 'react';
import * as classnames from 'classnames';
import * as LibComponents from '..';
import './index.css';

interface IInputCheckboxProps {
    nameInput: string,
    className?: string,
    content?: any,
    isChecked?: boolean,
    isRequired?: boolean,
    isReadOnly?: boolean,
    isDisabled?: boolean,
    handleOnChange?: Function,
    iconCheck?: string,
    selfHandle?: boolean,
}

interface IInputCheckboxStates {
    isChecked: boolean,
    iconCheck: string,
    selfHandle: boolean,
}

export class InputCheckbox extends React.Component<IInputCheckboxProps, IInputCheckboxStates> {
    constructor(props: any) {
        super(props)

        this.state = {
            isChecked: this.props.isChecked || false,
            iconCheck: this.props.iconCheck || 'iconCheckmark',
            selfHandle: props.selfHandle == false ? false : true,
        }
        this.handleOnChange = this.handleOnChange.bind(this)
    }

    static defaultProps = {
        isDisabled: false,
        iconCheck: 'iconCheckmark'
    }

    componentWillReceiveProps(newProps) {
        if (this.props.isChecked != newProps.isChecked || this.props.iconCheck != newProps.iconCheck) {
            this.setState({
                isChecked: newProps.isChecked,
                iconCheck: newProps.iconCheck
            })
        }
    }

    handleOnChange(e) {
        if (this.state.selfHandle) {
            this.setState({
                isChecked: !this.state.isChecked
            }, () => {
                if (this.props.handleOnChange)
                    this.props.handleOnChange(this.state.isChecked)
            })
        } else {
            if (this.props.handleOnChange)
                this.props.handleOnChange(this.state.isChecked)
        }
    }

    public render() {
        let { nameInput, className, content, isRequired, isReadOnly, isDisabled } = this.props;
        let classes = classnames({
            'next-input-checkbox': true,
            [className]: className,
            'input-disabled': isDisabled
        });

        return (
            <div className={classes}>
                <label className='next-label--switch' htmlFor={nameInput} >{content}</label>
                <input className='next-checkbox'
                    type='checkbox' name={nameInput} id={nameInput} checked={this.state.isChecked}
                    disabled={isDisabled} required={isRequired} readOnly={isReadOnly}
                    onChange={(e) => { this.handleOnChange(e) }}
                />
                <span className='next-checkbox--styled'>
                    <LibComponents.CreateSVG size={10} className='checkmark' svgName={this.state.iconCheck} />
                </span>
            </div>
        );
    }
}