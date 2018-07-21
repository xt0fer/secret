# Secret

Secret is an open source tool made by privacy freaks for privacy freaks, letting you send AES encrypted notes that will be self-destructed after being read. [Live demo](https://secret.huri.biz)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine

### Using Docker

Clone the repository and navigate into it:

```
git clone https://github.com/1tayH/secret.git && cd secret
```

Build and start the containers:

```
docker-compose up --build
```

Everything should be working now, visit `http://localhost:3000` for the user facing interface

### Backend

this is a simply MongoDB & Express CRUD application, nothing fancy, you **must** have a MongoDB server up and runnning for this.

To get the server up and running, first navigate into the `server` directory:

```
cd server
```

Install the dependencies using `npm`:

```
npm install
```

The application expects several environment variables:

- **PORT** (optional) - to what port port should the application listen take requests on, if not provided the app will listen on port `8080`
- **MONGO_CONNECTION_STRING** - The MongoDB connection string, the database we store notes in

therefore we will export the `MONGO_CONNECTION_STRING` variable and assign it our connection string, **replace** it with your own credentials:

```
export MONGO_CONNECTION_STRING=mongodb://localhost:27017/secret
```

start the server

```
npm run start
```

### Frontend

The client was build using the Vue.js framework Nuxt, more info about SSR and static site generation can be found in [official documentation](https://nuxtjs.org/guide).

Navigate into the `client` directory:

```
cd client
```

Install the dependencies using `npm`:

```
npm install
```

Start the development server:

```
npm run dev
```

## Authors

- **Itay Hury** - _Initial work_ - [1tayH](https://github.com/1tayH)

See also the list of [contributors](https://github.com/1tayH/secret/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
