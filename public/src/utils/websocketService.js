import constants from './constants';

const {
    WEBSOCKET_URL,
} = constants;

const websocketService = function () {
    if (!websocketService.websocket) {
        websocketService.websocket = new WebSocket(WEBSOCKET_URL);
    }
    return websocketService.websocket;
};

export default websocketService;
