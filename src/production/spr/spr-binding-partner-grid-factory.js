angular.module('production.spr.sprBindingPartnerGridFactory', [])

    .factory('sprBindingPartnerGridFactory', ['gridFactory', '$cbResource', '$location',

        function (gridFactory, $cbResource, $location) {

            var sprBindingPartnerGridFactory = {

                url: '/production/analysis/spr-request-binding-partner',

                // actionTemplate: 'production/spr/partials/spr-production-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Ligand',
                        bindTo: 'ligand.catalog.name',
                        name: 'ligand',
                        sref: 'sample.detail({id:result.ligand.id})'
                    },
                    {
                        header: 'Analyte',
                        bindTo: 'analyte.catalog.name',
                        name: 'analyte',
                        sref: 'sample.detail({id:result.analyte.id})'
                    },
                    {
                        header: 'Number of Binding Sites',
                        bindTo: 'numBindingSites',
                        name: 'numBindingSites',
                    },
                    {
                        header: 'Ligand MW',
                        bindTo: 'ligandMw',
                        name: 'ligandMw',
                        isSortable: true
                    },
                    {
                        header: 'Analyte MW',
                        bindTo: 'analyteMw',
                        name: 'analyteMw',
                        isSortable: true
                    },
                    {
                        header: 'Analyte Conc.',
                        bindTo: 'analyteConcentration',
                        name: 'analyteConcentration',
                        isSortable: true
                    },
                    {
                        header: 'KOn',
                        bindTo: 'kOn',
                        name: 'kOn',
                        isSortable: true
                    },
                    {
                        header: 'KOff',
                        bindTo: 'kOff',
                        name: 'kOff',
                        isSortable: true
                    },
                    {
                        header: 'KD',
                        bindTo: 'kD',
                        name: 'kD',
                        isSortable: true
                    },
                    {
                        header: 'RMaxFit',
                        bindTo: 'rMaxFit',
                        name: 'rMaxFit',
                        isSortable: true
                    },
                    {
                        header: 'RMaxExp',
                        bindTo: 'rMaxExp',
                        name: 'rMaxExp',
                        isSortable: true
                    },
                    {
                        header: 'RMaxRatio',
                        bindTo: 'rMaxRatio',
                        name: 'rMaxRatio',
                        isSortable: true
                    },
                    {
                        header: 'SignalRatio',
                        bindTo: 'signalRatio',
                        name: 'signalRatio',
                        isSortable: true
                    },
                    {
                        header: 'Chi2',
                        bindTo: 'chi2',
                        name: 'chi2',
                        isSortable: true
                    },
                    {
                        header: 'NormChi2',
                        bindTo: 'normChi2',
                        name: 'normChi2',
                        isSortable: true
                    },
                    {
                        header: 'RMaxEquil',
                        bindTo: 'rMaxEquil',
                        name: 'rMaxEquil',
                        isSortable: true
                    },
                    {
                        header: 'KDEquil',
                        bindTo: 'kDEquil',
                        name: 'kDEquil',
                        isSortable: true
                    },
                    {
                        header: 'RMaxYesNo',
                        bindTo: 'rMax',
                        name: 'rMax',
                        isSortable: true
                    },
                    {
                        header: 'KOnInRange',
                        bindTo: 'kOnInRange',
                        name: 'kOnInRange',
                        isSortable: true
                    },
                    {
                        header: 'KOffInRange',
                        bindTo: 'kOffInRange',
                        name: 'kOffInRange',
                        isSortable: true
                    },
                    {
                        header: 'Capture',
                        bindTo: 'capture',
                        name: 'capture',
                        isSortable: true
                    },
                    {
                        header: 'CurveFit',
                        bindTo: 'curveFit',
                        name: 'curveFit',
                        isSortable: true
                    },
                    {
                        header: 'EquilYesNo',
                        bindTo: 'equil',
                        name: 'equil',
                        isSortable: true
                    },
                    {
                        header: 'KDFix',
                        bindTo: 'kDFix',
                        name: 'kDFix',
                        isSortable: true
                    }
                ],

                filters: [
                ],

                create: function () {

                    return gridFactory.create()
                        .addColumns(this.columns)
                        .addFilters(this.filters)
                        .sortColumn(this.columns[0], 'DESC')
                    ;

                }

            };

            return sprBindingPartnerGridFactory;

        }

    ])
;
