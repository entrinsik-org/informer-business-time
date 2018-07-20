'use strict';

const should = require('chai').should();
const config = {
    locales: [
        {
            name: 'en',
            workinghours: {
                0: null,
                1: ['00:00:00', '23:59:59'],
                2: ['00:00:00', '23:59:59'],
                3: ['00:00:00', '13:59:59'],
                4: ['00:00:00', '23:59:59'],
                5: ['00:00:00', '23:59:59'],
                6: null
            },
            holidays: [
                '*-05-31',
                '2018-10-31'
            ]
        },
        {
            name: 'raleigh',
            parentLocale: 'en',
            workinghours: {
                0: null,
                1: [
                    '00:00:00',
                    '23:59:59'
                ],
                2: [
                    '00:00:00',
                    '23:59:59'
                ],
                3: null,
                4: [
                    '05:00:00',
                    '13:59:59'
                ],
                5: [
                    '00:00:00',
                    '23:59:59'
                ],
                6: null
            }
        }
    ]
}


describe('informer-business-time', function () {
    before(function() {
        require('../index').register(null,config,()=>{});
    });
    describe('workingDiffLocal', () => {
        it('should work for default locale', function() {
            const moment = require('moment');
            const start = moment('2018-07-08T20:00');
            const end = moment('2018-07-14T20:00');
            end.workingDiffLocal(start, 'days', true).should.equal(5);
        });
        it('should work for another locale', () => {
            const moment = require('moment');
            const start = moment('2018-07-08T20:00').locale('raleigh');
            const end = moment('2018-07-14T20:00').locale('raleigh');
            end.workingDiffLocal(start, 'days', true).should.equal(4);
            moment.locale().should.equal('en');
        });
        it('should not hang on an invalid comparator', () => {
            const moment = require('moment');
            const start = [moment('2018-07-08T20:00')];
            const end = moment('2018-07-14T20:00');
            should.not.exist(end.workingDiffLocal(start, 'days', true));
            moment.locale().should.equal('en');
        });
        it('should not hang on a null comparator', () => {
            const moment = require('moment');
            const start = null;
            const end = moment('2018-07-14T20:00').locale('raleigh');
            should.not.exist(end.workingDiffLocal(start, 'days', true));
            moment.locale().should.equal('en');
        });
    });
    describe('isWorkingDayLocal', () => {
        it('should work for default locale', function() {
            const moment = require('moment');
            const sun = moment('2018-07-08T20:00');
            const wed = moment('2018-07-11T20:00');
            sun.isWorkingDayLocal().should.be.false;
            wed.isWorkingDayLocal().should.be.true;
        });
        it('should work for another locale', () => {
            const moment = require('moment');
            const sun = moment('2018-07-08T20:00');
            const wed = moment('2018-07-11T20:00');
            sun.locale('raleigh');
            wed.locale('raleigh');
            sun.isWorkingDayLocal().should.be.false;
            wed.isWorkingDayLocal().should.be.false;
        });
        it('should not hang on an invalid locale', () => {
            const moment = require('moment');
            const sun = moment('2018-07-08T20:00');
            const wed = moment('2018-07-11T20:00');
            sun.locale('detroit');
            wed.locale('detroit');
            sun.isWorkingDayLocal().should.be.false;
            wed.isWorkingDayLocal().should.be.true;
        });
        it('should not hang on a null locale', () => {
            const moment = require('moment');
            const sun = moment('2018-07-08T20:00');
            const wed = moment('2018-07-11T20:00');
            sun.locale(null);
            wed.locale(null);
            sun.isWorkingDayLocal().should.be.false;
            wed.isWorkingDayLocal().should.be.true;
        });
    });
    describe('isWorkingTimeLocal', () => {
        it('should work for default locale', function() {
            const moment = require('moment');
            const sun = moment('2018-07-08T20:00');
            const mon = moment('2018-07-09T20:00');
            const wed = moment('2018-07-11T20:00');
            sun.isWorkingTimeLocal().should.be.false;
            wed.isWorkingTimeLocal().should.be.false;
            mon.isWorkingTimeLocal().should.be.true;
        });
        it('should work for another locale', () => {
            const moment = require('moment');
            const sun = moment('2018-07-08T20:00');
            const mon = moment('2018-07-09T20:00');
            const wed = moment('2018-07-11T20:00');
            sun.locale('raleigh');
            wed.locale('raleigh');
            sun.isWorkingTimeLocal().should.be.false;
            wed.isWorkingTimeLocal().should.be.false;
            mon.isWorkingTimeLocal().should.be.true;
        });
        it('should not hang on an invalid locale', () => {
            const moment = require('moment');
            const sun = moment('2018-07-08T20:00');
            const mon = moment('2018-07-09T20:00');
            const wed = moment('2018-07-11T20:00');
            sun.locale('detroit');
            wed.locale('detroit');
            sun.isWorkingTimeLocal().should.be.false;
            wed.isWorkingTimeLocal().should.be.false;
            mon.isWorkingTimeLocal().should.be.true;
        });
        it('should not hang on a null locale', () => {
            const moment = require('moment');
            const sun = moment('2018-07-08T20:00');
            const mon = moment('2018-07-09T20:00');
            const wed = moment('2018-07-11T20:00');
            sun.locale(null);
            wed.locale(null);
            sun.isWorkingTimeLocal().should.be.false;
            wed.isWorkingTimeLocal().should.be.false;
            mon.isWorkingTimeLocal().should.be.true;
        });
    });
    describe('nextWorkingDayLocal', () => {
       it('should work for the default locale', () => {
           const moment = require('moment');
           const sun = moment('2018-07-08T20:00');
           const mon = moment('2018-07-09T20:00');
           (sun.nextWorkingDayLocal().isSame(mon)).should.be.true;
       });
        it('should work for another locale', () => {
            const moment = require('moment');
            const tue = moment('2018-07-10T20:00').locale('raleigh');
            const wed = moment('2018-07-11T20:00').locale('raleigh');
            const thu = moment('2018-07-12T20:00').locale('raleigh');
            (tue.nextWorkingDayLocal().isSame(wed)).should.be.false;
            (tue.nextWorkingDayLocal().isSame(thu)).should.be.true;
        });
    });
    describe('nextWorkingTimeLocal', () => {
        it('should work for the default locale', () => {
            const moment = require('moment');
            const sun = moment('2018-07-08T20:00');
            const mon = moment('2018-07-09T00:00');
            (sun.nextWorkingTimeLocal().isSame(mon)).should.be.true;
        });
        it('should work for another locale', () => {
            const moment = require('moment');
            const wed = moment('2018-07-11T00:00').locale('raleigh');
            const thu = moment('2018-07-12T05:00').locale('raleigh');
            (wed.nextWorkingTimeLocal().isSame(thu)).should.be.true;
        });
    });
    describe('lastWorkingDayLocal', () => {
        it('should work for the default locale', () => {
            const moment = require('moment');
            const fri = moment('2018-07-06T20:00');
            const mon = moment('2018-07-09T20:00');
            (mon.lastWorkingDayLocal().isSame(fri)).should.be.true;
        });
        it('should work for another locale', () => {
            const moment = require('moment');
            const tue = moment('2018-07-10T20:00').locale('raleigh');
            const wed = moment('2018-07-11T20:00').locale('raleigh');
            const thu = moment('2018-07-12T20:00').locale('raleigh');
            (thu.lastWorkingDayLocal().isSame(wed)).should.be.false;
            (thu.lastWorkingDayLocal().isSame(tue)).should.be.true;
        });
    });
    describe('lastWorkingTimeLocal', () => {
        it('should work for the default locale', () => {
            const moment = require('moment');
            const sun = moment('2018-07-08T20:00');
            const fri = moment('2018-07-06T23:59:59');
            (sun.lastWorkingTimeLocal().isSame(fri)).should.be.true;
        });
        it('should work for another locale', () => {
            const moment = require('moment');
            const thu = moment('2018-07-12T00:00').locale('raleigh');
            const tue = moment('2018-07-10T23:59:59').locale('raleigh');
            (thu.lastWorkingTimeLocal().isSame(tue)).should.be.true;
        });
    });
    describe('addWorkingTimeLocal', () => {
        it('should work for days', () => {
            const moment = require('moment');
            const tue = moment('2018-07-10T20:00').locale('raleigh');
            const fri = moment('2018-07-13T20:00').locale('raleigh');
            (tue.addWorkingTimeLocal(2,'day').isSame(fri)).should.be.true;
        });
        it('should work for hours', () => {
            const moment = require('moment');
            const tue = moment('2018-07-10T20:00').locale('raleigh');
            const thu = moment('2018-07-12T07:00:01').locale('raleigh');
            (tue.addWorkingTimeLocal(6, 'hours').isSame(thu,'minute')).should.be.true;
        });
    });
    describe('subtractWorkingTimeLocal', () => {
        it('should work for days', () => {
            const moment = require('moment');
            const tue = moment('2018-07-10T20:00').locale('raleigh');
            const fri = moment('2018-07-13T20:00').locale('raleigh');
            (fri.subtractWorkingTimeLocal(2,'day').isSame(tue)).should.be.true;
        });
        it('should work for hours', () => {
            const moment = require('moment');
            const tue = moment('2018-07-10T20:00').locale('raleigh');
            const thu = moment('2018-07-12T07:00:01').locale('raleigh');
            (thu.subtractWorkingTimeLocal(6, 'hours').isSame(tue,'minute')).should.be.true;
        });
    });


});