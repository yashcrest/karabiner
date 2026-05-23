#!/bin/bash
# External monitor on the left, MacBook built-in to the right
DISPLAYPLACER=/opt/homebrew/bin/displayplacer
LIST=$($DISPLAYPLACER list)
BUILTIN=$(echo "$LIST" | awk '/^Persistent screen id/{id=$NF} /^Type:.*built in/{print id; exit}')
EXTERNAL=$(echo "$LIST" | awk '/^Persistent screen id/{id=$NF} /^Type:.*external/{print id; exit}')

# Extract the largest available scaled resolution for the built-in display.
# Groups by width (one entry per distinct width, using the tallest height),
# matching the curated resolution tiers macOS shows in Display preferences.
BUILTIN_RES=$(echo "$LIST" | grep -oE 'res:[0-9]+x[0-9]+ hz:[0-9]+ color_depth:8 scaling:on' \
  | grep -oE '[0-9]+x[0-9]+' \
  | sort -u \
  | awk -F x '{ if ($2 > max[$1]) max[$1]=$2 } END { for (w in max) print w"x"max[w] }' \
  | sort -t x -k1,1n \
  | tail -1)

# External is anchored at origin:(0,0) so it remains the main display.
# Built-in origin is translated by (0,+250) to preserve the original relative layout.
$DISPLAYPLACER \
  "id:$EXTERNAL res:2560x1440 hz:60 color_depth:8 enabled:true scaling:on origin:(0,0) degree:0" \
  "id:$BUILTIN res:$BUILTIN_RES hz:120 color_depth:8 enabled:true scaling:on origin:(0,250) degree:0"
