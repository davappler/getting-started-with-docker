## Express server

- This is a very simple express JS server that will send `Hello world`
- You will see we do not need `node_modules` folder here because we will not be running this project locally with node.
- We are using `.mjs` extension in order to use es modules import statements in this project.
- We have created a docker file to create a custom image of our project.

## Building custom image from dockerfile we created

- `docker build . -t davapplerr/node-js-server` => This will build a custom image from the dockerfile present in the directory.
- `docker login` => to login from terminal
- `docker push davapplerr/node-js-server  ` => Then we push the image to docker-hub account

## Creating and exposing deployment using kubectl

- `kubectl create deployment node-js-server --image=davapplerr/node-js-server` => This will start the container from the image.
- `kubectl expose deployment node-js-server --port=3000` => This command is used to expose a Kubernetes deployment named "node-js-server" by creating a Kubernetes Service. The service will make the deployed application accessible within the Kubernetes cluster.
- After running this command, a Kubernetes service will be created, and it will act as a stable endpoint for accessing the pods managed by the "node-js-server" deployment.
- Other parts of your application or other services within the Kubernetes cluster can then communicate with this service using the specified port.
- A Service is a Kubernetes object that exposes a set of Pods to the outside world.
- Once the Service resource is created, Kubernetes will create a LoadBalancer resource to expose the node-js-server deployment to the outside world.
- The LoadBalancer resource will assign an external IP address to the node-js-server deployment and forward traffic from the external IP address to the Pods of the node-js-server deployment.
- To access the Node.js server from outside of the Kubernetes cluster, you can use the external IP address of the LoadBalancer resource and port 3000.

## Connecting to the service from outside world

- `kubectl get services` or `kubectl get svc` => will give the list of services
- We can take the CLUSTER-IP from the above commands print results.
- We will jump into ssh => `minikube ssh`
- Now we are inside of the ssh, we can run `curl CLUSTER-IP:EXPOSED_PORT` of the service we want to curl.
- In my case it was => `curl 10.101.40.196:3000` and it printed the below:
  ```
  docker@minikube:~$ curl 10.101.40.196:3000
  Hello world from the node-js-server-fccdd7d97-k9bzqdocker@minikube:~$
  ```
- 
