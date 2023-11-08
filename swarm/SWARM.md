## Swarm

- Scaling and managing containers is an issue, when the app is scaling
- Maintaining the up time of the website is crucial
- Storing secrets and passwords and getting them to right containers is also a challenge.
- Swarm helps us to manage containers and information that is being passed within the containers and much more.
- Docker has a swarm mode : Built-in orchestration
- Swarm is a server clustering solution
- By default swarm is not enabled for users, you can check it by running `docker info` command.
- You can enable it by running => `docker swarm init`

Some commands

- `docker service create alpine ping 8.8.8.8`
- `docker service ls`
- `docker service ps <name-of-the-service>`
- `docker service update <iD> --replicas 3`
- A replica is a running instance of a service.
- `--replicas 3`: This is an option used to specify the number of replicas you want the service to have after the update. In this case, you are setting the number of replicas to 3. Replicas refer to the number of identical instances of a service that should be running in the Docker Swarm cluster. Setting the replicas to 3 means that you want three instances of the service to be running.
- `docker service ps <SERVICE-ID>` => Will show us the running instances of the service

- A service can have multiple containers, we can take down couple containers down and roll out a update in those containers, this is blue green pattern for updating the app.
- Swarm makes sure that the containers are updated in such a way that the service is constantly available to users.

- Study about blue green deployment pattern.

- running => docker service ps exr8v7tul3rg

```

ID             NAME               IMAGE           NODE             DESIRED STATE   CURRENT STATE           ERROR     PORTS
okdbg7989jfs   blissful_gauss.1   alpine:latest   docker-desktop   Running         Running 8 minutes ago
qboms9ftkobz   blissful_gauss.2   alpine:latest   docker-desktop   Running         Running 3 minutes ago
sqpcwjw7at5n   blissful_gauss.3   alpine:latest   docker-desktop   Running         Running 3 minutes ago
```

- We can remove one container from this, extract container name from `docker container ls`
- `docker container rm -f <CONTAINER-NAME>`
- then `docker service ls` will shows us that only two of three containers are running.

```
ID             NAME             MODE         REPLICAS   IMAGE           PORTS
exr8v7tul3rg   blissful_gauss   replicated   2/3        alpine:latest
```

- If I run `docker service ls` in couple of seconds, we see that again 3/3 are running, swarm is responsible for that.

```
ID             NAME             MODE         REPLICAS   IMAGE           PORTS
exr8v7tul3rg   blissful_gauss   replicated   3/3        alpine:latest
```

This is the responsibility of container orchestration system to make sure that every container is up and running and if there is a failure it recovers from that failure.

- `docker service rm <SERVICE-NAME>` => will remove the service and the containers.
-

## Running swarm in multiple instances

- We have three instances, we can have them by visiting => `https://labs.play-with-docker.com/`
- Let's assume we have three nodes=> node1, node2, node3
-
- we can start the swarm in node1 => `docker swarm init` or `docker swarm init --advertise-addr <IP-ADDRESS>`
- Then a join command will be printed in the console, copy paste that in node2 to join the node2 in the swarm
- If you need the join token at a later time, run this command to get it => `docker swarm join-token manager`

- Then you can make node2 as a manager => `docker node update --role manager node2`
- Now you can run swarm commands in node2, otherwise you would not be able to.
- `docker node ls`=> will list the available nodes
-
