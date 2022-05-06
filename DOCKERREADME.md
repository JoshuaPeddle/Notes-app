
<h4> Repo description </h4>
This small repo documents my process for building cross-platform ExpressJS Docker containers. I do this fairly often so it should be kept fairly up to date.
<br>
The code contained in this repo is a barebones-nodejs app with a dockerfile. I use this to ensure buildx is working. The app has a single route that sends "Hello World" to localhost:8080.
<br>
I mainly use this process when developing express apps on amd64 and deploying them to arm64 and arm/v7 for use on Raspberry Pi.


<h4> Buildx setup </h4> 
Buildx can only build mono-platform builds with the default driver. 
The code below creates and loads a new driver.
If you have already created the builder, load it with <code>docker buildx use mybuilder</code>. 

    docker buildx create --name mybuilder
    docker buildx use mybuilder
    docker buildx inspect --bootstrap

More documentation: https://www.docker.com/blog/multi-arch-images/

This custom builder retains most syntax and functionality from the default builder. You can still use it to do single-platform builds.

    docker buildx use mybuilder
    docker buildx build  --platform linux/arm64 -t {docker-username}/express-docker-arm64:1.0 --push .
    ...
    => pushing {docker-username}/express-docker-arm64:1.0 with docker  


<h4> Cross-platform build </h4>

With the custom builder loaded, we can supply a list of architectures to ```--platform args```.


    docker buildx build  --platform linux/amd64,linux/arm64 -t {docker-username}/express-docker-amd_arm64:1.0  --push .
    ...
    => pushing manifest for docker.io/{docker-username}/express-docker-amd_arm64:1.0

<h4> Testing deployment on 64-bit Raspberry Pi 4 (linux/arm64) </h4>

    sudo docker run -p 8080:8080 --platform linux/arm64 docker.io/{docker-username}/express-docker-amd_arm64:1.0

    > docker@0.0.0 start
    > node ./bin/www

    Listening on port 8080


<h4> Testing deployment on 32-bit Raspberry Pi 4 (linux/arm/v7) </h4>
New build command with  <code>linux/arm/v7</code> platform added

    $ docker buildx build  --platform linux/amd64,linux/arm64,linux/arm/v7 -t {docker-username}/express-docker-amd_arm_arm64:1.0  --push . 

Success on 32-bit raspberry pi

    $ sudo docker run -p 8080:8080 --platform linux/arm/v7 docker.io/{docker-username}/express-docker-amd_arm_arm64:1.0
     ...
    Status: Downloaded newer image for {docker-username}/express-docker-amd_arm_arm64:1.0

    > docker@0.0.0 start
    > node ./bin/www

    Listening on port 8080



<h4> Neofetch from Raspberry Pi used in testing </h4>

![](neo.png)

    

    



Sources:
https://fireship.io/lessons/docker-basics-tutorial-nodejs/
https://www.docker.com/blog/multi-arch-images/