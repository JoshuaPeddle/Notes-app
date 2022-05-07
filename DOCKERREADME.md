

<h4> Buildx setup </h4> 
Buildx can only build mono-platform builds with the default driver. 
The code below creates and loads a new driver.
If you have already created the builder, load it with <code>docker buildx use mybuilder</code>. 

    docker buildx create --name mybuilder
    docker buildx use mybuilder
    docker buildx inspect --bootstrap

More documentation: https://www.docker.com/blog/multi-arch-images/

<h4> Cross-platform build </h4>

With the custom builder loaded, we can supply a list of architectures to ```--platform args```.

    docker buildx build  --platform linux/amd64,linux/arm64 -t {docker-username}/express-docker-amd_arm64:1.0  --push .
    ...
    => pushing manifest for docker.io/{docker-username}/express-docker-amd_arm64:1.0

