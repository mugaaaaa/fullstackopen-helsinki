### MongoDB
I met some problem when I try to connect MongoDB Atlas for network reason, so I use docker instead. 

```zsh
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
newgrp docker
```

```zsh
docker run -d -p 27017:27017 --name my-mongo mongo:latest
```