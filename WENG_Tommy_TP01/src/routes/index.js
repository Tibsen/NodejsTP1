import { home } from './home.js'
import { articles } from "./articles.js";

export async function routes(app) {
  app.get('/', home);
    app.get('/hello', (request,reply) => {
      const message = request.query.name
      ? `Hello ${request.query.name}`
      : 'Hello world';

      reply.send({message});
    } );

    const messageSchema = {
      body: {
          type: 'object',
          properties: {
              message: { type: 'string' },
              random: { type: 'string' },
          },
          required: ['message'],
          additionalProperties: false,
      },
  }
    app.post('/message', { schema: messageSchema }, (req, reply) => {
      const data = req.body
      reply.send({
          message: 'Message received',
          data: data,
      })
  } );
  app.get('/articles', (request,reply) => {
    reply.send(articles);
  } );

  const schemaArticles = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
        additionalProperties: false,
    },
  }

  app.get('/articles/:id', { schema: schemaArticles }, (req, reply) => {
    const id = req.params.id;
    const article = articles.find((x) => x.id === id);
    if (!article) {
        return reply.code(404).send({ error: `Article ${req.params.id} not found` });
    }
    reply.send(article);
  });

  const schemaPost = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
        },
        required: ['title'],
        additionalProperties: false,
    },
  }
  app.post('/articles', { schema: schemaPost }, (req, reply) => {
    reply.code(201).send({ message: 'Article created' });
  });

  app.delete('/articles/:id', { schema: schemaArticles }, (req, reply) => {
  const id = req.params.id;
  const article = articles.find((x) => x.id === id);
  if (!article) {
    return reply.code(404).send({ error: `Article ${req.params.id} not found` });
  }
  reply.code(200).send({ message: "Article deleted" });
  });
}