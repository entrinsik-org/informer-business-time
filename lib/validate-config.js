'use strict';

const joi = require('joi');

const timeRegex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;
const holidayWildcardRegex = /^(\*-([01]?[0-9])-([0-3]?[0-9]))$/;

const workingHoursDaySchema = joi.array().items(
    joi.string().regex(timeRegex).required(),
    joi.string().regex(timeRegex).required()
).allow(null);

const workingHoursSchema = {
    0: workingHoursDaySchema,
    1: workingHoursDaySchema,
    2: workingHoursDaySchema,
    3: workingHoursDaySchema,
    4: workingHoursDaySchema,
    5: workingHoursDaySchema,
    6: workingHoursDaySchema,
};

const localeSchema = {
    name: joi.string().required(),
    parentLocale: joi.string(),
    workinghours: joi.object().keys(workingHoursSchema),
    holidays: joi.array().items([joi.string().isoDate(), joi.string().regex(holidayWildcardRegex)]).default([])

};

const opts_schema = {
    locales: joi.array().items(joi.object().keys(localeSchema))
};

module.exports = function(opts) {
    return joi.attempt(opts, opts_schema);
};
