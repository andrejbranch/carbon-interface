angular.module('production.pipeline.pipelineRequestFormMapping', [])

    .constant('pipelineRequestFormMapping', {
        'DNA': {
            'formFactory': 'dnaProductionFormFactory'
        },
        'Protein': {
            'formFactory': 'proteinProductionFormFactory'
        }
    })
;

