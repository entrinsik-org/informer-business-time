# informer-business-time
Add business time functions to moment.js. They are all revisions of the functions in [moment-business-time](https://www.npmjs.com/package/moment-business-time). They use the locales of the moment rather than the globally set locale for computation.

### Configuration

Specify locales for differing worktime and holiday sets

in config.json:

    "plugins" : {
        "@entrinsik/informer-business-time" : {
          "locales" : [
            {
              "name":"en",
              "workinghours" : {
                "0": null,
                "1": ["00:00:00", "23:59:59"],
                "2": ["00:00:00", "23:59:59"],
                "3": ["00:00:00", "23:59:59"],
                "4": ["00:00:00", "23:59:59"],
                "5": ["00:00:00", "23:59:59"],
                "6": null
              },
              "holidays": [
                "*-05-31",
                "2018-10-31"
              ]
            }
          ]
        }
     }

worktimes:
* null means no hours that day
* otherwise an array with begin and end times, expressed in ISO format

holidays:
* "*-05-31" means every year, 5/31 is a holiday
* the upper bound of the worktimes can not be "24:00:00". The maximum is "23:59:59"

To inherit a locales settings, for instance "en", include

"parentLocale" : "en"

        {
          "name" : "raleigh",
          "parentLocale" : "en",
          "workinghours": {
            "0": null,
            "1": ["00:00:00","23:59:59"],
            "2": ["00:00:00","23:59:59"],
            "3": null,
            "4": ["00:00:00","23:59:59"],
            "5": ["00:00:00","23:59:59"],
            "6": null
          }
        }

### Usage

All the functions in the <i>moment-business-time</i> npm package are exposed with the function name ending with "Local":
<pre>
isWorkingDayLocal
isWorkingTimeLocal
nextWorkingDayLocal
nextWorkingTimeLocal
lastWorkingDayLocal
lastWorkingTimeLocal
addWorkingTimeLocal
subtractWorkingTimeLocal
workingDiffLocal
</pre>

If you want workinghours and holidays other than the default, set the locale on the moment first:

<pre>
const start = moment($record.start);
start.setLocale('raleigh');
</pre>

caling the above *Local functions will preserve the global locale and use the one set on the moment.