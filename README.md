# Bom Dia Imagens

This is a project for users to upload and view images. Users can register, authenticate, upload images, view their uploaded images, and search for images. Non-registered users can also view images.

## Technology Stack
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/-Fastify-000000?logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens&logoColor=white)
![Amazon S3](https://img.shields.io/badge/-Amazon%20S3-569A31?logo=amazon-s3&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-4FC08D?logo)
![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/victorcarvalhods/bom-dia-imagens-api.git
```

2. Install dependencies:

```bash
npm install
```

3. Set-up DB container:

```bash
docker-compose up
```

4. Start the Server: 

```bash
npm run dev
```

## Routes

- `POST /users`: Register a new user.
- `POST /auth`: Authenticate a user and return his Auth Token.
- `GET /profile`: Get the profile of the authenticated user.
- `POST /users/images`: Upload an image (authenticated users only).
- `GET /users/:userId/images`: Get all images uploaded by a user (authenticated users only).
- `GET /images`: Search for images.


## Specifications

### Functional Requirements:

- [x] Users should be able to register.
- [x] Users should be able to authenticate.
- [x] Authenticated users should be able to view their profile.
- [x] Users should be able to upload an image.
- [x] Users should be able to view all the images they have uploaded.
- [x] Users should be able to delete an image they have uploaded.
- [x] Users should be able to search for images.
- [x] Non-registered users should be able to view images.

### Non-Functional Requirements:

- [x] User registration should not allow duplicate emails.
- [x] Users should only be able to upload image files.
- [x] Users should be limited to uploading 10 images every 5 minutes.
- [x] User passwords should be encrypted.
- [x] Application data should be persisted in a PostgreSQL database.
- [x] Users should be authenticated using JSON Web Tokens (JWT).
