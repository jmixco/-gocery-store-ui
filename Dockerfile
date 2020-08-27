FROM node:12.18.3-alpine AS build-env
WORKDIR /usr/src/app
#RUN npm install -g @angular/cli
# Copy package.json and restore as distinct layers
COPY package.json package-lock.json ./
RUN npm install

# Copy everything else and build
COPY . .
RUN npm run build

#RUN npm run test-headless

# Build runtime image
FROM nginx:1.13.9-alpine
# Add new config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build-env /usr/src/app/dist/grocery-store-ui /usr/share/nginx/html
#COPY --from=build-env /usr/src/app/junit /usr/test-reports/junit
#COPY --from=build-env /usr/src/app/coverage /usr/test-reports/coverage

# file path conf/conf.d/default.conf
