#### [edubages-ui](#edubages-ui)

# Product Overview

Edubadges is a digital badge platform for educational institutions, built as a web application that allows students and teachers to manage educational credentials and achievements.

## Key Features

- **Student Portal**: Badge collection, enrollment management, direct awards, and collections
- **Teacher Portal**: Badge class creation, user management, award management, and institutional oversight
- **Public Pages**: Public badge verification and institutional profiles
- **Multi-language Support**: English and Dutch localization
- **Role-based Access**: Student, Teacher, and Guest roles with different permissions
- **LTI Integration**: Learning Tools Interoperability support for educational platforms

## User Roles

- **Students**: Manage badge collections, view enrollments, import badges
- **Teachers**: Create and manage badge classes, award badges, manage users and institutions
- **Guests**: Browse public catalog and badge information

## Architecture

Single Page Application (SPA) built with Svelte, communicating with a backend API server for data management and authentication.

## Build Status

[![Build Status](https://travis-ci.com/edubadges/edubadges-ui.svg?branch=master)](https://travis-ci.com/edubadges/edubadges-ui)
[![codecov](https://codecov.io/gh/edubadges/edubadges-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/edubadges/edubadges-ui)

## Development Quickstart

1. Ensure you have docker and docker-compse. Modern docker-desktop provides both for all architectures.
2. Run `docker compose build`
3. Run `docker compose up`

This will:

* install dependencies with yarn only inside of the docker image
* set the configurations right to connect to a edubadges-server running on localhost:8000[^1]
* mount your working directory, with the source code into the container
* run a devserver in the container, with hot reload, logging and exposed on the container expoed port

## Development on local machine

Alternative to Docker is to run it locally on the machine. This requires yarn
and the right nodejs versions (TODO: what are these?)

```
yarn install
yarn dev
```

When you build the bundles using:
```
yarn build
```
It will generate a statistics file: `public/stats.json` which you can use to analyze the bundle:
```
yarn stats
```

## Copyright
Copyright (c) 2020, SURF U.A. Cooperative, Utrecht, The Netherlands
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

[^1]: See https://github.com/edubadges/edubadges-server for how to run the
    server, also with Docker and Docker-compose on this port and host.
