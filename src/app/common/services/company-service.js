/**
 * @ngdoc service
 * @name just.service.service:companyService
 * @description
 * # companyService
 * Service to handle companies.
 */
angular.module('just.service')
    .service('companyService', ['$q', 'justFlowService', 'authService', 'Resources', 'justRoutes', 'i18nService', '$timeout', function ($q, flow, authService, Resources, routes, i18nService, $timeout) {
        var that = this;

        this.registerModel = {language_id: i18nService.getLanguage().id};
        this.registerMessage = {};

        this.register = function (attributes) {
            that.registerModel = attributes;
            Resources.companies.create({data: {attributes: attributes}}, function (data) {
                flow.next(routes.company.job_create.url, data);
            }, function (error) {
                that.registerMessage = error;
                flow.reload(routes.company.register.url);
            });
        };

        this.choose = function (company) {
            flow.next(routes.company.job_create.url, company);
        };
    }]);