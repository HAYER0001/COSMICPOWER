#!/usr/bin/env bash
# Optimize all .mp4 files under public/videos for web delivery.
# Usage: bash scripts/optimize-videos.sh [--check-only]

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VIDEOS_DIR="$ROOT/public/videos"
CHECK_ONLY="${1:-}"
TOTAL_ORIG=0
TOTAL_NEW=0

if [ ! -d "$VIDEOS_DIR" ]; then
  echo "No public/videos directory found. Nothing to do."
  exit 0
fi

fmt_size() {
  local b=$1
  if [ "$b" -lt 1024 ]; then echo "${b}B"
  elif [ "$b" -lt 1048576 ]; then echo "$(( (b+512) / 1024 ))KB"
  else echo "$(echo "scale=1; $b / 1048576" | bc -l 2>/dev/null || echo "$(( b / 1048576 ))")MB"
  fi
}

while IFS= read -r -d '' file; do
  rel="${file#$VIDEOS_DIR/}"
  dir="$(dirname "$file")"
  base="$(basename "$file" .mp4)"
  poster="$dir/$base-poster.jpg"

  size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
  TOTAL_ORIG=$((TOTAL_ORIG + size))

  # Extract poster if missing
  if [ ! -f "$poster" ] && [ "$CHECK_ONLY" != "--check-only" ]; then
    ffmpeg -y -i "$file" -vframes 1 -q:v 3 "$poster" 2>/dev/null && \
      echo "  [poster] $rel → $base-poster.jpg"
  fi

  if [ "$CHECK_ONLY" = "--check-only" ]; then
    echo "  $rel — $(fmt_size $size)"
    continue
  fi

  # Re-encode oversized: hero ≤4MB, others ≤2.5MB
  max_size=2621440  # 2.5MB default
  [[ "$rel" == hero* ]] && max_size=4194304  # 4MB for hero

  if [ "$size" -gt "$max_size" ]; then
    tmp="$(mktemp).mp4"
    ffmpeg -y -i "$file" \
      -vf "scale=min(1920,iw):min(1080,ih):force_original_aspect_ratio=decrease" \
      -an -movflags +faststart -crf 26 -preset medium \
      "$tmp" 2>/dev/null && mv "$tmp" "$file"
    newsize=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
    TOTAL_NEW=$((TOTAL_NEW + newsize))
    echo "  [re-encode] $rel — $(fmt_size $size) → $(fmt_size $newsize)"
  else
    TOTAL_NEW=$((TOTAL_NEW + size))
    echo "  [ok] $rel — $(fmt_size $size)"
  fi
done < <(find "$VIDEOS_DIR" -name '*.mp4' -print0)

echo "---"
echo "Total original: $(fmt_size $TOTAL_ORIG)"
echo "Total optimized: $(fmt_size $TOTAL_NEW)"
