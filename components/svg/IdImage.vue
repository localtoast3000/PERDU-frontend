<script>
export default {
  props: {
    className: String,
    scale: {
      type: Number,
      default: 1,
    },
    color: {
      type: String,
      default: "black",
    },
  },
};
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="106 * scale"
    :height="95 * scale"
    viewBox="0 0 106 95"
    :class="className"
    fill="none"
  >
    <rect width="106" height="95" fill="#2F2E41" />
    <g clip-path="url(#clip0_5_437)">
      <path
        d="M52.5625 54.5C59.0525 54.5 64.3125 49.24 64.3125 42.75C64.3125 36.26 59.0525 31 52.5625 31C46.0725 31 40.8125 36.26 40.8125 42.75C40.8125 49.24 46.0725 54.5 52.5625 54.5ZM48.3674 58.9063C39.3254 58.9063 32 66.2316 32 75.2736C32 76.7791 33.2209 78 34.7264 78H70.3986C71.9041 78 73.125 76.7791 73.125 75.2736C73.125 66.2316 65.7996 58.9063 56.7576 58.9063H48.3674Z"
        fill="white"
      />
    </g>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M106 0H0V95H106V0ZM53 77C69.5685 77 83 63.5685 83 47C83 30.4315 69.5685 17 53 17C36.4315 17 23 30.4315 23 47C23 63.5685 36.4315 77 53 77Z"
      fill="#6C63FF"
    />
    <defs>
      <clipPath id="clip0_5_437">
        <rect
          width="41.125"
          height="47"
          fill="white"
          transform="translate(32 31)"
        />
      </clipPath>
    </defs>
  </svg>
</template>
