### Volumes

- Volumes are used to store data so that container have one source of truth/data.
- Even if a container crashed the data it had would not be gone because it gets stores in the volume if we configure it that way.
- Restarted container can fetch the data from volume and start working again

- We can join a volume to the container with the `-v flag`
- `docker volume create todo-db` => For creating a volume with name `todo-db`
- `docker run -dp 3000:3000 --mount type=volume,src=todo-db,target=/etc/todos getting-started` => This is used to run a container associated with a volume
- `docker volume inspect todo-db` => This provides information for a volume.

### Bind Mounts

- When you use a bind mount, a file or directory on the host machine is mounted into a container. The file or directory is referenced by its absolute path on the host machine.
- By contrast, when you use a volume, a new directory is created within Docker's storage directory on the host machine, and Docker manages that directory's contents.

Running a container with Bind mounts, in which we connect host files with container.

- `docker run -p 80:4000 -v $(pwd):/site bretfisher/jekyll-serve`
- `docker run`: This is the core Docker command used to run a container from a Docker image.
- -p 80:4000: This is an option used to map ports from the host system to the container. It means that port 80 on the host machine will be mapped to port 4000 inside the container. In other words, any traffic coming to port 80 on the host will be directed to port 4000 in the running container. This is commonly used for exposing services running in a container to the host machine or the internet.
- `-v $(pwd):/site`
- This is an option used to create a volume mount between the host system and the container. It allows you to share files and directories between the host and the container. In this case, it's mapping the current working directory ($(pwd)) on the host machine to the /site directory inside the container. This can be useful for sharing code or configuration files with the container.
- bretfisher/jekyll-serve: This is the name of the Docker image that you want to run as a container. In this case, it's pulling an image named bretfisher/jekyll-serve. Docker images are like blueprints for containers, and this image likely contains a setup for serving a Jekyll-based website.
