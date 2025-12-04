FROM node:20

WORKDIR /app

# Copy package files and install deps (use legacy peer deps to avoid ERESOLVE during image build)
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then \
			npm ci --prefer-offline --no-audit --progress=false || npm install --legacy-peer-deps --no-audit --progress=false; \
		else \
			npm install --legacy-peer-deps --no-audit --progress=false; \
		fi

# Copy app sources and build
COPY . .
RUN npm run build

EXPOSE 3000

# Start in production mode
CMD ["npm", "start"]