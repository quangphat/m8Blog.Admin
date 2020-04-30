import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { InfoBox } from '../../components'
import * as Models from '../../Models'
import { ArticleRepository } from '../../repositories/ArticleRepository'
interface HomeStates {

}
export class Home extends React.Component<RouteComponentProps<any>, HomeStates> {
    constructor(props: any) {
        super(props);

        this.state = {

        };

    }
    componentWillMount() {

    }

    public render() {

        return <div className="content">
            <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <InfoBox contentText="Lượt truy cập" contentNumber={2000} />
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <InfoBox contentText="Bài viết trong tuần" type="aqua" iconType="articleweek" contentNumber={2000} />
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <InfoBox contentText="Bài viết chưa duyệt" type="orrange" hasButton={true} contentNumber={2000} />
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <InfoBox contentText="Lượt thích" type="green" iconType="likes" contentNumber={2000} />
                </div>
            </div>
        </div>
    }
}
