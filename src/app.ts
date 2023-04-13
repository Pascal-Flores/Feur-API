import fastify, { FastifyInstance } from 'fastify';
import download from './routes/download';

function build(opts = {}) : FastifyInstance {
    const app = fastify(opts);

    app.register(download, {prefix : "/download"});

    app.register(require('@fastify/static'), {
        root: process.env.DOWNLOAD_PATH,
        prefix: '/downloaded-manga/', // optional: default '/'
    })

    return app;
}

export default build;