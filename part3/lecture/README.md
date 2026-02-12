## MongoDB
I met some problem when I try to connect MongoDB Atlas for network reason, so I use docker instead. 


### Install and configurate
```zsh
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
newgrp docker
```

### Create and run docker container
```zsh
docker run -d -p 27017:27017 --name my-mongo mongo:latest
```
Run docker without `-v` because there's no need to save data

### Run mongosh commands
```zsh
docker exec -it my-mongo mongosh
```