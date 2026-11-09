# Nginx production image with Let's Encrypt support
FROM nginx:1.27-alpine

# Install certbot for Let's Encrypt certificate management
RUN apk add --no-cache certbot certbot-nginx

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY proxy_params.conf /etc/nginx/proxy_params.conf
# Каталог монтируется в compose; при сборке образа конфиг должен быть внутри.
COPY conf.d/ /etc/nginx/conf.d/

# Create directories for certificates
RUN mkdir -p /etc/nginx/certs /etc/letsencrypt

# Expose ports
EXPOSE 80 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
