import * as Models from '../Models'
import { Fetch } from './Fetch'
import * as ApiHelpers from '../infrastructure/ApiHelpers'
import * as Utils from '../infrastructure/Utils'

export const MediaRepository = {
    UploadAvatar: async (accountId: string, blob: any,fileName:string) => {
        let url = `/media/${accountId}/avatar`
        return await api_upload_file(blob, fileName, url);
    },
}

const api_upload_file = (blob: any, fileName: string, url: string): Promise<any> => {
    let input = new FormData();
    if (Utils.isNullOrEmpty(fileName))
        fileName = blob.name
    input.append('file', blob, fileName);

    return fetch(url, {
        method: 'POST',
        body: input,
        credentials: 'include'
    }).then(rsp => {
        if (rsp != null)
            return rsp.json()
        return null
    })
}
const upload_file_multi = async (blob: any[],url:string, errorSystem: string = ''): Promise<any> => {
    let input = new FormData();
    for (var i = 0; i != blob.length; i++) {
        input.append("files", blob[i]);
    }
    try {
        let rp = await fetch(url, {
            method: 'POST',
            body: input,
            credentials: 'include'
        });
        return await rp.json();
       
    }
    catch (e) {
        throw e;
    }
    finally {

    }
}
