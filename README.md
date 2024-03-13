# Payment App

Intialise node.js backend

    npm init
    npm install express

Intialise React frontend

    npm create vite@latest

Dockerfile

    FROM mongo:4.4.7
    RUN echo "rs.initiate();" > /docker-entrypoint-initdb.d/replica-init.js
    CMD [ "--replSet", "rs" ]

Build Dockerfile

    docker build -t mongodb .

Run Docker image

    docker run --name mongodb -p 27017:27017 -d mongodb

Open mongodb compass and connect

    mongodb://localhost:27017


