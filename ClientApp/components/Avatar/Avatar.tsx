import * as React from 'react'
import * as classnames from 'classnames';
import { ImageResize } from '../Image/ImageResize'
import * as Utils from '../../infrastructure/Utils'
import './index.css'
//export declare type IAvatarType = 's100' | 's50' |'s25'
interface AvatarProps {
    img: string,
    displayName: string,
    //type: IAvatarType,
    className?: string,
    isResetAvatar?: number
}
interface AvatarStates {
    img: string,
    displayName: string,
    isResetAvatar: number,
    isError: boolean
}
export class Avatar extends React.Component<AvatarProps, AvatarStates>
{
    constructor(props) {
        super(props);
        this.state = {
            img: this.props.img,
            displayName: this.props.displayName,
            isResetAvatar: this.props.isResetAvatar | 0,
            isError: false
        }
    }
    componentWillReceiveProps(newProps: AvatarProps) {
        if (this.props.displayName != newProps.displayName) {
            this.setState({ displayName: newProps.displayName })
        }
        if (this.props.img != newProps.img) {
            this.setState({ img: newProps.img })
        }
        if (this.props.isResetAvatar != newProps.isResetAvatar) {
            this.setState({ img: newProps.img, isResetAvatar: newProps.isResetAvatar })
        }
    }
    private getShortName(name: string) {
        if (name) {
            let s = name.split(' ');
            if (s.length > 1)
                return s[0][0].toUpperCase() + s[1][0].toUpperCase()
            else
                return s[0][0].toUpperCase()
        }
        return ""
    }
    private getAvatar(img: string) {
        if (Utils.isNullOrEmpty(img)) return ""
        return `http://admin.greencode.vn:52709/upload/images/${img}.png`
    }
    private getAvatarColor(shortName:string) {
        let index = -1;
        if (ShortName1.indexOf(shortName[0]) > -1)
            return { backgroundColor: "#fd7e14" }
        if (ShortName2.indexOf(shortName[0]) > -1)
            return { backgroundColor: "#31a8d2" }
        if (ShortName3.indexOf(shortName[0]) > -1)
            return { backgroundColor: "#20c997" }
        if (ShortName3.indexOf(shortName[0]) > -1)
            return { backgroundColor: "#2e7d32" }
        return { backgroundColor: "#2e7d32" }
    }
    private setError(error: boolean) {
        this.setState({ isError: error })
    }
    private renderAvatar() {
        let { img, displayName, isError } = this.state
        let { className } = this.props
        let avatar = this.getAvatar(img)
        let display = this.getShortName(displayName)
        let classes = classnames({
            [className]: className,
        })
        if (Utils.isNullOrEmpty(avatar) || isError)
            return <div className={`my8-avatar ${classes}`} style={this.getAvatarColor(display)}>
                <span className="color-white font-size-20px">{display}</span>
            </div>
        return <img src={avatar} onError={() => this.setError(true)} className={`img-circle ${classes}`} alt={displayName} />
    }
    render() {
        return this.renderAvatar()
    }
}
export const ShortName1 = ["A", "B", "C", "D", "E", "F","Y"]
export const ShortName2 = ["G", "H", "I", "J", "K", "L","Q"]
export const ShortName3 = ["M", "N", "O", "P", "R","Z"]
export const ShortName4 = ["S", "T", "U", "V", "W", "X"]