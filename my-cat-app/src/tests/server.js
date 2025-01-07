import { setupServer } from 'msw/node';
import  { http, HttpResponse } from 'msw';

export function createServer() {
  const handlers = [
    http.get('*/breeds', () => HttpResponse.json([
        {
          name: 'Abyssinian',
        },
        {
          name: 'Burmese',
        }
      ])
    ),
    http.get('*/images/search', ({ request }) => {
      const url = new URL(request.url);
      const limit = url.searchParams.get('limit');

      if (limit == 10) {
        return HttpResponse.json([
            { url: 'https://cdn2.thecatapi.com/images/1co.png', id: 1 },
            { url: 'https://cdn2.thecatapi.com/images/2co.png', id: 2 },
            { url: 'https://cdn2.thecatapi.com/images/3co.png', id: 3 },
            { url: 'https://cdn2.thecatapi.com/images/4co.png', id: 4 },
            { url: 'https://cdn2.thecatapi.com/images/5co.png', id: 5 },
            { url: 'https://cdn2.thecatapi.com/images/6co.png', id: 6 },
            { url: 'https://cdn2.thecatapi.com/images/7co.png', id: 7 },
            { url: 'https://cdn2.thecatapi.com/images/8co.png', id: 8 },
            { url: 'https://cdn2.thecatapi.com/images/9co.png', id: 9 },
            { url: 'https://cdn2.thecatapi.com/images/10co.png', id: 10 },
          ])
      } else {
        const newImages = Array.from({ length: parseInt(limit, 10) }).map((_, index) => ({
          url: `https://cdn2.thecatapi.com/images/${index + 1}co.png`,
          id: index + 1,
        }));
      
        return HttpResponse.json(newImages);
      }
    }),
    http.post('*/favourites', async ({ request }) => {
      const newFavourite = await request.json();
      const image_id = newFavourite.image_id;
      const sub_id = newFavourite.sub_id;

    
      if (image_id && sub_id) {
        return HttpResponse.json({
          message: 'SUCCESS',
          id: image_id,
        });
      }
    }),
    http.get('*/favourites', async () => {
      return HttpResponse.json([
        { id: 1, url: 'https://cdn2.thecatapi.com/images/1co.png' },
        { id: 2, url: 'https://cdn2.thecatapi.com/images/2co.png' },
      ]);
    }),
    http.delete('*/favourites/:id', async ({ params }) => {
      const { id } = params;

      if (id) return HttpResponse.json({ message: 'SUCCESS', id });
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
};