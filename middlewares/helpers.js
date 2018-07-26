module.exports = {
    clone: function (val) {
        return JSON.parse(JSON.stringify(val));
    }
}