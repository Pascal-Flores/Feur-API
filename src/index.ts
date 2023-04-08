import * as oak from "https://deno.land/x/oak/mod.ts";
import { Body } from "https://deno.land/x/oak@v12.1.0/body.ts";
import FullMangaRequestSanitizer from "./modules/Sanitizers/FullMangaRequestSanitizer.ts";
import InvalidRequestError from "./modules/Errors/InvalidRequestError.ts";

const router = new oak.Router();

router.post("/download/full-manga/", async (ctx) => {
    const body : Body = ctx.request.body();
    const values = await body.value;

    if (!values) {
        ctx.response.status = 400;
        ctx.response.body = "Invalid request";
        return;
    }

    try {
        const sanitizedRequest = FullMangaRequestSanitizer.sanitize(values);
    }
    catch (error) {
        ctx.response.status = 400;
        ctx.response.body = error.message;
        return;
    }

    

});

const app = new oak.Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 36000 });