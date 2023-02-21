const assert = require("assert");
const headless = require("../../types");

describe("API", function() {
    it("should be able to instantiate the API", async () => {
        const api = new headless.API();

        assert.strictEqual(Boolean(api.baseUrl), true);
        assert.strictEqual(api.key, null);
    });
});
