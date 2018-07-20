'use strict';

const _ = require('lodash');
const validateSchema = require('./lib/validate-config');
const moment = require('./lib/functions');

exports.register = function (server, opts, next) {
    if(opts) {
        opts = validateSchema(opts);
        const locales = opts.locales;
        if (locales) {
            const defaultLocale = moment.locale();
            try {
                _.forEach(locales, function(locale) {
                    //define locales that aren't there, passing in optional 'parentLocale' to get defaults
                    if (!_.includes(moment.locales(), locale.name)) {
                        const { parentLocale } = locale;
                        const initConfig = parentLocale ? { parentLocale:parentLocale } : {};
                        moment.defineLocale(locale.name, initConfig);
                    }
                    //add the workinghours and holidays
                    moment.updateLocale(locale.name, _.omit(locale, 'name'));
                });
            } finally {
                moment.locale(defaultLocale);
            }
        }
    }

  next();
};

exports.register.attributes = { name: 'informer-business-time' };