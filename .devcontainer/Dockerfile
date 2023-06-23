FROM mcr.microsoft.com/devcontainers/base:bullseye

# Install MariaDB client
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
&& curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - \
&& echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list \
&& sudo apt update && sudo apt install -y yarn \
&& apt-get clean -y && rm -rf /var/lib/apt/lists/*
