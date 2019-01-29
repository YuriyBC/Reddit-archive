import constants from './constants';

const {
    WEBSOCKET_URL,
} = constants;

export const webSocketService = function () {
    if (!webSocketService.websocket) {
        webSocketService.websocket = new WebSocket(WEBSOCKET_URL);
    }
    return webSocketService.websocket;
};
