import * as React from 'react';
import * as H from 'history';
import './index.css';
import * as PropTypes from 'prop-types';
export interface MainLayoutProps {
    routerHistory: H.History
}
interface MainLayoutStates {

}
export class Layout extends React.Component<MainLayoutProps, MainLayoutStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        
    }
    static childContextTypes = {
        ShowMessage: PropTypes.func,

    }
    getChildContext() {
        return {
            ShowMessage: this.ShowMessage.bind(this),
        }
    }
    ShowMessage(this:any, type: string, message?: string) {
        let self = this;
        this.setState({
            openNotify: true,
            typeNotify: type,
            messageNotify: message
        }, () => {
            setTimeout(function () {
                self.setState({
                    openNotify: false
                })
            }, 3000);
        });
    }
    private renderHeader() {
        return <header>
            <div className="top-bar_sub_w3layouts container-fluid">
                <div className="row">
                    <div className="col-md-4 logo text-left">
                        <a className="navbar-brand" href="index.html">
                            <i className="fab fa-linode"></i> Weblog</a>
                    </div>
                    <div className="col-md-4 top-forms text-center mt-lg-3 mt-md-1 mt-0">
                        <span>Welcome Back!</span>
                        <span className="mx-lg-4 mx-md-2  mx-1">
                            <a href="login.html">
                                <i className="fas fa-lock"></i> Sign In</a>
                        </span>
                        <span>
                            <a href="register.html">
                                <i className="far fa-user"></i> Register</a>
                        </span>
                    </div>
                    <div className="col-md-4 log-icons text-right">

                        <ul className="social_list1 mt-3">

                            <li>
                                <a href="#" className="facebook1 mx-2" >
                                    <i className="fab fa-facebook-f"></i>

                                </a>
                            </li>
                            <li>
                                <a href="#" className="twitter2">
                                    <i className="fab fa-twitter"></i>

                                </a>
                            </li>
                            <li>
                                <a href="#" className="dribble3 mx-2">
                                    <i className="fab fa-dribbble"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="pin">
                                    <i className="fab fa-pinterest-p"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="header_top" id="home">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler navbar-toggler-right mx-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home
									<span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="about.html">About</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    Features
								</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#"></a>
                                    <a className="dropdown-item" href="blog1.html">Standard Blog</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="blog2.html">2 Column Blog</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="blog3.html">3 Column Blog</a>

                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="contact.html">Contact</a>
                            </li>

                        </ul>
                        <form action="#" method="post" className="form-inline my-2 my-lg-0 header-search">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search here..." name="Search"  />
                                <button className="btn btn1 my-2 my-sm-0" type="submit"><i className="fas fa-search"></i></button>
							</form>
		
						

					</div>
				</nav>

			</div>
	</header>
    }
    private renderSlider() {
        <section className="bottom-slider">
            <div className="course_demo1">
                <ul id="flexiselDemo1">
                    <li>
                        <div className="blog-item">
                            <img src="images/1.jpg" alt=" " className="img-fluid" />
                            <button type="button" className="btn btn-primary play" data-toggle="modal" data-target="#exampleModal">
                                <i className="fas fa-play"></i>
                            </button>

                            <div className="floods-text">
                                <h3>The fed and inequality
								<span>Blogger
									<label>|</label>
                                        <i>Adom Smith</i>
                                    </span>
                                </h3>

                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="blog-item">
                            <img src="images/2.jpg" alt=" " className="img-fluid" />
                            <button type="button" className="btn btn-primary play" data-toggle="modal" data-target="#exampleModal">
                                <i className="fas fa-play"></i>
                            </button>

                            <div className="floods-text">
                                <h3>The fastest insect in the world
								<span>Blogger
									<label>|</label>
                                        <i>Adom Smith</i>
                                    </span>
                                </h3>

                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="blog-item">
                            <img src="images/3.jpg" alt=" " className="img-fluid" />
                            <button type="button" className="btn btn-primary play" data-toggle="modal" data-target="#exampleModal">
                                <i className="fas fa-play"></i>
                            </button>


                            <div className="floods-text">
                                <h3>Billionaires versus Millionaires
								<span>Blogger
									<label>|</label>
                                        <i>Adom Smith</i>
                                    </span>
                                </h3>

                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="blog-item">
                            <img src="images/4.jpg" alt=" " className="img-fluid" />
                            <button type="button" className="btn btn-primary play" data-toggle="modal" data-target="#exampleModal">
                                <i className="fas fa-play"></i>
                            </button>


                            <div className="floods-text">
                                <h3>Billionaires versus Millionaires
								<span>Blogger
									<label>|</label>
                                        <i>Adom Smith</i>
                                    </span>
                                </h3>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex={1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="embed-responsive embed-responsive-21by9">
                                <iframe src="https://player.vimeo.com/video/145787219"></iframe>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    }
    private renderBanner() {

    }
   
    public render() {
        return <div>
            {this.renderHeader()}
            {this.renderSlider()}
            <section className="main-content-w3layouts-agileits">
                <div className="container">
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </section>
        </div>
    }
}

