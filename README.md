NOTE : THIS COURSE IS NOT WRITTEN BY A DOCKER EXPERT, THESE ARE THE NOTES THAT I TOOK WHILE LEARNING DOCKER MYSELF. I JUST TURNED IT INTO A SHAPE WHERE ANYONE CAN USE THIS SPACE TO LEARN DOCKER. THESE NOTES ARE WRITTEN FROM MY UNDERSTANDING OF DOCKER, OR SOME OF THEM WILL BE COPY PASTED FROM THE RESOURCES I HAVE USED TO UNDERSTAND DOCKER.

## How to study from this repo? I will explain the folder structure now,

- `Tips.md`- Contains the information which I think is useful to summarize FEW topics
- `DOCKER-COMMANDS.md` - Is the cheatsheet for Docker commands
- `DOCKER-PLAYGROUND` - Contains the information about https://labs.play-with-docker.com
- `README.md` - You can follow this file for main content of the course itself.
- `QUESTIONS.md` - In this file I have written some questions that I had while learning docker.

# Getting started with docker

<!-- Add some general information about docker here, what is docker? why use docker? -->

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
- You also use the -p flag to create a mapping between the host’s port 3000 to the container’s port 3000. Without the port mapping, you wouldn’t be able to access the application. It takes the traffic from 3000 (localhost) to the port 3000 of the container.

## Conclusion

- In this short section, you learned the basics about creating a Dockerfile to build a container image. Once you built an image, you started a container and saw the running app.

## Persisting data using Volumes

- We can persist data, which can then be used in different containers afterwards
- Create a volume => `docker volume create todo-db`
- Start a container with that volume => `docker run -dp 3000:3000 --mount type=volume,src=todo-db,target=/etc/todos getting-started`
- Get information about a volume=> `docker volume inspect todo-db`
-



# Networks

- Run `docker network --help` => to see the list of commands available.
- Run `docker network ls` => Depending on the OS and version of docker we will see either `bridge` or `docker0` network name but they both are same.
- `Bridge/docker0` => is the default network that bridges through the NAT firewall to the physical network that your host is connected to.
- You will also see a `host` network in the list, it is a special network that skips the virtual networking of docker and attaches the container directly to the host interface.

- Creating a new network and attaching container to it
    - `docker network create my_app_net` => We create a new network called `my_app_net`, and by default it will be a `bridge` network which uses the virtual network for containers to talk to host machine.
    - `docker container run -d --name new_nginx --network my_app_net nginx` => We create a new container from `nginx` image and give it a name of `new_nginx` and with the help of `--network` flag we attach it to the `my_app_net` network we created above.
    - `docker network inspect my_app_net ` => Then we can inspect the network and check in the containers field to verify that container has been added to the network.
    - `docker network connect <network-id> <container-id> ` => this will connect that container to the network. 
    - `docker network disconnect <network-id> <container-id> ` => this will disconnect that container from the network. 

- Tips
    - Create your apps so frontend/backend sit on the same docker network
    - Their inter-communication never leaves the host.
    - All externally exposed ports closed by default
    - You must manually expose via `-p`, whicih is better default security.
    - Container should not rely on IP's for inter-communication
    - DNS for friendly names is built-in if you use custom networks
    - It is recommended to make custom networks (This all gets easier with Docker Compose)



### Running bash in the different container with different OS's

- `docker container run --rm -it ubuntu:14.04 bash`
- `docker container run --rm -it centos:7 bash`


### DNS Round Robin testing
- In this we will create multiple containers from a same image and give them a same alias of `search`
- When the containers have same alias of `search` within a network, this will act as DNS Round Robin method.
- Whenever we send multiple request to this alias `search`, the requests will be sent to a different container in random order.
- When same request is handled by different IP addresses, this method is called round robin method, this is a method of load balancing that is used to reduce the load on servers.



- Steps
    - Lets create a network first => `docker network create dude`
    - Let's create a container and attach it to the network we just created:
        - `docker container run -d --net dude --net-alias search elasticsearch:2`
        - FOR ARM64 machines => `docker run -e "discovery.type=single-node" -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" -e "xpack.security.enabled=false" --network dude -d --network-alias search elasticsearch:8.4.3`
        - We should run the above command multiple times to create multiple containers with same alias.
        - `--net dude` This option specifies the network to which the container should be connected.
        - `--net-alias search` This option assigns an alias to the container on the network. In this case, the alias "search" is assigned to the container. This alias can be used by other containers on the same network to communicate with this container.
    - Then we run another alpine container in the same network
        - `docker container run --rm -it --network dude alpine`
        - Now we are in the bash of alpine because we started interactive version with `-it`
        - now if we run `nslookup search` in the bash
        - We get multiple IP addresses linked to "search" alias.
        - The `nslookup` command is a network administration tool used to query the Domain Name System (DNS) to obtain information about DNS records.
        - When you run `nslookup search`, it tries to perform a DNS lookup for the hostname "search".
        - If a matching record is found, `nslookup` displays the IP address of the hostname "search". 
    - Now in the alpine bash, we can go ahead and send some requests to elasticsearch containers
        - `apk add curl` - Run this command within the bash
        - `curl search:9200` - Run this command multiple times and you will see that this request was sent to different `search` containers each time. 
        - You can verify that by checking the `cluster_uuid` from the response of each request.

