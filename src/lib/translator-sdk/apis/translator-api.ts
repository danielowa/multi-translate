/* tslint:disable */
/* eslint-disable */
/**
 * GPT-Translator
 * The GPT translator API description
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { TranslateDto } from '../models';
/**
 * TranslatorApi - axios parameter creator
 * @export
 */
export const TranslatorApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {TranslateDto} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        translatorControllerTranslateText: async (body: TranslateDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling translatorControllerTranslateText.');
            }
            const localVarPath = `/translate`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TranslatorApi - functional programming interface
 * @export
 */
export const TranslatorApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {TranslateDto} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async translatorControllerTranslateText(body: TranslateDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<string>>> {
            const localVarAxiosArgs = await TranslatorApiAxiosParamCreator(configuration).translatorControllerTranslateText(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * TranslatorApi - factory interface
 * @export
 */
export const TranslatorApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {TranslateDto} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async translatorControllerTranslateText(body: TranslateDto, options?: AxiosRequestConfig): Promise<AxiosResponse<string>> {
            return TranslatorApiFp(configuration).translatorControllerTranslateText(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TranslatorApi - object-oriented interface
 * @export
 * @class TranslatorApi
 * @extends {BaseAPI}
 */
export class TranslatorApi extends BaseAPI {
    /**
     * 
     * @param {TranslateDto} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TranslatorApi
     */
    public async translatorControllerTranslateText(body: TranslateDto, options?: AxiosRequestConfig) : Promise<AxiosResponse<string>> {
        return TranslatorApiFp(this.configuration).translatorControllerTranslateText(body, options).then((request) => request(this.axios, this.basePath));
    }
}
