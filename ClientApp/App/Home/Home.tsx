import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Components from '../../components'
import * as Models from '../../Models'
import { ArticleRepository } from '../../repositories/ArticleRepository'
interface HomeStates {
    article: Models.IArticleMeta
}
export class Home extends React.Component<RouteComponentProps<any>, HomeStates> {
    constructor(props: any) {
        super(props);
        let author = {
            
        } as Models.IAuthor
        let article = {
            author: author,
            time: new Date()
        } as Models.IArticleMeta
        this.state = {
            article: article
        };

    }
    componentWillMount() {
        this.SearchArticle()
    }
    private SearchArticle() {
        //ArticleRepository.Search('ss', 0, 0, '', '').then(response => {
        //    console.log(response)
        //})
    }

    public render() {
        
        return <div>
            <div className="col-lg-8 left-blog-info-w3layouts-agileits text-left">
            <div className="blog-grid-top">
                <div className="">
                    <h3>
                    <a href="single.html">Amet consectetur adipisicing </a>
                </h3>
                    <Components.ArticleMeta data={this.state.article} />
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sedc dnmo eiusmod tempor incididunt ut labore et dolore magna
                aliqua uta enim ad minim ven iam quis nostrud exercitation ullamco labor nisi ut aliquip exea commodo consequat duis
								aute irudre dolor in elit sed uta labore dolore reprehender</p>
                
                <div className="row">
                    <a href="single.html" className="btn btn-primary read-m">Read More</a>
                    
                </div>
            </div>
        </div>
            <div className="col-lg-8 left-blog-info-w3layouts-agileits text-left">
                <div className="blog-grid-top">
                    <div className="">
                        <h3>
                            <a href="single.html">Amet consectetur adipisicing </a>
                        </h3>
                        <Components.ArticleMeta data={this.state.article} />
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sedc dnmo eiusmod tempor incididunt ut labore et dolore magna
                    aliqua uta enim ad minim ven iam quis nostrud exercitation ullamco labor nisi ut aliquip exea commodo consequat duis
								aute irudre dolor in elit sed uta labore dolore reprehender</p>

                    <div className="row">
                        <a href="single.html" className="btn btn-primary read-m">Read More</a>

                    </div>
                </div>
            </div>
        </div>
    }
}
