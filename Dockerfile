FROM node:16.17.0

# Create app directories
RUN mkdir -p /usr/src/app /f2b/
WORKDIR /usr/src/app

# Copy app source and build it
COPY . .
RUN npm i
RUN npm run build

# Expose port
EXPOSE 3000

# Maptiler API key
ENV MAPTILER_APIKEY=""

# Start app
CMD [ "node", "build/index.js" ]