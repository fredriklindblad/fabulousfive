#!/bin/bash

# Steg 1: Skapa en CORS-fil
echo '[
  {
    "origin": ["*"],
    "method": ["GET"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]' > cors.json

# Steg 2: Sätt CORS på din bucket
echo "⏳ Sätter CORS på din bucket fabulousfive-images..."
gsutil cors set cors.json gs://fabulousfive-images

# Steg 3: Rensa upp
rm cors.json

echo "✅ Klar! CORS är nu aktiverat för fabulousfive-images."
