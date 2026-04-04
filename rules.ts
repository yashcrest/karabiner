import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      a: app("Activity Monitor"),
      d: app("Discord"),
      g: app("Google Chrome"),
      p: app("Passwords"),
      m: app("Messages"),
      n: app("Notion"),
      s: app("Slack"),
      t: app("Microsoft Teams"),
      w: app("Ghostty"),
      // O`u`tlook
      u: app("Microsoft Outlook"),
      v: app("Visual Studio Code"),
      y: app("Youtube Music"),
      z: app("Zen"),
    },
    // displayPlacer - scripts dynamically detect display IDs at runtime
    d: {
      // built-in only, normal res
      hyphen: shell`~/Developer/karabiner/scripts/display-builtin-normal.sh`,
      // built-in only, small res
      equal_sign: shell`~/Developer/karabiner/scripts/display-builtin-small.sh`,
      // external monitor left, MacBook right
      h: shell`~/Developer/karabiner/scripts/display-multi-left.sh`,
      // external monitor top, MacBook bottom
      j: shell`~/Developer/karabiner/scripts/display-multi-bottom.sh`,
    },

    // w = "Window" via rectangle.app
    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
       // ful'l' screen
      l : {
        description: "Window: Fullscreen",
        to: [
          {
            key_code: "f",
            modifiers: ["left_control", "left_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      // System `i`nfo via System Profiler
      i: open(`-b com.apple.SystemProfiler`),
      p: open(`/System/Library/PreferencePanes/Displays.prefPane`),
      h: {
        to: [
          {
            key_code: "left_arrow",
            modifiers: ["left_control"],
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["left_control"],
          },
        ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: "f", modifiers: ["right_control"] }],
        // TODO: Trigger Vim Easymotion when VSCode is focused
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: "j", modifiers: ["right_control"] }],
      },
      d: {
        to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      //   clip'b'oard
      b: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      // searc'h'
      h: open("raycast://extensions/raycast/file-search/search-files"),
      // emo'j'i
      j: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      k: open("raycast://extensions/raycast/system/toggle-system-appearance"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: true,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
          fn_function_keys: [
            {
              from: { key_code: "f3" },
              to: [{ apple_vendor_top_case_key_code: "illumination_down" }],
            },
            {
              from: { key_code: "f4" },
              to: [{ apple_vendor_top_case_key_code: "illumination_up" }],
            },
          ],
        },
      ],
    },
    null,
    2
  )
);
