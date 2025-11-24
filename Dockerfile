FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production

FROM nginx:alpine
# Supprimer default config
RUN rm /etc/nginx/conf.d/default.conf
# Copier la config 
COPY nginx.conf /etc/nginx/conf.d/
# (JaxRsUI vs jax-rs-ui)
COPY --from=builder /app/dist/JaxRsUI/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
