import * as React from 'react'
import { RouteComponentProps } from 'react-router';
import * as classnames from 'classnames';
import * as Models from '../../Models'
import * as Utils from '../../infrastructure/Utils'
import { AccountRepository } from '../../repositories/AccountRepository'
import { Avatar,Box } from '../../components'
interface AccountStates {
    accounts: Models.IAccount[]
}

export class Accounts extends React.Component<RouteComponentProps, AccountStates>
{
    constructor(props) {
        super(props);
        this.state = {
            accounts:[]
        }
    }
    componentDidMount() {
        this.getAccounts()
    }
    private getAccounts() {
        AccountRepository.Search('', '', 1, 20).then(response => {
            if (response != null && response.error == null) {
                this.setState({ accounts: response.data.datas })
            }
        })
    }
    private renderManagers(accounts: Models.IAccount[]) {
        if (Utils.isArrNullOrHaveNoItem(accounts)) return null
        return <Box title="Quản trị viên" className="box-blue">
            <div className="users-list clearfix">
                {accounts.map(account =>
                    <li key={account.personId}>
                        <Avatar displayName={account.displayName} profileName={account.profileName} img={account.avatar} className="my8-avatar-50" />
                        <a className="users-list-name" href="#">{account.displayName}</a>
                    </li>
                )}
            </div>

        </Box>
    }
    render() {
        let account = Utils.GetAccount()
        let { accounts } = this.state
        return <div className="pd-all-20">
            <div className="col-sm-12">
                <div className="col-sm-3">

                </div>
                <div className="app-content">
                    {this.renderManagers(accounts)}
                   
                </div>
            </div>
        </div>
    }
}
