export MASTODON_ACCESS_TOKEN="fBhBZrZfSbfaRphVYRtkUei-bq0p-gQRV5jvO72d0MQ"
                                                  
export URL='https://mastodon.au/api/v1'

# curl --header "Authorization: Bearer ${MASTODON_ACCESS_TOKEN=}" \
#   -XGET \
#   -vvv \
#   -G \
#   --data-urlencode "q=covid19" \
#   "https://mastodon.au/api/v2/search"