angular.module('production.pipeline.pipelineRequestFormMapping', [])

    .constant('pipelineRequestFormMapping', {
        'DNA': {
            'formFactory': 'dnaProductionFormFactory'
        },
        'Protein': {
            'formFactory': 'proteinProductionFormFactory'
        },
        'Affinity Purification': {
            'formFactory': 'affinityPurificationProductionFormFactory'
        },
        'Size Exclusion Purification': {
            'formFactory': 'sizeExclusionPurificationProductionFormFactory'
        },
        'Native Gel': {
            'formFactory': 'nativeGelProductionFormFactory'
        },
        'Western Gel': {
            'formFactory': 'westernGelProductionFormFactory'
        },
        'SDS Page': {
            'formFactory': 'sdsPageProductionFormFactory'
        },
        'SEC Mals': {
            'formFactory': 'secMalsProductionFormFactory'
        },
        'SPR': {
            'formFactory': 'sprProductionFormFactory'
        }
    })
;

