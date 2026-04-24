# Holyrics Control App - Makefile

.PHONY: all dev web server build install lint format clean

# Default target
all: dev

# Run both web and server in parallel
dev:
	pnpm dev

# Run only the web application
web:
	pnpm dev:web

# Run only the server application
server:
	pnpm dev:server

# Build everything
build:
	pnpm build

# Install dependencies
install:
	pnpm install

# Run linting
lint:
	pnpm lint

# Run formatting
format:
	pnpm format

# Clean up node_modules and build artifacts
clean:
	find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
	find . -name "dist" -type d -prune -exec rm -rf '{}' +
	find . -name ".turbo" -type d -prune -exec rm -rf '{}' +
