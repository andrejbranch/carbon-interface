angular.module('sample.sampleRowActionsCtrl', [])

    .controller('sampleRowActionsCtrl', ['$scope', 'sampleFormFactory', '$cbResource', '$state', '$stateParams',

        function ($scope, sampleFormFactory, $cbResource, $state, $stateParams) {

            $scope.editSample = function (sample) {

                sampleFormFactory.openSampleFormModal(sample);

            };

            $scope.receive = sampleFormFactory.openReceiveForm;

            $scope.delete = function (sample)  {
                swal({
                    title: "Are you sure?",
                    text: "You are about to delete sample " + sample.id,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    closeOnConfirm: true
                }, function() {

                    $cbResource.delete('/storage/sample', {'id[EQ]':sample.id}).then(function (response) {
                        $state.go($state.current, $stateParams, {reload:true});
                    });

                });
            }

        }

    ])
;
