const isNullOrEmpty = (str: string): boolean => {
    if (str == null || str === '' || str == undefined || str.trim() == '')
        return true
    return false;
}
export const Path = {
    test: '/test',
    articles: '/article',
    article_create:'/article_create',
    article_detail: (id?: string): string => {
        if (isNullOrEmpty(id))
            return '/article/:id'
        return `/article/${id}`
    },
    article_edit: (id?: string): string => {
        if (isNullOrEmpty(id))
            return '/article/:id/edit'
        return `/article/${id}/edit`
    },
    accounts:'/accounts'
}