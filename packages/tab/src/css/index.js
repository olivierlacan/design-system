import * as core from '@pluralsight/ps-design-system-core'
import {
  defaultName as themeDefaultName,
  names as themeNames
} from '@pluralsight/ps-design-system-theme'

const listItemText = {
  fontWeight: core.type.fontWeightMedium
}
const listItemTextLightHover = {
  color: core.colorsTextIcon.highOnLight
}
const listItemTextDefaultHover = {
  color: core.colorsTextIcon.highOnDark
}
const listItemTextLightActive = {
  ...listItemText,
  color: core.colorsTextIcon.highOnLight
}
const listItemTextDefaultActive = {
  ...listItemText,
  color: core.colorsTextIcon.highOnDark
}

const listItemBarHover = {
  height: core.layout.spacingXXSmall,
  opacity: 1
}
const listItemBarActive = {
  backgroundColor: core.colorsPrimaryAction.background
}
const listItemBarActiveActive = {
  ...listItemBarActive,
  opacity: 1,
  height: core.layout.spacingXXSmall
}

export default {
  '.psds-tab__list': {
    position: 'relative',
    width: '100%',
    height: '64px',
    overflow: 'hidden',
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(0, 123, 255, .5)'
    }
  },
  [`.psds-tab__list.psds-theme--${themeNames.light}`]: {
    borderBottom: `1px solid ${core.colorsBorder.lowOnLight}`
  },
  [`.psds-tab__list.psds-theme--${themeDefaultName}`]: {
    borderBottom: `1px solid ${core.colorsBorder.lowOnDark}`
  },

  '.psds-tab__slider': {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    height: '64px',
    transform: 'translateX(0)',
    transition: `transform ${core.motion.speedFast} ease-in-out`
  },

  '.psds-tab__overflow-button': {
    position: 'absolute',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    height: 'calc(100% + 1px)',
    width: '64px',
    color: core.colorsTextIcon.highOnLight,
    border: 0,
    zIndex: 1,
    cursor: 'pointer',
    outline: 'none',

    // __icon
    '& > div': {
      background: 'rgba(255, 255, 255, 0.4)'
    },
    '&:hover > div': {
      background: 'rgba(255, 255, 255, 0.7)'
    }
  },
  '.psds-tab__overflow-button--left': {
    left: 0,
    justifyContent: 'flex-start',
    background: `linear-gradient(to left, transparent, ${
      core.colorsBackgroundDark[1]
    } 50%)`,
    paddingLeft: core.layout.spacingMedium
  },
  '.psds-tab__overflow-button--right': {
    right: 0,
    justifyContent: 'flex-end',
    background: `linear-gradient(to right, transparent, ${
      core.colorsBackgroundDark[1]
    } 50%)`,
    paddingRight: core.layout.spacingMedium
  },
  [`.psds-tab__overflow-button.psds-theme--${themeNames.light}`]: {
    color: core.colorsTextIcon.highOnDark,

    // __icon
    '& > div': {
      background: 'rgba(0, 0, 0, 0.4)'
    },
    '&:hover > div': {
      background: 'rgba(0, 0, 0, 0.7)'
    }
  },
  [`.psds-tab__overflow-button--left.psds-theme--${themeNames.light}`]: {
    background: `linear-gradient(to left, transparent, ${
      core.colorsBackgroundLight[3]
    } 50%)`
  },
  [`.psds-tab__overflow-button--right.psds-theme--${themeNames.light}`]: {
    background: `linear-gradient(to right, transparent, ${
      core.colorsBackgroundLight[3]
    } 50%)`
  },

  '.psds-tab__overflow-button__icon': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '32px',
    width: '32px',
    borderRadius: '50%',
    transition: `all ${core.motion.speedFast} ease-in-out`
  },

  // __list-item
  '.psds-tab__list-item': {
    flexShrink: '0',
    height: '100%',
    background: 'none',
    border: 0,
    cursor: 'pointer',
    padding: `0 calc(32px / 2)`,
    textDecoration: 'none',
    maxWidth: '300px',
    '&:focus': {
      outline: 'none'
    },
    '&:first-child': {
      paddingLeft: 0
    },
    // __bar
    '&:hover span, &:focus span': {
      ...listItemBarHover,
      backgroundColor: core.colorsBorder.highOnDark
    },
    '&:active span': listItemBarActive
  },
  [`.psds-tab__list-item.psds-theme--${themeNames.light}`]: {
    color: core.colorsTextIcon.lowOnLight,
    // __bar
    '&:hover span, &:focus span': {
      ...listItemBarHover,
      backgroundColor: core.colorsBorder.highOnLight
    },
    '&:active span': listItemBarActive,
    // __text
    '&:hover div, &:focus div': listItemTextLightHover,
    '&:active': listItemTextLightActive
  },
  [`.psds-tab__list-item.psds-theme--${themeDefaultName}`]: {
    color: core.colorsTextIcon.lowOnDark,
    // __text
    '&:hover div, &:focus div': listItemTextDefaultHover,
    '&:active': listItemTextDefaultActive
  },
  [`.psds-tab__list-item.psds-tab__list-item--active`]: {
    // __span
    '&:active span, &:hover span, &:focus span, & span': listItemBarActiveActive
  },
  [`.psds-tab__list-item.psds-tab__list-item--active.psds-theme--${themeNames.light}`]: {
    // __text
    '&:hover div, &:focus div, & div': listItemTextLightActive
  },
  [`.psds-tab__list-item.psds-tab__list-item--active.psds-theme--${themeDefaultName}`]: {
    // __text
    '&:hover div, &:focus div, & div': listItemTextDefaultActive
  },

  // __list-item__text
  '.psds-tab__list-item__text': {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    fontWeight: core.type.fontWeightBook,
    padding: `0 0 ${core.layout.spacingXXSmall} 0`,
    transition: `color ${core.motion.speedXFast} linear`,
    '&:focus': {
      outline: 'none'
    }
  },
  '.psds-tab__list-item__text-inner': {
    overflow: 'hidden',
    '&:focus': {
      outline: 'none'
    }
  },

  // __list-item__bar
  '.psds-tab__list-item__bar': {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '1px',
    width: '100%',
    display: 'block',
    height: 0,
    opacity: 0,
    transition: `height ${core.motion.speedNormal} ease-in-out, opacity ${core.motion.speedNormal} ease-in-out`
  }
}
