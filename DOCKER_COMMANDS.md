# List of Docker commands

- `docker` - Gives the list of available commands
- `docker version` - If the docker is running locally, it will send the version info
- `docker info` - Send the information about docker.
- `docker ps` => This will list all the processes running

# Commands for containers

- `docker run -dp 3000:3000 getting-started` => This is used to run a container from an Image
- `docker container run -dp 3000:3000 getting-started` => Same as above, it just has `container` keyword which is a new way of typing docker commands.
- `docker container run -dp 3000:3000 --name foo getting-started` => This will give the name `myContainer` to the container

- `docker container ls` => This will show the list of running containers.
- `docker container ls -a` => This will show the list of all containers(including stopped containers).
- `docker stop <the-container-id>` => This will stop the specified container.
- `docker container stop <the-container-id>` => Same as above, it just has `container` keyword which is a new way of typing docker commands.
- `docker rm <the-container-id>` => This will remove the specified container from the list (only if the container is stopped otherwise it will not remove a running container).
- `docker rm -f <the-container-id>` => This will stop and remove the container from the list (even if the container is running) with the help of force flag.
- `docker container top foo` => This will show us the list of process running inside the container called `foo`.
- `docker container inspect` => Details of one containers config.
- `docker container stats` => Performance stats for all containers.
- `docker container run -it --name proxy nginx bash` => This will run the container and start an interactive shell (BASH) inside the container.
- `docker container exec` => Does the exact same thing as above (start an interactive shell (BASH) inside the container), it just runs it on running container.
- `docker container start -ai <name-of-the-container>` => This will start an existing container which is probably stopped but not removed from the list.
- `docker container port <name-of-container>` => will tell us the ports of host and the container.

# Commands for Images

- `docker pull <image-name>` => This will download the image from the docker hub registry
- `docker image ls` => displays the list of images
- `docker history <name-of-the-image>` => Will tell us the history about it's image layers.
- `docker image inspect <name-of-the-image>` => will give us the meta data of the image,
- `docker image build -t myFirstImage .` => This will build an image from the dockerfile found in the present directory (That's what the dot . represents in the command)

# Commands for network

- `docker network ls` => List of networks
- `docker network inspect` => List of networks
- `docker network create --driver` =>
- `docker network connect` => 
- `docker network disconnect` => 


# Commands for volumes

- `docker volume ls` - Will list all of the volumes locally
- `docker volume create <name-of-the-volume>` - Will create the volume


# Extra Commands

- `docker build -t getting-started .` => This is used to build an image named `getting-started` and `.` specifies that look for `Dockerfile` in current directory

- `docker login -u YOUR-USER-NAME` => login using CLI
- `docker tag getting-started YOUR-USER-NAME/getting-started` => renaming image name locally
- `docker push YOUR-USER-NAME/getting-started` => for pushing local repo to remote
- ` docker exec 436c311e1dea cat /data.txt` => `docker exec` will execute the `cat` command in the docker container specified with the id of `436c311e1dea`
- `docker volume create todo-db` => For creating a volume with name `todo-db`
- `docker run -dp 3000:3000 --mount type=volume,src=todo-db,target=/etc/todos getting-started` => This is used to run a container associated with a volume
- `docker volume inspect todo-db` => This provides information for a volume.


