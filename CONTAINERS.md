## What is a container?

- Simply put, a container is a sandboxed process on your machine that is isolated from all other processes on the host machine.
- Is a runnable instance of an image. You can create, start, stop, move, or delete a container using the DockerAPI or CLI.
- Can be run on local machines, virtual machines or deployed to the cloud.
- Is portable (can be run on any OS).
- Is isolated from other containers and runs its own software, binaries, and configurations.
- Each container has independent file system

## IP address
- IP address of the ost machine and IP address of the container is not the same
- You can check it by running commands below :
    - `docker container inspect --format '{{ .NetworkSettings.IPAddress }}' <name-of-container>` => Will return the IP address of the container
    - `ifconfig` => will return the IP address of the host machine.


