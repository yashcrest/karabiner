#!/bin/bash
# Set MacBook built-in display to small (default scaled) resolution.
# If an external display is connected, keep it as the main display (origin 0,0)
# and preserve the current relative arrangement of the built-in display.
DISPLAYPLACER=/opt/homebrew/bin/displayplacer
BUILTIN_RES="1440x900"
HERTZ=60

LIST=$($DISPLAYPLACER list)

BUILTIN=$(echo "$LIST" | awk '/^Persistent screen id/{id=$NF} /^Type:.*built in/{print id; exit}')
EXTERNAL=$(echo "$LIST" | awk '/^Persistent screen id/{id=$NF} /^Type:.*external/{print id; exit}')

get_origin() {
  echo "$LIST" | awk -v target="$1" '
    /^Persistent screen id/ { id=$NF }
    /^Origin:/ && id==target {
      match($0, /\(-?[0-9]+,-?[0-9]+\)/)
      s=substr($0, RSTART+1, RLENGTH-2)
      split(s, a, ",")
      print a[1], a[2]
      exit
    }'
}

if [ -n "$EXTERNAL" ]; then
  read EX EY <<< "$(get_origin "$EXTERNAL")"
  read BX BY <<< "$(get_origin "$BUILTIN")"
  EX=${EX:-0}; EY=${EY:-0}; BX=${BX:-0}; BY=${BY:-0}
  NBX=$((BX - EX))
  NBY=$((BY - EY))
  $DISPLAYPLACER \
    "id:$EXTERNAL res:2560x1440 hz:$HERTZ color_depth:8 enabled:true scaling:on origin:(0,0) degree:0" \
    "id:$BUILTIN res:$BUILTIN_RES hz:$HERTZ color_depth:8 enabled:true scaling:on origin:($NBX,$NBY) degree:0"
else
  $DISPLAYPLACER "id:$BUILTIN res:$BUILTIN_RES hz:$HERTZ color_depth:8 enabled:true scaling:on origin:(0,0) degree:0"
fi
