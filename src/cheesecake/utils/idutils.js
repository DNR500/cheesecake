require.def('redbuttonhtml/appui/components/cheesecake/utils/idutils',
    [],
    function () {
        'use strict';

        var createId = function (args) {
            return args.join('-');
        };

        return {
            createIdGenerator: function (label) {
                var base = {
                    "label": label,
                    "index": 0
                };
                return function (prefix) {
                    return createId([prefix, base.label, base.index++]);
                };
            }
        };
    }
);