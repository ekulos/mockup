/* Navigation marker pattern.
 *
 * This pattern adds ``inPath`` and ``current`` classes to the navigation to
 * allow a different style on selected navigation items or navigation items
 * which are in the current path.
 *
 * This is done in JavaScript, so that the navigation pattern can be cached
 * for the whole site.
 *
 */

define([
    'jquery',
    'pat-base'
], function($, Base) {

    var Navigation = Base.extend({
        name: 'navigationmarker',
        trigger: '.pat-navigationmarker',
        parser: 'mockup',
        init: function() {
            var self = this;
            var href = document.querySelector('head link[rel="canonical"]').href || window.location.href;

            $('a', this.$el).each(function () {
                var navlink = this.href.replace('/view','')
                if (href.indexOf(navlink) !== -1) {
                    var parent = $(this).parent();

                    // check the input-openers within the path
                    var check = parent.find('> input');
                    if (check.length) {
                        check[0].checked = true;
                    }

                    // set "inPath" to all nav items which are within the current path
                    parent.addClass('inPath');
                    // set "current" to the current selected nav item, if it is in the navigation structure.
                    if (href === navlink) {
                        parent.addClass('current');
                    }
                }
            });

            var $el = $('#portal-globalnav > li.has_subtree', self.$el);
            var observer = new IntersectionObserver(function(change) {
                if (change[0].intersectionRatio < 1) {
                    $el.addClass('inverted');
                    console.log('invert ' + change[0].intersectionRatio)
                } else {
                    $el.removeClass('inverted');
                    console.log('invert removed' + change[0].intersectionRatio)
                }
            console.log(change[0].intersectionRatio);
            } );
            $el.each(function () {
                observer.observe(this);
            })
        }
    });

    return Navigation;
});
