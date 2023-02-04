### Backend for my website

Server side code for my website. It is a simple blog with a few features.

#### Routes

- `/api/v2/articles` - returns all posts
- `/api/v2/articles/:id` - returns a single post
- `/api/v2/articles?language=english` - returns all posts in english
- `/api/v2/articles?language=english&category=education` - returns all posts in english and education category
- `/api/v2/articles?language=english&category=education&tag=javascript` - returns all posts in english, education category and with javascript tag
- `/api/v2/articles?language=english&category=education&tag=javascript&tag=react` - returns all posts in english, education category and with javascript and react tag
- `/api/v2/articles?sort=+date` - returns all posts sorted by date in ascending order
- `/api/v2/articles?sort=-date` - returns all posts sorted by date in descending order
- `/api/v2/articles?limit=10` - returns 10 posts sorted by date in ascending order
- `/api/v2/articles?limit=10&offset=10` - returns 10 posts sorted by date in ascending order starting from the 11th post



#### Features

- [x] Articles

- [x] Categories

- [x] Tags

- [x] Languages

- [x] Comments

- [x] Users

- [x] Authentication

- [x] Authorization

- [x] Pagination

- [x] Search

- [x] Sorting

- [x] Filtering

#### Technologies

- Node.js

- Express

#### How to run

- `npm install`

- `npm start`

- `npm run dev` - for development

- `npm run test` - for testing

- `npm run lint` - for linting

#### How to deploy

- `npm run build`

- `npm run start:prod`

- `npm run deploy` - for deploying to heroku

Bakcend for my website. It is a simple blog with a few features.
my website: https://www.drako.icu
