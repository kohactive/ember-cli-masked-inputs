/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-masked-inputs',
  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/jquery.maskedinput/dist/jquery.maskedinput.min.js');
  }
};
