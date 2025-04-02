#!/bin/sh

# Create an env.js file at runtime
cat <<EOF > /tmp/env.js 
var LOCAL = "${LOCAL}";
var SERVER_URL = "${SERVER_URL}";
var STUDENT_DOMAIN = "${STUDENT_DOMAIN}";
var TEACHER_DOMAIN = "${TEACHER_DOMAIN}";
var EXTENSIONS_ROOT_URL = "${EXTENSIONS_ROOT_URL}";
var EDU_ID = "${EDU_ID}";
var IS_PROD_ENVIRONMENT = "${IS_PROD_ENVIRONMENT}";
var IS_DEMO_ENVIRONMENT = "${IS_DEMO_ENVIRONMENT}";
var IMPORT_BADGE_ALLOWED = "${IMPORT_BADGE_ALLOWED}";
var WELCOME_BADGE_CLASS_NAME = "${WELCOME_BADGE_CLASS_NAME}";
var FEATURES_ENDORSEMENTS = "${FEATURES_ENDORSEMENTS}";
var HOSTNAME = "${HOSTNAME}";
EOF

# Start the web server
exec "$@"
