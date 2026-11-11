const assert = require("assert");
const yonius = require("yonius");
const headless = require("../..");

describe("API", function() {
    it("should be able to instantiate the API", async () => {
        const api = new headless.API();

        assert.strictEqual(api.baseUrl, "https://headless.bemisc.com/");
        assert.strictEqual(api.key, null);
    });

    it("should be able to instantiate the API with options", async () => {
        const api = new headless.API({
            baseUrl: "https://headless.platforme.com/",
            key: "secret"
        });

        assert.strictEqual(api.baseUrl, "https://headless.platforme.com/");
        assert.strictEqual(api.key, "secret");
    });

    it("should be able to load the configuration", async () => {
        process.env.HEADLESS_BASE_URL = "https://headless.platforme.com/";
        process.env.HEADLESS_KEY = "secret";
        try {
            await headless.API.load();
            const api = new headless.API();

            assert.strictEqual(api.baseUrl, "https://headless.platforme.com/");
            assert.strictEqual(api.key, "secret");
        } finally {
            delete process.env.HEADLESS_BASE_URL;
            delete process.env.HEADLESS_KEY;
            yonius.confS("HEADLESS_BASE_URL", undefined);
            yonius.confS("HEADLESS_KEY", undefined);
        }
    });

    it("should be able to build the request with the key", async () => {
        const api = new headless.API({ key: "secret" });
        const options = { params: {}, headers: { Accept: "application/pdf" } };
        await api.build("GET", api.baseUrl, options);

        assert.deepStrictEqual(options.headers, {
            Accept: "application/pdf",
            "X-Headless-Key": "secret"
        });
    });

    it("should be able to build the request without key", async () => {
        const api = new headless.API();
        const options = { params: {}, headers: { Accept: "application/pdf" } };
        await api.build("GET", api.baseUrl, options);

        assert.deepStrictEqual(options.headers, { Accept: "application/pdf" });
    });

    it("should be able to build the request without params or headers", async () => {
        const api = new headless.API({ key: "secret" });
        let options = { headers: { Accept: "application/pdf" } };
        await api.build("GET", api.baseUrl, options);

        assert.deepStrictEqual(options.headers, {
            Accept: "application/pdf",
            "X-Headless-Key": "secret"
        });

        options = { params: {} };
        await api.build("GET", api.baseUrl, options);

        assert.deepStrictEqual(options.headers, { "X-Headless-Key": "secret" });
    });

    it("should be able to render a page", async () => {
        const api = new headless.API();
        const requests = [];
        const response = Buffer.from("%PDF");
        api.get = async (url, options) => {
            requests.push({ method: "get", url: url, options: options });
            return response;
        };
        const options = { params: { url: "https://example.com/", format: "pdf" } };
        const result = await api.index(options);

        assert.strictEqual(result, response);
        assert.deepStrictEqual(requests, [
            { method: "get", url: "https://headless.bemisc.com/", options: options }
        ]);
    });

    it("should not be able to render a page with an invalid key", async () => {
        const api = new headless.API({ key: "invalid" });
        api.get = async () => {
            const error = new Error("Invalid key");
            error.code = 500;
            throw error;
        };

        await assert.rejects(api.index({ params: { url: "https://example.com/" } }), {
            message: "Invalid key",
            code: 500
        });
    });

    it("should be able to render a posted page", async () => {
        const api = new headless.API();
        const requests = [];
        const response = Buffer.from("%PDF");
        api.post = async (url, options) => {
            requests.push({ method: "post", url: url, options: options });
            return response;
        };
        const options = {
            params: { format: "pdf", prefer_css_page_size: "1" },
            data: "<html></html>",
            mime: "text/html"
        };
        const result = await api.postIndex(options);

        assert.strictEqual(result, response);
        assert.deepStrictEqual(requests, [
            { method: "post", url: "https://headless.bemisc.com/", options: options }
        ]);
    });

    it("should be able to render a put page", async () => {
        const api = new headless.API();
        const requests = [];
        const response = Buffer.from("%PDF");
        api.put = async (url, options) => {
            requests.push({ method: "put", url: url, options: options });
            return response;
        };
        const result = await api.putIndex();

        assert.strictEqual(result, response);
        assert.deepStrictEqual(requests, [
            { method: "put", url: "https://headless.bemisc.com/", options: {} }
        ]);
    });

    it("should be able to get the info", async () => {
        const api = new headless.API({ baseUrl: "https://headless.platforme.com/" });
        const requests = [];
        const response = { name: "hive-headless", version: "0.3.0" };
        api.get = async (url, options) => {
            requests.push({ method: "get", url: url, options: options });
            return response;
        };
        const result = await api.info();

        assert.strictEqual(result, response);
        assert.deepStrictEqual(requests, [
            { method: "get", url: "https://headless.platforme.com/info", options: undefined }
        ]);
    });
});
