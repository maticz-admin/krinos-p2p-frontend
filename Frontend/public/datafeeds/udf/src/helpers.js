/**
 * If you want to enable logs from datafeed set it to `true`
 */
var isLoggingEnabled = false;
export function logMessage(message) {
    if (isLoggingEnabled) {
        var now = new Date();
        // tslint:disable-next-line:no-console
    }
}
export function getErrorMessage(error) {
    if (error === undefined) {
        return '';
    }
    else if (typeof error === 'string') {
        return error;
    }
    return error.message;
}
