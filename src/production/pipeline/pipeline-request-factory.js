angular.module('production.pipeline.pipelineRequestFactory', [])

    .factory('pipelineRequestFactory', ['gridColumnFactory', 'gridFilterFactory', '$location',

        function (gridColumnFactory, gridFilterFactory, $location) {

            var PipelineRequest = function () {

                this.name = null;

                this.type = null;

                this.element = null;

                this.stepIndex = null;

                this.isLinking = false;

                this.pathLinks = [];

                this.request = null;

            };

            PipelineRequest.prototype = {

                setName: function (name) {

                    this.name = name;

                    return this;
                },

                setRequest: function (request) {

                    this.request = request;

                    return this;
                },

                setType: function (type) {

                    this.type = type;

                    return this;
                },

                setElement: function (el) {

                    this.element = el;

                    return this;
                },

                setStepIndex: function (stepIndex) {

                    this.stepIndex = stepIndex;

                    return this;
                },

                activateLinking: function () {

                    this.isLinking = true;

                    return this;
                },

                deactivateLinking: function () {

                    this.isLinking = false;

                    return this;
                },

                addPathLink: function (pathLink) {

                    this.pathLinks.push(pathLink);

                    return this;
                },

                clearPaths: function () {

                    angular.forEach(this.pathLinks, function (pathLink) {
                        pathLink.remove();
                    });

                    this.pathLinks = [];

                    return this;
                }

            }

            PipelineRequest.create = function () {

                return new PipelineRequest();

            };

            return PipelineRequest;

        }

    ])
;
