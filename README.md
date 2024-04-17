# Sustainability Kiosks ![Frontend Status](https://github.com/OSU-Sustainability-Office/sustainability-kiosks/actions/workflows/gh-deploy.yml/badge.svg) ![Test Build Status](https://github.com/OSU-Sustainability-Office/energy-dashboard/actions/workflows/test-build-s3.yml/badge.svg)

Content designed for large-format touchscreens in high-traffic locations on OSU's campus.

## Site URLs

- Production Deployment URL: https://osu-sustainability-office.github.io/sustainability-kiosks/#/
- Test Deployment URL: http://sustainability-kiosks.s3-website-us-west-2.amazonaws.com/#/

## Site Setup

- Installing Dependencies
  - `npm i`
- Run website locally
  - `npm run serve`
  - If you want to test with the same fonts locally as production, make adjustments to font URL prefixes as noted in the `@font-face` section of [src/App.vue](https://github.com/OSU-Sustainability-Office/sustainability-kiosks/blob/master/src/App.vue)
- Formatting
  - `npm run format`
