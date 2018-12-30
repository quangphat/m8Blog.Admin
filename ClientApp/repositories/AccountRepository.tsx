import * as Models from '../Models'
import { Fetch } from './Fetch'
import * as ApiHelpers from '../infrastructure/ApiHelpers'
export const AccountRepository = {
    Search: async (searchStr: string, role: string, page: number, limit: number) => {
        let path = ApiHelpers.GetApiUrl('/account/search', {
            page: page,
            limit: limit,
            searchStr: searchStr,
            role: role
        })
        return Fetch.Get(path, null).then(response => {
            return response;
        })
    }
}
