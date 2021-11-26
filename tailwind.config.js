module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "wave-pattern": "url('./bg/wave.svg')",
        "wave-log-sec": "url('./bg/wave_log_sec.svg')",
        "wave-log-tert": "url('./bg/wave_log_tert.svg')",
        "wave-register-pattern": "url('./bg/wave_register.svg')",
        "wave-register-pattern-sec": "url('./bg/wave_reg_sec.svg')",
        "wave-reg-tert": "url('./bg/wave_reg_tert.svg')",
      },
      colors: {
        main: "#424b54",
        secondary: {
          light: "#E8C4CB",
          DEFAULT: "#e2b4bd",
          dark: "#D18998",
        },
        logo: "#9b6a6c",
        bg_login: "#f8edeb",
        tertiary: "#6d6875",
        no_acc: {
          DEFAULT: "#ffddd2",
          light: "#FFF0EB",
        },
        wave_col: "#EAC8C3",
        friends_post: "#f4a261",
      },
    },
  },
  variants: {
    scrollbar: ["rounded"],
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
