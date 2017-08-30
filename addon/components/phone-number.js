import Ember from 'ember';
import MaskedInput from 'ember-cli-masked-inputs/components/masked-input';

export default MaskedInput.extend({
    type: 'tel',
    mask: '999-999-9999'
});
