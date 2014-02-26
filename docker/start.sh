# Fail fast if anything breaks
set -e

# Build the image
echo "Building image..."
docker build -t tech-radar /vagrant

# Run the image in a container
echo "Starting container..."
CID=$(docker run -d tech-radar:latest)

# Which public port is NATed to my container?
PORT=$(docker port $CID 8080)

# Inform as to where to find the running app
echo "Tech Radar started at http://localhost:$PORT/radar.html"