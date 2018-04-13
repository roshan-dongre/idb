#bin/bash!
# Requires Docker to be installed

echo "Updating image..."
docker build -t fe_image .
echo "Updating container..."  
docker stop fe_contain 
docker rm fe_contain
echo "Run new container..."
docker run --name fe_contain -it -d -p 80:80 fe_image
echo "Enter Container..."
docker exec -i -t fe_contain /bin/bash