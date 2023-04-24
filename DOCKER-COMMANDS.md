# List of Docker commands

- `docker build -t getting-started .` => This is used to build an image named `getting-started` and `.` specifies that look for `Dockerfile` in current directory
- `docker run -dp 3000:3000 getting-started` => This is used to run a container from an Image
- `docker ps` => This will list all the processes running
- `docker stop <the-container-id>` => This will stop the specified container
- `docker rm <the-container-id>` => This will remove the specified container
- `docker rm -f <the-container-id>` => This will stop and remove the container with the help of force flag.
- `docker login -u YOUR-USER-NAME` => login using CLI
- `docker tag getting-started YOUR-USER-NAME/getting-started` => renaming image name locally
- `docker push YOUR-USER-NAME/getting-started` => for pushing local repo to remote
- ` docker exec 436c311e1dea cat /data.txt` => `docker exec` will execute the `cat` command in the docker container specified with the id of `436c311e1dea`
- `docker volume create todo-db` => For creating a volume with name `todo-db`
- `docker run -dp 3000:3000 --mount type=volume,src=todo-db,target=/etc/todos getting-started` => This is used to run a container associated with a volume
- `docker volume inspect todo-db` => This provides information for a volume.
