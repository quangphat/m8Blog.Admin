import * as H from 'history';
import { createBrowserHistory } from 'history';
import { IAccount, IPaging } from '../Models'
export const history = createBrowserHistory();

export const createNewPaging = (): IPaging => {
    return { page: 1, limit: 10, totalRecord: 0, hasMore: false } as IPaging
}

export const getNewGuid = (): string => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
export const isNullOrEmpty = (str: string): boolean => {
    if (str == null || str === '' || str == undefined || str.trim() == '')
        return true
    return false;
}
export const isNullOrUndefined = (obj: any): boolean => {
    if (obj == null || obj === '' || obj == undefined)
        return true
    return false;
}
export const isArrNullOrHaveNoItem = (arr: any[]): boolean => {
    if (arr == null || arr.length == 0 || arr == undefined)
        return true
    return false;
}
export const joinObject = (obj: Object) => {
    let path = '', arr_keyParams = Object.keys(obj)
    arr_keyParams.map(key => {
        if ((obj[key] || obj[key] === 0) && obj[key] != null) {
            path += '&' + key + '=' + obj[key]
        }
    })
    path = path.substring(1)
    return path
}
const nonUnicodeChars = new Array("a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
    "d",
    "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
    "i", "i", "i", "i", "i",
    "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o",
    "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u",
    "y", "y", "y", "y", "y", "-", "-", "-",
    "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A",
    "D",
    "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
    "I", "I", "I", "I", "I",
    "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
    "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U",
    "Y", "Y", "Y", "Y", "Y",
);
const unicodeChars = new Array("á", "à", "ả", "ã", "ạ", "â", "ấ", "ầ", "ẩ", "ẫ", "ậ", "ă", "ắ", "ằ", "ẳ", "ẵ", "ặ",
    "đ",
    "é", "è", "ẻ", "ẽ", "ẹ", "ê", "ế", "ề", "ể", "ễ", "ệ",
    "í", "ì", "ỉ", "ĩ", "ị",
    "ó", "ò", "ỏ", "õ", "ọ", "ô", "ố", "ồ", "ổ", "ỗ", "ộ", "ơ", "ớ", "ờ", "ở", "ỡ", "ợ",
    "ú", "ù", "ủ", "ũ", "ụ", "ư", "ứ", "ừ", "ử", "ữ", "ự",
    "ý", "ỳ", "ỷ", "ỹ", "ỵ", " ", "<", ">",
    "Á", "À", "Ả", "Ã", "Ạ", "Â", "Ấ", "Ầ", "Ẩ", "Ẫ", "Ậ", "Ă", "Ắ", "Ằ", "Ẳ", "Ẵ", "Ặ",
    "Đ",
    "É", "È", "Ẻ", "Ẽ", "Ẹ", "Ê", "Ế", "Ề", "Ể", "Ễ", "Ệ",
    "Í", "Ì", "Ỉ", "Ĩ", "Ị",
    "Ó", "Ò", "Ỏ", "Õ", "Ọ", "Ô", "Ố", "Ồ", "Ổ", "Ỗ", "Ộ", "Ơ", "Ớ", "Ờ", "Ở", "Ỡ", "Ợ",
    "Ú", "Ù", "Ủ", "Ũ", "Ụ", "Ư", "Ứ", "Ừ", "Ử", "Ữ", "Ự",
    "Ý", "Ỳ", "Ỷ", "Ỹ", "Ỵ",
);
export function NonUnicode(value: string, toLowerCase: boolean = true) {
    if (isNullOrEmpty(value)) return ''
    value = toLowerCase ? value.trim().toLowerCase() : value.trim();
    var outString = value;
    var stringLength = 0;
    var countSpace = 0;

    while (stringLength < value.length) {
        if (value[stringLength] == " ")
            countSpace++;
        else
            countSpace = 0;

        if (countSpace > 1)
            outString = outString.replace(" ", "");
        else {
            var idx = unicodeChars.indexOf(value[stringLength]);
            if (idx != -1) {
                outString = outString.replace(unicodeChars[idx], nonUnicodeChars[idx]);
            }
        }
        stringLength++;
    }

    return outString;

}
export const GetAccount = (): IAccount => {
    if (isLogin() == false) return null
    let account = document['account'] as IAccount
    return account;
}
export const isLogin = (): boolean => {
    let account = document['account'] as IAccount
    if (isNullOrUndefined(account)) return false;
    if (isNullOrEmpty(account.personId)
        || isNullOrUndefined(account.projectId)
        || isNullOrEmpty(account.email))
        return false;
    return true;
}