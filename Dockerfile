FROM node:12.18.3-alpine AS build-env
WORKDIR /usr/src/app
# Copy package.json and restore as distinct layers
COPY package.json package-lock.json ./
RUN npm install

# Copy everything else and build
COPY . .
RUN npm run build

# Build runtime image
FROM nginx:1.13.9-alpine
# Add new config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build-env /usr/src/app/dist/baypay-stores-panel-web /usr/share/nginx/html

# file path conf/conf.d/default.conf
