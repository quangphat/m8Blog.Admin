import * as React from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import * as App from '../ClientApp/App';
import * as Utils from './infrastructure/Utils';
import * as RoutePath from './infrastructure/RoutePath'
const RoleRoute = ({ component: Component, ...rest }: { component: any, path?: string, exact?: boolean }) => (
    <Route {...rest} render={props => {
        return <Component {...props} />

    }} />
);
const AuthenticatedRoute = (
    { component: Component, ...rest }: { component: any, path: string, exact?: boolean }) => (
        <Route {...rest} render={props =>
            document["test"] != null ?
                <Component {...props} /> : <Redirect to={{ pathname: "/account/login", state: { from: props.location } }} />
        } />
    );
const AppRoute = ({ component: Component, layout: Layout, authenticated: boolean = false, ...rest }) => (
    <Router history={history}>
        <Switch>
            <Route {...rest} render={props => (
                <Layout routerHistory={history}>
                    <Component {...props} />
                </Layout>
            )} />
        </Switch>
    </Router>
)

const history = Utils.history
export const routes = <Router history={history}>
    <App.AdminLayout routerHistory={history}>
        <Switch>
            <RoleRoute exact path='/' component={App.Home} />
            <RoleRoute exact path={RoutePath.Path.test} component={App.Test} />
            <RoleRoute exact path={RoutePath.Path.articles} component={App.ArticleList} />
            <RoleRoute exact path={RoutePath.Path.article_create} component={App.CreateArticle} />
            <RoleRoute exact path={RoutePath.Path.article_detail()} component={App.ArticleDetail} />
            <RoleRoute exact path={RoutePath.Path.article_edit()} component={App.ArticleEdit} />
        </Switch>
    </App.AdminLayout>
</Router>