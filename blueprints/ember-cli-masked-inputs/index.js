module.exports = {
    normalizeEntityName: function() {},
    afterInstall: function(options) {
        return this.addBowerPackageToProject('jquery.maskedinput', '1.4.1');
    }
};
