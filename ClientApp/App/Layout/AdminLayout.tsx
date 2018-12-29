import * as React from 'react';
import * as H from 'history';
import './index.css';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import * as Utils from '../../infrastructure/Utils'
import * as RoutePath from '../../infrastructure/RoutePath'
import * as SignalR from '../../infrastructure/SignalR'
import { INotification } from '../../Models/INotification'
export interface MainLayoutProps {
    routerHistory: H.History
}
interface AdminLayoutStates {

}
export class AdminLayout extends React.Component<MainLayoutProps, AdminLayoutStates> {
    notificationDOMRef: any;
    constructor(props: any) {
        super(props);
        this.state = {

        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        SignalR.createHubConnection();
        SignalR.hubConnection.on('Notify', (Notify) => {
            this.ShowMessage('success', Notify.Content);
        });
    }
    private _sendCommentNotify(Notify: INotification) {
        SignalR.hubConnection
            .invoke('Notify', Notify).then((response) => {
            })
            .catch(err => console.error(err));

    }
    static childContextTypes = {
        ShowMessage: PropTypes.func,
        ShowErrorMessage: PropTypes.func,
        ShowSuccessMessage: PropTypes.func,
        ShowSmartMessage: PropTypes.func,
        _sendCommentNotify: PropTypes.func
        
    }
    getChildContext() {
        return {
            ShowMessage: this.ShowMessage.bind(this),
            ShowErrorMessage: this.ShowErrorMessage.bind(this),
            ShowSuccessMessage: this.ShowSuccessMessage.bind(this),
            ShowSmartMessage: this.ShowSmartMessage.bind(this),
            _sendCommentNotify: this._sendCommentNotify.bind(this)
        }
    }
    private ShowErrorMessage(this:any, message?: string) {
        this.ShowMessage('danger', message)
    }
    private ShowSuccessMessage(this:any, message?: string) {
        this.ShowMessage('success', message)
    }
    private ShowMessage(this: any, type: string, message?: string) {
        let contentMessage = message
        let title = type=='danger' ? 'Lỗi' :''
        if (Utils.isNullOrEmpty(message)) {
            if (type == 'danger')
                contentMessage = 'Không thành công'
            if (type == 'success')
                contentMessage='Thành công'
        }
        this.notificationDOMRef.addNotification({
            title: title,
            message: contentMessage,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 5000 },
            dismissable: { click: true }
        });
    }
    private ShowSmartMessage(this: any, type: string, content: JSX.Element) {
        let title = type == 'danger' ? 'Lỗi' : ''
        this.notificationDOMRef.addNotification({
            title: title,
            content: content,
            type: type,
            insert: "top",
            container: "bottom-left",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 5000},
            dismissable: { click: true }
        });
    }
    private renderHeader() {
        return <header className="main-header">
            <a href="/" className="logo">
                <span className="logo-mini"><b>A</b>LT</span>
                <span className="logo-lg"><b>Admin</b>LTE</span>
            </a>
            <nav className="navbar navbar-static-top">
                <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </a>

                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li className="dropdown messages-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-envelope-o"></i>
                                <span className="label label-success">4</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="header">You have 4 messages</li>
                                <li>
                                    <ul className="menu">
                                        <li>
                                            <a href="#">
                                                <div className="pull-left">
                                                    <img src="https://res.cloudinary.com/quangphat/image/upload/c_fit,h_150,w_100/static/nancy_thumb.jpg"
                                                        className="img-circle" alt="User Image" />
                                                </div>
                                                <h4>
                                                    Support Team
                        <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                </h4>
                                                <p>Why not buy a new awesome theme?</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="pull-left">
                                                    <img src="../../../assets/admin/img/user3-128x128.jpg" className="img-circle" alt="User Image" />
                                                </div>
                                                <h4>
                                                    AdminLTE Design Team
                        <small><i className="fa fa-clock-o"></i> 2 hours</small>
                                                </h4>
                                                <p>Why not buy a new awesome theme?</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="pull-left">
                                                    <img src="../../../assets/admin/img/user4-128x128.jpg" className="img-circle" alt="User Image" />
                                                </div>
                                                <h4>
                                                    Developers
                        <small><i className="fa fa-clock-o"></i> Today</small>
                                                </h4>
                                                <p>Why not buy a new awesome theme?</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="pull-left">
                                                    <img src="../../../assets/admin/img/user3-128x128.jpg" className="img-circle" alt="User Image" />
                                                </div>
                                                <h4>
                                                    Sales Department
                        <small><i className="fa fa-clock-o"></i> Yesterday</small>
                                                </h4>
                                                <p>Why not buy a new awesome theme?</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="pull-left">
                                                    <img src="../../../assets/admin/img/user4-128x128.jpg" className="img-circle" alt="User Image" />
                                                </div>
                                                <h4>
                                                    Reviewers
                        <small><i className="fa fa-clock-o"></i> 2 days</small>
                                                </h4>
                                                <p>Why not buy a new awesome theme?</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="footer"><a href="#">See All Messages</a></li>
                            </ul>
                        </li>
                        <li className="dropdown notifications-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-bell-o"></i>
                                <span className="label label-warning">10</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="header">You have 10 notifications</li>
                                <li>
                                    <ul className="menu">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-users text-aqua"></i> 5 new members joined today
                    </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-warning text-yellow"></i> Very long description here that may not fit into the
                                                page and may cause design problems
                    </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-users text-red"></i> 5 new members joined
                    </a>
                                        </li>

                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart text-green"></i> 25 sales made
                    </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-user text-red"></i> You changed your username
                    </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="footer"><a href="#">View all</a></li>
                            </ul>
                        </li>
                        <li className="dropdown tasks-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-flag-o"></i>
                                <span className="label label-danger">9</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="header">You have 9 tasks</li>
                                <li>
                                    <ul className="menu">
                                        <li>
                                            <a href="#">
                                                <h3>
                                                    Design some buttons
                        <small className="pull-right">20%</small>
                                                </h3>
                                                <div className="progress xs">
                                                    <div className="progress-bar progress-bar-aqua  width-20" role="progressbar">
                                                        <span className="sr-only">20% Complete</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <h3>
                                                    Create a nice theme
                        <small className="pull-right">40%</small>
                                                </h3>
                                                <div className="progress xs">
                                                    <div className="progress-bar progress-bar-green width-40" role="progressbar">
                                                        <span className="sr-only">40% Complete</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <h3>
                                                    Some task I need to do
                        <small className="pull-right">60%</small>
                                                </h3>
                                                <div className="progress xs">
                                                    <div className="progress-bar progress-bar-red width-60" role="progressbar" >
                                                        <span className="sr-only">60% Complete</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <h3>
                                                    Make beautiful transitions
                        <small className="pull-right">80%</small>
                                                </h3>
                                                <div className="progress xs">
                                                    <div className="progress-bar progress-bar-yellow width-80" role="progressbar">
                                                        <span className="sr-only">80% Complete</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="footer">
                                    <a href="#">View all tasks</a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown user user-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <img src="https://res.cloudinary.com/quangphat/image/upload/c_fit,h_150,w_100/static/nancy_thumb.jpg" className="user-image" alt="User Image" />
                                <span className="hidden-xs">{Utils.GetAccount().DisplayName}</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="user-header">
                                    <img src="https://res.cloudinary.com/quangphat/image/upload/c_fit,h_150,w_100/static/nancy_thumb.jpg"
                                        className="img-circle" alt="User Image" />

                                    <p>
                                        Alexander Pierce - Web Developer
                  <small>Member since Nov. 2012</small>
                                    </p>
                                </li>
                                <li className="user-body">
                                    <div className="row">
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Followers</a>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Sales</a>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Friends</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="user-footer">
                                    <div className="pull-left">
                                        <a href="#" className="btn btn-default btn-flat">Profile</a>
                                    </div>
                                    <div className="pull-right">
                                        <a href="#" className="btn btn-default btn-flat">Sign out</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    }
    private renderSidebar() {
        return <aside className="main-sidebar">
            <section className="sidebar">
                <div className="user-panel">
                    <div className="pull-left image">
                        <img src="https://res.cloudinary.com/quangphat/image/upload/c_fit,h_150,w_100/static/nancy_thumb.jpg"
                            className="img-circle" alt="User Image" />
                    </div>
                    <div className="pull-left info">
                        <p>Alexander Pierce</p>
                        <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                    </div>
                </div>
                <form action="#" method="get" className="sidebar-form">
                    <div className="input-group">
                        <input type="text" name="q" className="form-control" placeholder="Search..." />
                        <span className="input-group-btn">
                            <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </form>
                <ul className="sidebar-menu tree" data-widget="tree">
                    <li className="header">MAIN NAVIGATION</li>
                    <li className="treeview">

                        <NavLink to='/'>
                            <i className="fa fa-dashboard"></i> <span>Tổng quan</span>
                            <span className="pull-right-container">
                                <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </NavLink>
                        <ul className="treeview-menu">
                            <li><a href="../../index.html"><i className="fa fa-circle-o"></i> Dashboard v1</a></li>
                            <li><a href="../../index2.html"><i className="fa fa-circle-o"></i> Dashboard v2</a></li>
                        </ul>
                    </li>
                    <li className="treeview">
                        <NavLink to={RoutePath.Path.articles}>
                            <i className="fa fa-files-o"></i>
                            <span>Bài viết</span>
                        </NavLink>
                        <ul className="treeview-menu">
                            <li><a href="../layout/top-nav.html"><i className="fa fa-circle-o"></i> Top Navigation</a></li>
                            <li><a href="../layout/boxed.html"><i className="fa fa-circle-o"></i> Boxed</a></li>
                            <li><a href="../layout/fixed.html"><i className="fa fa-circle-o"></i> Fixed</a></li>
                            <li><a href="../layout/collapsed-sidebar.html"><i className="fa fa-circle-o"></i> Collapsed Sidebar</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="../widgets.html">
                            <i className="fa fa-th"></i> <span>Tài khoản</span>
                            <span className="pull-right-container">
                                <small className="label pull-right bg-green">new</small>
                            </span>
                        </a>
                    </li>
                    <li>
                        <NavLink to={RoutePath.Path.test}>
                            <i className="fa fa-files-o"></i>
                            <span>Test</span>
                        </NavLink>
                    </li>
                </ul>
            </section>
        </aside>
    }
    private renderWrapper() {
        return <div className="content-wrapper">
            {this.props.children}
        </div>
    }

    public render() {
        return <div className="skin-blue sidebar-mini auto-height min-height-100">
            <div className="wrapper">
                <div className="fixed">
                    {this.renderHeader()}
                    {this.renderSidebar()}
                    {this.renderWrapper()}
                    <ReactNotification ref={com => this.notificationDOMRef = com} />
                </div>
            </div>
        </div>
    }
}

