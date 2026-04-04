#!/bin/bash
# Set MacBook built-in display to small (default scaled) resolution
DISPLAYPLACER=/opt/homebrew/bin/displayplacer
BUILTIN=$($DISPLAYPLACER list | awk '/^Persistent screen id/{id=$NF} /^Type:.*built in/{print id; exit}')
$DISPLAYPLACER "id:$BUILTIN res:1512x982 hz:120 color_depth:8 enabled:true scaling:on origin:(0,0) degree:0"
