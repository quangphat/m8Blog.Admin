export interface IPaging {
    query: string,
    page: number,
    limit: number,
    status: string,
    hidden: boolean,
    startDate?: string,
    endDate?: string,
    over?: string,

}
export const parsePaging = (search: string, hasPaging: boolean=true): IPaging => {
    let queries = new URLSearchParams(search);
    let query = ''
   
    let status = ''
   
    let hidden = false
    
    let page = null as number
    let limit = null as number
    let startDate = ''
    let endDate = ''
    let over = ''
    

    if (queries.get('status')) {
        status = queries.get('status')
    }
   
    
    if (queries.get('startDate')) {
        startDate = queries.get('startDate')
    }
    if (queries.get('endDate')) {
        endDate = queries.get('endDate')
    }
    if (queries.get('over')) {
        over = queries.get('over')
    }
    if (queries.get('hidden')) {
        let value = queries.get('hidden')
        if (value && value.toLowerCase() === 'true') {
            hidden = true
        }
    }
    
    if (queries.get('page')) {
        let tmp = parseInt(queries.get('page'))
        if (!isNaN(tmp)) {
            page = tmp
        }
    }
    if (queries.get('limit')) {
        let tmp = parseInt(queries.get('limit'))
        if (!isNaN(tmp)) {
            limit = tmp
        }
    }
    
    let defaultPage = hasPaging ? 1 : null
    let defaultLimit = hasPaging ? 20 : null
    return {
        query: query,
        page: page == null ? defaultPage : page,
        limit: limit == null ? defaultLimit : limit,
        status: status,
        hidden: hidden,
        startDate: startDate,
        endDate: endDate,
        over: over
    }
}