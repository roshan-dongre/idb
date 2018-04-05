#bin/bash!
# Requires Docker to be installed

# Stop and remove running container
echo "Removing DB Container..."
docker stop db_container
docker rm db_container
echo "Updating image..."
docker build -t db_image .
docker run --name db_container -d -p 5000:5000 db_image