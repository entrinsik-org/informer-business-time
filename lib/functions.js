'use strict';

const moment = require('moment-business-time');


const preserveLocale = function(locale, fn) {
    if(!locale)
        return fn();
    const origLocale = moment.locale();
    moment.locale(locale);
    try {
        return fn();
    } finally {
        moment.locale(origLocale);
    }
};

moment.fn.isWorkingDayLocal = function() {
    return preserveLocale(this.locale(), () => this.isWorkingDay());
};

moment.fn.isWorkingTimeLocal = function() {
    return preserveLocale(this.locale(), () => this.isWorkingTime());
};

moment.fn.nextWorkingDayLocal = function() {
    return preserveLocale(this.locale(), () => this.nextWorkingDay());
};

moment.fn.nextWorkingTimeLocal = function() {
    return preserveLocale(this.locale(), () => this.nextWorkingTime());
};

moment.fn.lastWorkingDayLocal = function() {
    return preserveLocale(this.locale(), () => this.lastWorkingDay());
};

moment.fn.lastWorkingTimeLocal = function() {
    return preserveLocale(this.locale(), () => this.lastWorkingTime());
};

moment.fn.addWorkingTimeLocal = function() {
    return preserveLocale(this.locale(), () => this.addWorkingTime.apply(this, arguments));
};

moment.fn.subtractWorkingTimeLocal = function() {
    return preserveLocale(this.locale(), () => this.subtractWorkingTime.apply(this, arguments));
};

moment.fn.workingDiffLocal = function() {
    //if arg[0] isn't a moment, return null
    if(!moment.isMoment(arguments[0])) return null;
    return preserveLocale(this.locale(), () => this.workingDiff.apply(this, arguments));
};

module.exports = moment;
