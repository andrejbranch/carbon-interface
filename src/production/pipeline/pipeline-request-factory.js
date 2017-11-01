angular.module('production.pipeline.pipelineRequestFactory', [])

    .factory('pipelineRequestFactory', ['gridColumnFactory', 'gridFilterFactory', '$location',

        function (gridColumnFactory, gridFilterFactory, $location) {

            var PipelineRequest = function () {

                this.hashId = this.generateHashId();

                this.name = null;

                this.type = null;

                this.element = null;

                this.stepIndex = null;

                this.isLinking = false;

                this.pathLinks = [];

                this.request = null;

                this.inputRequests = [];

            };

            PipelineRequest.prototype = {

                generateHashId: function () {

                    function guid() {

                        function s4() {
                            return Math.floor((1 + Math.random()) * 0x10000)
                                .toString(16)
                                .substring(1)
                            ;
                        }

                        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                    };

                    return guid();

                },

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

                addPathLink: function (pathLink, toRequest) {

                    var link = {
                        svgEl: pathLink,
                        toRequest: toRequest
                    };

                    this.pathLinks.push(link);

                    toRequest.inputRequests.push(this.hashId);

                    return this;
                },

                clearPaths: function () {

                    var that = this;

                    angular.forEach(this.pathLinks, function (pathLink) {
                        pathLink.svgEl.remove();
                        pathLink.toRequest.inputRequests.splice(pathLink.toRequest.inputRequests.indexOf(that.request.hashId), 1);
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
