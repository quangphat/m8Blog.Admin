import * as Models from '../Models'
import { Fetch } from './Fetch'
export const ArticleRepository = {
    CreateArticle: async (article:any) => {
        return Fetch.Post('/articles', article).then(response => {
            return response;
        })
    },
    Search: async (searchStr: string, page: number, limit: number, authorId: string, categoryId: string) => {
        return Fetch.Get(`/articles/${searchStr}/${page}/${limit}/${authorId}/${categoryId}`, null).then(response => {
            return response;
        })
    },
    GetDetail: async (id:string) => {
        return Fetch.Get(`/articles/${id}`, null).then(response => {
            return response;
        })
    },
}
