export const convertLengthToDuration = (length: string): number => {
  switch (length) {
    case "10 seconds":
      return 10;
    case "15 seconds":
      return 15;
    case "20 seconds":
      return 20;
    case "30 seconds":
      return 30;
    case "1 minute":
      return 60;
    case "1.5 minutes":
      return 90;
    case "2 minutes":
      return 120;
    default:
      return 30; // Default to 30 seconds if no match
  }
};
export const voices = [
  "af_alloy",
  "af_aoede",
  "af_bella",
  "af_heart",
  "af_jadzia",
  "af_jessica",
  "af_kore",
  "af_nicole",
  "af_nova",
  "af_river",
  "af_sarah",
  "af_sky",
  "af_v0",
  "af_v0bella",
  "af_v0irulan",
  "af_v0nicole",
  "af_v0sarah",
  "af_v0sky",
  "am_adam",
  "am_echo",
  "am_eric",
  "am_fenrir",
  "am_liam",
  "am_michael",
  "am_onyx",
  "am_puck",
  "am_santa",
  "am_v0adam",
  "am_v0gurney",
  "am_v0michael",
  "bf_alice",
  "bf_emma",
  "bf_lily",
  "bf_v0emma",
  "bf_v0isabella",
  "bm_daniel",
  "bm_fable",
  "bm_george",
  "bm_lewis",
  "bm_v0george",
  "bm_v0lewis",
  "ef_dora",
  "em_alex",
  "em_santa",
  "ff_siwis",
  "hf_alpha",
  "hf_beta",
  "hm_omega",
  "hm_psi",
  "if_sara",
  "im_nicola",
  "jf_alpha",
  "jf_gongitsune",
  "jf_nezumi",
  "jf_tebukuro",
  "jm_kumo",
  "pf_dora",
  "pm_alex",
  "pm_santa",
  "zf_xiaobei",
  "zf_xiaoni",
  "zf_xiaoxiao",
  "zf_xiaoyi",
  "zm_yunjian",
  "zm_yunxi",
  "zm_yunxia",
  "zm_yunyang"
]
export const allowedRoutes = ["/sign-in", "/sign-up", "/"];