import * as React from 'react'
import * as classnames from 'classnames';
import { ImageResize } from '../Image/ImageResize'
import * as H from 'history';
import * as Utils from '../../infrastructure/Utils'
import * as  RoutePath from '../../infrastructure/RoutePath'
import './index.css'
export declare type IAvatarSize = 's50' | 's32'
interface AvatarProps {
    img: string,
    displayName: string,
    profileName: string,
    size?: IAvatarSize,
    className?: string,
    isShowName?: boolean,
    isResetAvatar?: number,
    onClick?: Function,
    history?: H.History
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
    static defaultProps = {
        isShowName: true,
        size: "s32"
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
    private onClick() {
        if (this.props.onClick) {
            this.props.onClick()
        }
        else {
            let { history } = this.props
            if (history == null)
                history = Utils.history
            history.push(RoutePath.Path.profile(this.props.profileName))
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
        return img
    }
    private getAvatarColor(shortName: string) {
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
        let { className, size } = this.props
        let avatar = this.getAvatar(img)
        let shortName = this.getShortName(displayName)
        if (isError)
            return null
        let imgClass = classnames({
            'my8-avatar-32': size == 's32',
            'my8-avatar-50': size == 's50',
        })
        return <div className={`${this.props.className}`} onClick={() => this.onClick()}>
            {(Utils.isNullOrEmpty(avatar) || isError) ? <React.Fragment><div className={`my8-avatar ${this.props.className}`} style={this.getAvatarColor(shortName)}>
                <span className="color-white font-size-20px">{shortName}</span>
            </div>
                {this.props.isShowName && <span className="ml-5">{displayName}</span>}
            </React.Fragment>
                : <React.Fragment>
                    <img src={avatar} onError={() => this.setError(true)} className={`img-circle ${imgClass}`} alt={displayName} />
                    {this.props.isShowName && <span className="ml-5">{displayName}</span>}
                </React.Fragment>
            }
            {this.props.children}
        </div>
    }
    render() {
        return this.renderAvatar()
    }
}
export const ShortName1 = ["A", "B", "C", "D", "E", "F", "Y"]
export const ShortName2 = ["G", "H", "I", "J", "K", "L", "Q"]
export const ShortName3 = ["M", "N", "O", "P", "R", "Z"]
export const ShortName4 = ["S", "T", "U", "V", "W", "X"]