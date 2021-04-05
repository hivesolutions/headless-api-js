import { API as BaseAPI, load, conf } from "yonius";

const HEADLESS_BASE_URL = "http://headless.platforme.com/";

export class API extends BaseAPI {
    constructor(kwargs = {}) {
        super(kwargs);
        this.baseUrl = conf("HEADLESS_BASE_URL", HEADLESS_BASE_URL);
        this.token = conf("HEADLESS_TOKEN", null);
        this.baseUrl = kwargs.baseUrl === undefined ? this.baseUrl : kwargs.baseUrl;
        this.token = kwargs.token === undefined ? this.token : kwargs.token;
    }

    static async load() {
        await load();
    }

    async build(method, url, options = {}) {
        await super.build(method, url, options);
        options.headers = options.params !== undefined ? options.headers : {};
        options.kwargs = options.kwargs !== undefined ? options.kwargs : {};
        const auth = options.kwargs.auth === undefined ? true : options.kwargs.auth;
        delete options.kwargs.auth;
        if (auth) {
            options.headers.Authorization = `Bearer ${this.token}`;
        }
    }

    /**
     * Returns a page rendered by Headless.
     *
     * @param {Object} options An object of options to configure the query and
     * its results.
     * @returns {Promise} The page rendering result promise.
     */
    async index(options = {}) {
        const url = this.baseUrl;
        const contents = await this.get(url, options);
        return contents;
    }

    /**
     * Returns a page rendered by Headless.
     *
     * @param {Object} options An object of options to configure the query and
     * its results.
     * @returns {Promise} The page rendering result promise.
     */
    async postIndex(options = {}) {
        const urlParams = new URLSearchParams(options.params);
        const url = `${this.baseUrl}?${urlParams.toString()}`;
        const contents = await this.post(url, { dataJ: options.payload });
        return contents;
    }

    /**
     * Gets the information about Headless, such as version, engines, etc.
     * @returns {Promise} The info result promise.
     */
    async info() {
        const url = this.baseUrl + "info";
        const contents = await this.get(url);
        return contents;
    }
}

export default API;
