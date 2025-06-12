#!/bin/bash

# Environment setup script for the Task Manager project
# Checks for Node.js and npm, then installs dependencies

set -e

# Verify Node.js is installed
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is not installed." >&2
  exit 1
fi

# Verify npm is installed
if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is not installed." >&2
  exit 1
fi

# Install npm dependencies
npm install

echo "Environment setup complete."
