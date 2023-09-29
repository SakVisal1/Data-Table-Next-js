# Yser oficial nodejs runtime as a parent image
FROM node:18-alpine AS builder

# set app working directory
WORKDIR /app

#copy package.json and package-lock.json file to the container
COPY package*.json ./

# install dependencies the same npm i and install only production dependencies
RUN npm ci --only=production

# Copy the rest
COPY . .

# build app for production with minification
RUN npm run build

# remove dev dependencies
RUN npm prune --production

# using lightweight alpine image for final image
FROM node:18-alpine

# set app working directory /app
WORKDIR /app

# copy the app from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# start the application
CMD ["npm", "start"]
