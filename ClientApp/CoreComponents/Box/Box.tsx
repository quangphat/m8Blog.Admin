import * as React from 'react'
import * as classnames from 'classnames';
import { ImageResize } from '../Image/ImageResize'
import * as Utils from '../../infrastructure/Utils'
import './index.css'
interface BoxProps {
    className?: string,
    title: string,
    showFooter?: boolean
}

export class Box extends React.Component<BoxProps, any>
{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


    

    render() {
        let { className, title, showFooter } = this.props
        return <div className={`box ${className}`}>
            <div className="box-header with-border">
                <h3 className="box-title">{title}</h3>
            </div>
            <div className="box-body">
                {this.props.children}
            </div>
            {showFooter && <div className="box-footer text-center">
                <a href="javascript:void(0)" className="uppercase">View All Users</a>
            </div>}
        </div>
    }
}
