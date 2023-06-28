NOTE : THESE NOTES ARE WRITTEN FROM MY UNDERSTANDING OF DOCKER, OR SOME OF THEM WILL BE COPY PASTED FROM THE RESOURCES I HAVE USED TO UNDERSTAND DOCKER.

How to study from this repo? I will explain the folder structure now, 
- `Tips.md`- Contains the information which I think is useful to summarize the topics
- `DOCKER-COMMANDS.md` - Is the cheatsheet for Docker commands
- `DOCKER-PLAYGROUND` - Contains the information about https://labs.play-with-docker.com
- `README.md` - You can follow this file for main content of the course itself.

# Getting started with docker

- Docker file is like a recipe/set of instructions that is responsible for making a container-image/docker-image
- docker build command will build the docker-image, based on the instructions given in the DOCKERFILE
- 

## What is a container?

- Simply put, a container is a sandboxed process on your machine that is isolated from all other processes on the host machine.
- Is a runnable instance of an image. You can create, start, stop, move, or delete a container using the DockerAPI or CLI.
- Can be run on local machines, virtual machines or deployed to the cloud.
- Is portable (can be run on any OS).
- Is isolated from other containers and runs its own software, binaries, and configurations.
- Each container has independent file system

## What is a container Image?

- When running a container, it uses an isolated filesystem. This custom filesystem is provided by a container image. Since the image contains the container’s filesystem, it must contain everything needed to run an application - all dependencies, configurations, scripts, binaries, etc. The image also contains other configuration for the container, such as environment variables, a default command to run, and other metadata.
- We can push a docker image to the docker registry => `docker push`
- We can pull images from the docker registry => `docker pull`
- Docker registry is a place where all docker images are stored online, anyone can pull images from there.
- One image can have multiple containers


## DOCKERFILE content


```
# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000


```

## Create an Image using `docker build`

- To build a container Image, we need to use a `Dockerfile`. A Dockerfile is simply a text-based file with no file extension that contains a script of instructions. Docker uses this script to build a container image.
- To build a container we need to run this command where the `Dockerfile` is located => `docker build -t getting-started .`
- The `docker build` command uses the Dockerfile to build a new container image.
- `Getting-started` is the name of the image.
- The `.` at the end of the docker build command tells Docker that it should look for the Dockerfile in the current directory.
- You might have noticed that Docker downloaded a lot of “layers”. This is because you instructed the builder that you wanted to start from the node:18-alpine image. But, since you didn’t have that on your machine, Docker needed to download the image.
- After Docker downloaded the image, the instructions from the Dockerfile copied in your application and used yarn to install your application’s dependencies. The CMD directive specifies the default command to run when starting a container from this image.


## Start the app
- Above we created the image using `docker build` command
- Now we can use that Image to run the app in a container
- We will use `docker run` command to do so
- `docker run -dp 3000:3000 getting-started`
- You use the -d flag to run the new container in “detached” mode (in the background). 
- You also use the -p flag to create a mapping between the host’s port 3000 to the container’s port 3000. Without the port mapping, you wouldn’t be able to access the application.

## Conclusion
- In this short section, you learned the basics about creating a Dockerfile to build a container image. Once you built an image, you started a container and saw the running app.

## Persisting data using Volumes
- We can persist data, which can then be used in different containers afterwards
- Create a volume => `docker volume create todo-db`
- Start a container with that volume => `docker run -dp 3000:3000 --mount type=volume,src=todo-db,target=/etc/todos getting-started`
- Get information about a volume=> `docker volume inspect todo-db`
- 
