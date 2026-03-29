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
    // displayPlacer
    d: {
      hyphen: shell`opt/homebrew/bin/displayplacer "id:37D8832A-2D66-02CA-B9F7-8F30A301B230 res:1800x1169 hz:120 color_depth:8 enabled:true scaling:on origin:(0,0) degree:0"`,
      equal_sign: shell`opt/homebrew/bin/displayplacer "id:37D8832A-2D66-02CA-B9F7-8F30A301B230 res:1512x982 hz:120 color_depth:8 enabled:true scaling:on origin:(0,0) degree:0"`,
      //   using displayPlacer - to put mac display to left of monitor
      h: shell`/opt/homebrew/bin/displayplacer "id:3993FF47-D1E4-4B4F-9D9E-CBB603251FEC res:2560x1440 hz:60 color_depth:8 enabled:true scaling:on origin:(0,0) degree:0" "id:37D8832A-2D66-02CA-B9F7-8F30A301B230 res:1800x1169 hz:120 color_depth:8 enabled:true scaling:on origin:(0,250) degree:0"`,

      //   to put mac display to bottom of monitor
      j: shell`/opt/homebrew/bin/displayplacer "id:3993FF47-D1E4-4B4F-9D9E-CBB603251FEC res:2560x1440 hz:60 color_depth:8 enabled:true scaling:on origin:(0,0) degree:0" "id:37D8832A-2D66-02CA-B9F7-8F30A301B230 res:1800x1169 hz:120 color_depth:8 enabled:true scaling:on origin:(300,1440) degree:0"`,
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
    },

    // s = "System"
    s: {
      // "D"o not disturb toggle
      d: open(
        `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
      ),
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: open(`-b com.apple.SystemProfiler `),
      p: open(`/System/Library/PreferencePanes/Displays.prefPane`),
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },

      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      // "T"heme
      t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
      c: open("raycast://extensions/raycast/system/open-camera"),
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
      // emo'j'i
      j: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      //   c: open("raycast://extensions/thomas/color-picker/pick-color"),
      //   n: open("raycast://script-commands/dismiss-notifications"),
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
