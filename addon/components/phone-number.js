import Ember from 'ember';
import MaskedInput from 'ember-cli-masked-inputs/components/masked-input';

export default MaskedInput.extend({
    type: 'tel',
    mask: '999-999-9999',

    validate: function(strCheck, e) {
        var unicode = e.charCode ? e.charCode : e.keyCode;
        if (strCheck.indexOf(unicode) === -1) {
            e.preventDefault();
        }
    },
    didInsertElement: function() {
        var self = this;
        this.$().mask(this.get('mask'));
        this.$().keypress(function (event) { self.validate('13,48,49,50,51,52,53,54,55,56,57,45', event); });
    }
});
