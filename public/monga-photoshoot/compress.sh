#!/bin/bash

# Check if ffmpeg is installed
if ! command -v ffmpeg &>/dev/null; then
  echo "ffmpeg is not installed. Please install it and try again."
  exit 1
fi

# Set the directory path
dir_path="."

# Set the compression quality (0-31, lower means better quality but larger file size)
quality=27

# Loop through all jpg files in the directory
for file in "$dir_path"/*.jpg; do
  if [ -f "$file" ]; then
    echo "Compressing $file"

    # Create a temporary file name
    temp_file="${file%.jpg}_temp.jpg"

    # Compress the image
    ffmpeg -i "$file" -q:v $quality "$temp_file"

    # Replace the original file with the compressed one
    mv "$temp_file" "$file"
  fi
done

echo "Compression complete!"
