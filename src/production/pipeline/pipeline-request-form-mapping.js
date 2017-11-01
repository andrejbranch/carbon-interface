angular.module('production.pipeline.pipelineRequestFormMapping', [])

    .constant('pipelineRequestFormMapping', {
        'DNA': {
            'formFactory': 'dnaProductionFormFactory'
        },
        'Protein': {
            'formFactory': 'proteinProductionFormFactory'
        },
        'Purification': {
            'formFactory': 'purificationProductionFormFactory'
        },
        'Analysis': {
            'formFactory': 'analysisProductionFormFactory'
        }
    })
;

