# List of Docker commands

- `docker build -t getting-started .` => This is used to build an image named `getting-started` and `.` specifies that look for `Dockerfile` in current directory
- `docker run -dp 3000:3000 getting-started` => This is used to run a container from an Image
- `docker ps` => This will list all the processes running
- `docker stop <the-container-id>` => This will stop the specified container
- `docker rm <the-container-id>` => This will remove the specified container
- `docker rm -f <the-container-id>` => This will stop and remove the container with the help of force flag.
