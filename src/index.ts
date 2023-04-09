import * as oak from "https://deno.land/x/oak/mod.ts";
import downloadRouter from "./modules/Routers/Router.ts";

const app = new oak.Application();
app.use(downloadRouter.routes());
app.use(downloadRouter.allowedMethods());

app.listen({ port: 36000 });