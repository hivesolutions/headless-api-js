import { API as BaseAPI, load, conf } from "yonius";

/**
 * The default base URL to be used in accessing the
 * Headless API infra-structure.
 */
const HEADLESS_BASE_URL = "http://headless.bemisc.com/";

export class API extends BaseAPI {
    constructor(kwargs = {}) {
        super(kwargs);
        this.baseUrl = conf("HEADLESS_BASE_URL", HEADLESS_BASE_URL);
        this.key = conf("HEADLESS_KEY", null);
        this.baseUrl = kwargs.baseUrl === undefined ? this.baseUrl : kwargs.baseUrl;
        this.key = kwargs.key === undefined ? this.key : kwargs.key;
    }

    static async load() {
        await load();
    }

    async build(method, url, options = {}) {
        await super.build(method, url, options);
        options.headers = options.params !== undefined ? options.headers : {};
        if (this.key) {
            options.headers["X-Headless-Key"] = this.key;
        }
    }

    /**
     * Returns a page rendered by Headless.
     *
     * @param {Object} options An object of options to configure the
     * query and its results.
     * @returns {Promise} The page rendering result promise.
     */
    async index(options = {}) {
        const url = this.baseUrl;
        const contents = await this.get(url, options);
        return contents;
    }

    /**
     * Returns a page rendered by Headless, uses POST as method.
     *
     * @param {Object} options An object of options to configure the
     * query and its results.
     * @returns {Promise} The page rendering result promise.
     */
    async postIndex(options = {}) {
        const url = this.baseUrl;
        const contents = await this.post(url, options);
        return contents;
    }

    /**
     * Returns a page rendered by Headless, uses PUT as method.
     *
     * @param {Object} options An object of options to configure the
     * query and its results.
     * @returns {Promise} The page rendering result promise.
     */
    async putIndex(options = {}) {
        const url = this.baseUrl;
        const contents = await this.put(url, options);
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
