#!/bin/sh
# Downloads case study images from the old Squarespace drafts into public/private/
# (served only after the case study password). Run from the project folder:
#   sh scripts/fetch-squarespace-images.sh
set -e
CDN="https://images.squarespace-cdn.com/content/v1/63e989ba973c5e0fdecdb51d"
get() { curl -fsSL --create-dirs -o "public/private/$2" "$CDN/$1?format=2500w" && echo "saved public/private/$2"; }
get "4d7af9f6-6ba5-4e53-a0bd-b18a25ae5673/Damage+Assessment+section.png" "damage-assessment/damage-assessment-cards.png"
get "933ecf62-56eb-4f74-8fb1-51de9838858f/aadvantage_cash.png" "aadvantage-cash/aadvantage-cash.png"
git add public/private
git commit -q -m "Add case study images from Squarespace" && echo "committed" && git push && echo "pushed: live in about a minute"
