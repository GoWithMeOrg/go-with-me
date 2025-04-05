#!/bin/bash

# Construct the build arguments dynamically
build_args=()
while IFS= read -r line || [[ -n "$line" ]]; do
    # Skip empty lines and comments
    if [[ -z "$line" || "$line" =~ ^# ]]; then
        continue
    fi
    # Ensure the line is in key=value format
    if [[ "$line" =~ ^[^=]+=.* ]]; then
        # Use sed to remove leading/trailing quotes (single or double) from the value part
        # Handles VAR="VALUE", VAR='VALUE', VAR=VALUE
        cleaned_line=$(echo "$line" | sed -E "s/^([^=]+=)[\"'](.*)[\"']$/\\1\\2/")
        build_args+=(--build-arg "$cleaned_line")
    fi
done < .env.local

# Run the podman build command with the constructed arguments
echo "Running Podman build with arguments:"
printf "%s\\n" "${build_args[@]}" # Optional: See the arguments being passed
podman build "${build_args[@]}" -t go-with-me .
