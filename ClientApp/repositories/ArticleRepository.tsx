import * as Models from '../Models'
import { Fetch } from './Fetch'
import * as ApiHelpers from '../infrastructure/ApiHelpers'
export const ArticleRepository = {
    CreateArticle: async (article:any) => {
        return Fetch.Post('/articles', article).then(response => {
            return response;
        })
    },
    Search: async (searchStr: string, authorId: string, categoryId: string, page: number, limit: number) => {
        let path = ApiHelpers.GetApiUrl('/articles/search', {
            page: page,
            limit: limit,
            searchStr: searchStr,
            authorId: authorId,
            categoryId: categoryId
        })
        return Fetch.Get(path, null).then(response => {
            return response;
        })
    },
    GetDetail: async (id:string) => {
        return Fetch.Get(`/articles/${id}`, null).then(response => {
            return response;
        })
    },
    Update: async (id: string, model: Models.IArticle) => {
        return Fetch.PUT(`/articles/${id}`, model).then(response => {
            return response;
        })
    },
}
