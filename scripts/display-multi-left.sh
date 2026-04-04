#!/bin/bash
# External monitor on the left, MacBook built-in to the right
DISPLAYPLACER=/opt/homebrew/bin/displayplacer
BUILTIN=$($DISPLAYPLACER list | awk '/^Persistent screen id/{id=$NF} /^Type:.*built in/{print id; exit}')
EXTERNAL=$($DISPLAYPLACER list | awk '/^Persistent screen id/{id=$NF} /^Type:.*external/{print id; exit}')
$DISPLAYPLACER \
  "id:$BUILTIN res:1800x1169 hz:120 color_depth:8 enabled:true scaling:on origin:(0,0) degree:0" \
  "id:$EXTERNAL res:2560x1440 hz:60 color_depth:8 enabled:true scaling:on origin:(0,-250) degree:0"
