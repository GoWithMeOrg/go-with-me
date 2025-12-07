# Nginx production image with Let's Encrypt support
FROM nginx:1.27-alpine

# Install certbot for Let's Encrypt certificate management
RUN apk add --no-cache certbot certbot-nginx

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d/default.conf /etc/nginx/conf.d/default.conf

# Create directories for certificates
RUN mkdir -p /etc/nginx/certs /etc/letsencrypt

# Expose ports
EXPOSE 80 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
