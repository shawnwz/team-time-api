## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Database - Postgres
```shell
docker pull postgres:16.2
docker run -p 2345:5432 --name my_postgres_16_2 -e POSTGRES_PASSWORD=123456 -d postgres:16.2
```

### Prisma client
[doc](https://docs.nestjs.com/recipes/prisma)
### Prisma studio
```shell
npx prisma studio
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
