import io from 'socket.io-client';
import Vue from 'vue'
const portal = require('@/utils/portal-helper');
const currentPortal = portal.currentPortal;

const socket = io(currentPortal.get('VUE_APP_SOCKET_URL'), {
    transports: ['websocket']
});
socket.on('connect', function () {
    console.log('Socket Has been Connected.')
});

socket.on('disconnect', function () {
    console.log('Socket Has been Disconnected.')
});

const SocketPlugin = {
    install (Vue) {
        Object.defineProperties(Vue.prototype, {
            $socket: {
                get() {
                    return socket
                }
            }
        })
    }
}

Vue.use(SocketPlugin)
