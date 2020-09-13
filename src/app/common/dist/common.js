"use strict";
exports.__esModule = true;
exports.getStatus = void 0;
function getStatus(elem) {
    if (!elem) {
        return 'Unknown';
    }
    else {
        if (elem >= -200 && elem <= 200) {
            return 'On Time';
        }
        else if (elem < -200) {
            return 'Early';
        }
        else if (elem > 200) {
            return 'Late';
        }
    }
}
exports.getStatus = getStatus;
