# Build Stage
FROM node:20.11.1 as build

ARG VITE_API_URL

ENV VITE_ENV=$VITE_API_URL

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Production Stage
FROM nginx:1.25.4

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
