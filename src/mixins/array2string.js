export default {
    created: function () {
        console.log('array2string:mixin:created');
    },
    methods: {
        array2string: function (inputArray) {
            if (inputArray !== '_') {
                var toReturn = "";
                inputArray.forEach(item => {
                    toReturn += item + ",";
                });
                return toReturn.substring(0, toReturn.length - 1);
            }
            return inputArray;
        }
    }
};
