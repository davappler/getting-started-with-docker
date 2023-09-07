## Why do we need docker? Why now?

- `Problem of isolation`: We can run different version of same app in different container.
- `Problem of environments`: The number of different types of environments was increasing, need to test the app in all sorts of environments, app might work in one environment but breaks in another. This was solved by docker by introducing the concept of containers and images. Wherever the container is runing, it will be running with same exact dependencies it was built with.
- `Problem of speed`: Speed of business, for delivering apps and ideas.

## What actually happens when we run `docker container run`?

- Looks for the specified image locally in image cache, if it does not find anything then it looks in remote image repository (defaults to docker hub). It will download it from there and store it in the image cache.
- If no version of the image is specified then it will download the latest version of the image.

## How does container run in windows?

- Containers are really just restricted processes running on the OS kernel. The executable files in those containers have to be built for the kernel they are running on. For example, a Python image built for linux/x86_64 won't run as a python.exe on a Windows kernel. This is why Docker Desktop uses a lightweight Linux VM to run your containers.
