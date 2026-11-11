const assert = require("assert");
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
});
