# Project Parts

- **Frontend**
- **Backend**
- **MongoDB**

# Important Files

## In Backend Folder:

- **Dockerfile**:  
  This file is used for creating the backend image. Commands for building the image are provided at the end of the Dockerfile.
- **start.sh**:  
  Contains two important commands:
  1. Setting up the database.
  2. Starting the backend.

## In Frontend Folder:

- **Dockerfile**:  
  This file is used for creating the frontend image. Commands for building the image are provided at the end of the Dockerfile.  
  _Note: The `npm run dev` command is used._

### Additional Files:

- **Dockerfile_for_developer_mode**:  
  Currently, this is the same as the Dockerfile.

- **Dockerfile_for_serving_build**:  
  This file creates an image by simply copying the `dist` folder and serving it on an NGINX server.

- **Dockerfile_creating_and_serving_build**:  
  This file creates an image by copying the entire source code, creating a build from the source code, and then serving it through an NGINX server.

## At the Root:

- **docker-compose.yml**:  
  Uses images created by the Dockerfiles in the backend and frontend. It will automatically pull the MongoDB image, or you can do it manually.  
  _Note: Currently, its content and `docker-compose_Addedfrontend.yml` content are the same._  
  Use `docker-compose up` to build and start containers.  
  Use `docker-compose down` to destroy containers.

- **docker-compose_noFrontEnd.yml**:  
  This is similar to the above, with the only difference being that it does not use a frontend image.  
  It is dependent on the backend and MongoDB.

# Notes

- Most commands, such as creating or running images for the frontend/backend, are given in their respective Dockerfiles at the end as comments (starting with `#`).
- In `backend/src/dataBaseSetUp/dbSetup.js`, check the connection string at line 14.
- In `backend/src/constants.js`, line 3, I've added `mongo` in the connection string, so create containers named `mongo` or add your MongoDB container name here.
- In the frontend, changes have been made in `vite.config.js` to serve at `0.0.0.0` in the Docker container.
- For additional command references, check `DockerCommands.docx`.

# Getting Started

1. **Start with `docker-compose up`:**

   - First, create images using the Dockerfiles.
   - Then use `docker-compose up`.
   - Check containers and connectivity.
   - You can now use `docker-compose down`.

2. **Use `--link` Method:**

   - You can find its commands in `DockerCommands.docx`.
   - After using `docker-compose down`, start the MongoDB container manually.
   - Use the link command for the backend container.
   - Check communication.
   - You can now start the frontend container if desired.

3. **Use Network Method:**
   - Find references to commands in `DockerCommands.docx`.
   - Create a network.
   - Create a MongoDB container in that network.
   - Create a Node.js backend container in that network.
   - Check the connection, then start your frontend container.
