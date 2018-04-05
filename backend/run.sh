#bin/bash!
# Requires Docker to be installed
# Will create an image called 'db_image' and run it in container 'db_container'
echo "Building Image..."
docker build -t db_image .
echo "Building Container..."
docker run --name db_container -d -p 5000:5000 db_image