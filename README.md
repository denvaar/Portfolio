# Portfolio site

I'm using Django Rest Framework for the API backend, and React for the front.

Getting this project running is easy to do:

- `docker-compose build`
- `docker-compose up`

Hop into the `server` container and migrate the database:

`django-admin migrate`

Install any fixtures, and create a superuser account for the wonderful Django admin:

`django-admin createsuperuser`

React and API will be running on `localhost:3000` and `localhost:8000`.

## :cat2:

