#!/bin/sh

# Create an env.js file at runtime
cat <<EOF > /tmp/env.js 
window._env_ = {
  LOCAL: "${LOCAL}",
  SERVER_URL: "${SERVER_URL}"
  HOSTNAME: "${HOSTNAME}"
};
EOF

# Start the web server
exec "$@"
