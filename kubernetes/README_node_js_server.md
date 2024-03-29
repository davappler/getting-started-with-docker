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

## Connecting to the service from outside world (Exposing a deployment)

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

```
Note: We make a deployment, then expose it via service to the outside world.
```

- We can connect to the service via the single node minikube created
- `k expose deployment node-js-server --type=NodePort --port=3000`
- After creating a service from the deployment called `node-js-server`
- We can run `minikube service node-js-server` to connect to the pod.

### Creating a loadBalancer service from a deployment

- `kubectl expose deployment node-js-server --type=LoadBalancer --port=3000`
- `kubectl get svc`

```
dsingh@Davinders-MacBook-Pro-2 node-js-server % k get svc
NAME             TYPE           CLUSTER-IP    EXTERNAL-IP   PORT(S)          AGE
kubernetes       ClusterIP      10.96.0.1     <none>        443/TCP          14d
node-js-server   LoadBalancer   10.111.76.0   <pending>     3000:31243/TCP   13s
```

- We see that the External IP is pending, it will remain pending in locally generated minikube.
- When we deploy out app in cloud AWS or GCP, then we will the IP address assigned automatically

### Next step is to deploy a changed image (Rolling updates to the deployed app)

- We will go ahead and change `index.mjs` file
- `docker build . -t davapplerr/node-js-server:2.0.0` => Build the docker image again with a tag of 2.0.0
- `docker login` => Login if logged out in terminal
- `docker push davapplerr/node-js-server:2.0.0` => Push the latest image with a tag pof 2.0.0

```
Note: After pushing the changes, you will see two versions of the same image in your docker hub account.
```

Now we will update the deployment with this new image and see how k8s handles this change.

- `kubectl set image deployment node-js-server node-js-server=davapplerr/node-js-server:2.0.0`
  be ready to enter this command as soon as you enter the above
- `kubectl rollout status deploy node-js-server`

Note: We can go back to older version by running:

- `kubectl set image deployment node-js-server node-js-server=davapplerr/node-js-serve`, which will take it back to the older version.

## Minikube Dashboard

- `minikube dashboard` => Will open the dashboard.

## Declarative approach for creating deployments and services

- We have so far used imperative approach to create deployments and services, but in reality we use declarative approach to do that.
- In declarative approach we have to create YAML configuration files with all the details for the deployment and services we want to run.
- Then we will use kubectl `apply` command to run the configurations we define in the YAML files.

- Documentation for the configuration of Deployment.yaml files can be found here

  - https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/deployment-v1/

- We can run the deployment with this command (In the same directory where deployment.yaml exists or mention the path of the file )
  - `kubectl apply -f deployment.yaml`
- Similary we can run the service:
  - `kubectl apply -f service.yaml`
- Then we can connect to the service with minikube
  - `minikube service node-web-js-server`
- We can delete both deployment and service

  - `kubectl delete -f deployment.yaml -f service.yaml`

- Let's create multiple deployment and connect them to each other, which is a general use-case like connecting Frontend to Backend or Backend to Database service.

## Folder node-js-server-and-nginx



![alt text](../images/two-services.png)


- We have two deployments
  - Web
  - Nginx
- These two deployments are located in the K8s cluster
- The service of the `Web` deployment will be of type `LoadBalancer`
- We will be creating two yaml files ( `node-and-nginx.yaml` and `nginx.yaml` ) for deployments and services.
- `node-and-nginx.yaml` will setup our first app node js server that will talk to nginx in the index.mjs file.
- `nginx.yaml` will setup and run our second app, so that it can be reached from the first app.
- after creating the yaml files we can run them like this:
  - `kubectl apply -f node-and-nginx.yaml -f nginx.yaml`
- We can now list the pods and now we can take any pods and run any commands inside of the containers that are in the pods.
- `kubectl get pods` => found this name from the list => `node-js-server-and-nginx-6f88dc74c6-dpdsh`
- `kubectl exec node-js-server-and-nginx-6f88dc74c6-dpdsh -- nslookup nginx` => This means we tried to resolve nginx name from inside of the container that belongs to this pod `node-js-server-and-nginx-6f88dc74c6-dpdsh`.
- So, when you run this command, it will execute nslookup nginx inside the container running in the specified pod (node-js-server-and-nginx-6f88dc74c6-dpdsh).

- We can now check the status of minikub => `minikube status`
- Then we can stop it => `minikube stop`
- Cleaning everything => `minikube delete`
- If you want to start again => `minikube start --driver=docker`
