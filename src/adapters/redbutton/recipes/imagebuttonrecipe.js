require.def('redbuttonhtml/appui/components/cheesecake/adapters/recipes/imagebuttonrecipe',
    [
        "antie/application",
        'redbuttonhtml/appui/widgets/imagebutton',
        'biscuit/helpers/animator',
        'redbuttonhtml/appui/components/cheesecake/utils/recipeutils'
    ],
    function (Application, ImageButton, Animator, recipeUtils) {
        'use strict';



        return function (uniqueId, data, parent) {
            var Metrics = Application.getCurrentApplication().getLayout().metrics;
            var leftAnimationMetrics = Metrics.imageButtonLeft;
            var rightAnimationMetrics = Metrics.imageButtonRight;
            var buttonMetrics = Metrics.imageButton;
            
            var _device = Application.getCurrentApplication().getDevice();
            var _animator = new Animator(_device);

            var _animateButton = function (button, movementOptions, expandOptions) {
                _animator.doAnimation(_animator.TYPE_MOVETO, button, movementOptions);
                _animator.doAnimation(_animator.TYPE_TRANSFORM, button, expandOptions);
            };

            var _swapClasses = function (button, toClass, fromClass) {
                button.removeClass(fromClass);
                button.addClass(toClass);
            };

            var _createAnimationOptions = function (to, from, duration, onComplete) {
                return {
                    to: to,
                    from: from,
                    duration: duration,
                    onComplete: onComplete
                };
            };

            var _expand = function (container, button, sideMetrics) {
                var movementOptions = _createAnimationOptions(sideMetrics.moveTo,
                    sideMetrics.moveFrom, buttonMetrics.animationDuration);
                
                var expandOptions = _createAnimationOptions(buttonMetrics.expandedSize,
                    buttonMetrics.contractedSize, buttonMetrics.animationDuration, function () {
                        _swapClasses(button, 'expanded', 'contracted');
                    });
                _animateButton(button, movementOptions, expandOptions);
            };

            var _contract = function (container, button, sideMetrics) {
                var movementOptions = _createAnimationOptions(sideMetrics.moveFrom,
                    sideMetrics.moveTo, buttonMetrics.animationDuration);

                var expandOptions = _createAnimationOptions(buttonMetrics.contractedSize,
                    buttonMetrics.expandedSize, buttonMetrics.animationDuration, function () {
                        _swapClasses(button, 'contracted', 'expanded');
                    });
                _animateButton(button, movementOptions, expandOptions);
            };

            var _addAnimationListeners = function (parent, button, sideMetric) {
                button.addEventListener('focus', function () {
                    if (button.hasClass('contracted')) {
                        _expand(parent, button, sideMetric);
                    } else {
                        _contract(parent, button, sideMetric);
                        _expand(parent, button, sideMetric);
                    }
                });

                button.addEventListener('blur', function () {
                    if (button.hasClass('expanded')) {
                        _contract(parent, button, sideMetric);
                    }
                });
            };

            var imageButton = new ImageButton(uniqueId + "_mask", data);
            imageButton.addClass("imagebutton");
            recipeUtils.addCssClasses(imageButton, data.cssClasses);

            var sideMetric = leftAnimationMetrics;
            if (imageButton.hasClass("right")) {
                sideMetric = rightAnimationMetrics;
            }

            _addAnimationListeners(parent, imageButton, sideMetric);

            return imageButton;
        };
    }
);