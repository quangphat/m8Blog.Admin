import * as React from 'react'
import * as classnames from 'classnames';
import './index.css'
export declare type IAvatarType = 's100' | 's50' |'s25'
interface AvatarProps {
    img: string,
    displayName: string,
    type: IAvatarType,
    isResetAvatar?: number
}
interface AvatarStates {
    img: string,
    displayName: string,
    isResetAvatar: number
}
export class Avatar extends React.Component<AvatarProps, AvatarStates>
{
    constructor(props) {
        super(props);
        this.state = {
            img: this.props.img,
            displayName: this.props.displayName,
            isResetAvatar: this.props.isResetAvatar|0
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
    private getAvatar(img: string, type: IAvatarType) {
        if (type == "s100")
            return `http://admin.greencode.vn:52709/upload/images/${img}.png`
        else if (type == "s50")
            return `http://admin.greencode.vn:52709/upload/images/${img}.png`
        else if (type == "s25")
            return `http://admin.greencode.vn:52709/upload/images/${img}.png`
        return "";
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
    render() {
        let { img, displayName } = this.state
        let { type } = this.props
        let avatar = this.getAvatar(img, type)
        let display = this.getShortName(displayName)
        let classes = classnames({
            'my8-avatar-25': type == 's25',
            'my8-avatar-32': type == 's50',
        })
        return img ? <img src={avatar} className={`img-circle ${classes}`} alt="User Image" />
            : <div className="my8-avatar" style={this.getAvatarColor(display)}>
                <span className="color-white font-size-20px">{display}</span>
            </div>
    }
}
export const ShortName1 = ["A", "B", "C", "D", "E", "F","Y"]
export const ShortName2 = ["G", "H", "I", "J", "K", "L","Q"]
export const ShortName3 = ["M", "N", "O", "P", "R","Z"]
export const ShortName4 = ["S", "T", "U", "V", "W", "X"]