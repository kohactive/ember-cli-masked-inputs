import Ember from "ember";
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
import lookup from '../helpers/lookup';

var App;

var phone_input = 'input:eq(0)';
var expiration_input = 'input:eq(1)';

module('masked input acceptance tests', {
    setup: function() {
        App = startApp();
    },
    teardown: function() {
        Ember.run(App, App.destroy);
    }
});

test("phone-number test value is bound to passed in value", function() {
    var valid_phone_number = '515-555-5555';
    var controller = lookup('controller:application');
    equal(controller.get('number'), '');
    visit('/');
    fillIn(phone_input, valid_phone_number);
    triggerEvent(phone_input, 'blur');
    andThen(function(){
        equal(controller.get('number'), valid_phone_number);
        equal(find(phone_input).val(), valid_phone_number);
    });
});

test("credit-card-expiration test value is bound to passed in value", function() {
    var valid_expiration = '12/2016';
    var controller = lookup('controller:application');
    equal(controller.get('expiration'), '');
    visit('/');
    fillIn(expiration_input, valid_expiration);
    triggerEvent(expiration_input, 'blur');
    andThen(function(){
        equal(controller.get('expiration'), valid_expiration);
        equal(find(expiration_input).val(), valid_expiration);
    });
});

test("phone-number test", function() {
    visit('/');
    fillIn(phone_input, '515-555');
    triggerEvent(phone_input, 'blur');
    andThen(function(){
        equal(find(phone_input).val(), '');
    });
    fillIn(phone_input, '515-555-5454');
    triggerEvent(phone_input, 'blur');
    andThen(function(){
        equal(find(phone_input).val(), '515-555-5454');
    });
    fillIn(phone_input, '5');
    triggerEvent(phone_input, 'blur');
    andThen(function(){
        equal(find(phone_input).val(), '');
    });
    fillIn(phone_input, '515-555-54546888888809');
    triggerEvent(phone_input, 'blur');
    andThen(function(){
        equal(find(phone_input).val(), '515-555-5454');
    });
    fillIn(phone_input, '515-555-545a4');
    triggerEvent(phone_input, 'blur');
    andThen(function(){
        equal(find(phone_input).val(), '515-555-5454');
    });
    fillIn(phone_input, '515555545abc14');
    triggerEvent(phone_input, 'blur');
    andThen(function(){
        equal(find(phone_input).val(), '515-555-5451');
    });
    fillIn(phone_input, '5-*15-5^*(55545abc14');
    triggerEvent(phone_input, 'blur');
    andThen(function(){
        equal(find(phone_input).val(), '515-555-5451');
    });
});

test("credit-card-expiration test", function() {
    visit('/');
    fillIn(expiration_input, '12/198');
    triggerEvent(expiration_input, 'blur');
    andThen(function(){
        equal(find(expiration_input).val(), '');
    });
    fillIn(expiration_input, '12/1983');
    triggerEvent(expiration_input, 'blur');
    andThen(function(){
        equal(find(expiration_input).val(), '12/1983');
    });
    fillIn(expiration_input, '1');
    triggerEvent(expiration_input, 'blur');
    andThen(function(){
        equal(find(expiration_input).val(), '');
    });
    fillIn(expiration_input, '12/19834567');
    triggerEvent(expiration_input, 'blur');
    andThen(function(){
        equal(find(expiration_input).val(), '12/1983');
    });
    fillIn(expiration_input, '12/198a4');
    triggerEvent(expiration_input, 'blur');
    andThen(function(){
        equal(find(expiration_input).val(), '12/1984');
    });
    fillIn(expiration_input, '121984');
    triggerEvent(expiration_input, 'blur');
    andThen(function(){
        equal(find(expiration_input).val(), '12/1984');
    });
    fillIn(expiration_input, '12/^*(1985');
    triggerEvent(expiration_input, 'blur');
    andThen(function(){
        equal(find(expiration_input).val(), '12/1985');
    });
});

test("allows you to pass in a custom css class attribute", function() {
    visit('/');
    andThen(function(){
        equal(find(phone_input).hasClass('foobar'), true);
        equal(find(phone_input).hasClass('wat'), true);
        equal(find(expiration_input).hasClass('bazz'), true);
    });
});

test("type is set to tel for both components", function() {
    visit('/');
    andThen(function(){
        equal(find(phone_input).attr('type'), 'tel');
        equal(find(expiration_input).attr('type'), 'tel');
    });
});
