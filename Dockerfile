# Production build
FROM node:20 AS build

WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .

ARG VITE_API_BASE
RUN echo ">>> VITE_API_BASE is $VITE_API_BASE"
ENV VITE_API_BASE=$VITE_API_BASE

RUN npm run build

# Production image
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
