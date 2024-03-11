const yonius = require("yonius");
const dotenv = require("dotenv");
const headless = require("..");

const hello = async () => {
    await yonius.load();
    const api = new headless.API();
    const result = await api.index();
    console.info(result);
};

dotenv.config();
hello();
