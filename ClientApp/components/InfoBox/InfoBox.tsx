import * as React from 'react'
import * as classnames from 'classnames';
import { Button } from '../Button/Button'
export declare type IInfoBoxStatesType = 'blue' | 'aqua' | 'green' | 'red' | 'orrange'
export declare type IInfoBoxStatesIconType = 'likes' | 'views' | 'articleweek' | 'articlenew' | 'none'

interface InfoBoxProps {
    type?: IInfoBoxStatesType,
    iconType?: IInfoBoxStatesIconType,
    contentText: string,
    contentNumber: number,
    hasButton?: boolean
    className?: string
}
interface InfoBoxStates {

}
export class InfoBox extends React.Component<InfoBoxProps, InfoBoxStates>{
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        type: 'blue',
        className: '',
        hasButton: false,
        iconType:'none'
    }
    render() {
        let { type, contentNumber, contentText, className, hasButton, iconType } = this.props
        let classes = classnames({
            'bg-blue': type == 'blue',
            'bg-green': type == 'green',
            'bg-aqua': type == 'aqua',
            'bg-red': type == 'red',
            'bg-orrange': type == 'orrange',
            [className]: className,
        })
        let iconClass = classnames({
            'fa-thumbs-o-up': iconType == 'likes',
            'fa-files-o': iconType == 'articleweek',
            '': iconType == 'none'
        })
        return <div className="info-box">
            <span className={`info-box-icon ${classes}`}>
                <i className={`fa ${iconClass}`}></i>
            </span>
            <div className="info-box-content">
                <span className="info-box-text">{contentText}</span>
                <span className="info-box-number">{contentNumber}</span>
            </div>
            {hasButton && <Button type="link-no-pding" className="small-box-footer pt-14 pr-5 pull-right">Chi tiết</Button>}
        </div>
    }
}