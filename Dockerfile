FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all your project files into the container
COPY . .

# Expose the port for the REST API
EXPOSE 5001

# Run the data_api service
CMD ["python", "data_api.py"]