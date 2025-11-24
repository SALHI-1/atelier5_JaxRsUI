FROM node:alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ngix.conf /etc/ngix/conf.d
COPY --from=builder /app/dist/jax-rs-ui/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
