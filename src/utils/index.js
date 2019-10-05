/**
 * Created by jiachenpan on 16/11/18.
 */

import store from '@/store'

export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
export function removeSlashes(path) {
    return path.replace(/^\/+/g, '').replace(/\/+$/g, '');
}

/**
 * Check the Authority.
 * @param {String|Array} permissions 
 */
export function canAccess(permissions) {

    if (!permissions) {
        return;
    }

    if (typeof permissions === 'string') {
        permissions = [permissions];
    }

    let has_access = false;
    permissions.forEach(function (permission) {
        if (
            store.getters.permissions.indexOf(permission) !== -1
        ) {
            has_access = true;
        }
    })

    return has_access;
}


export function getTimeOffset() {
    let user_timezone = (new Date).getTimezoneOffset();
    let sign = user_timezone <= 0 ? '+' : '-';
    user_timezone = Math.abs(user_timezone);
    let modulus = user_timezone % 60;
    let absolute_number = parseInt(user_timezone / 60);
    return sign + absolute_number.pad(2) + (modulus ? ':' + modulus.pad(2) : ':00');
}