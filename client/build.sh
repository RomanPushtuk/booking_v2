#!/bin/bash

npm run build || { echo "Build error in client"; exit 1; }
