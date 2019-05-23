import core from '@pluralsight/ps-design-system-core'
import filterReactProps from '@pluralsight/ps-design-system-filter-react-props'
import * as glamor from 'glamor'
import Icon from '@pluralsight/ps-design-system-icon/react'
import PropTypes from 'prop-types'
import React from 'react'
import { withTheme } from '@pluralsight/ps-design-system-theme/react'

import css from '../css/index.js'
import useResizeObserver from './use-resize-observer.js'

const slideAnimationLength = parseInt(core.motion.speedSlow) + 1

const styles = {
  list: ({ themeName }) =>
    glamor.css(
      css['.psds-tab__list'],
      css[`.psds-tab__list.psds-theme--${themeName}`]
    ),
  overflowButton: ({ position, themeName }) =>
    glamor.css(
      css['.psds-tab__overflow-button'],
      css[`.psds-tab__overflow-button--${position}`],
      css[`.psds-tab__overflow-button.psds-theme--${themeName}`],
      css[`.psds-tab__overflow-button--${position}.psds-theme--${themeName}`]
    ),
  overflowButtonIcon: () => glamor.css(css['.psds-tab__overflow-button__icon']),
  slider: () => glamor.css(css['.psds-tab__slider'])
}

const OverflowButton = withTheme(props => {
  const { themeName, ...rest } = props
  return (
    <button {...styles.overflowButton(props)} tabIndex="-1" {...rest}>
      <div {...styles.overflowButtonIcon()}>
        <Icon
          id={
            props.position === 'right'
              ? Icon.ids.caretRight
              : Icon.ids.caretLeft
          }
        />
      </div>
    </button>
  )
})
OverflowButton.propTypes = {
  position: PropTypes.oneOf(['left', 'right'])
}

const findActiveIndex = els =>
  React.Children.toArray(els).findIndex(el => el && el.props.active)

function List(props) {
  const { ref: listRef, width: listWidth } = useResizeObserver()

  const sliderRef = React.useRef()
  const activeIndexFromProps = findActiveIndex(props.children)

  // TODO: likely rename
  const [dims, setDims] = React.useState({
    isOverflowingLeft: false,
    isOverflowingRight: false
  })
  const [xOffset, setXOffset] = React.useState(0)

  const [activeIndex, setActiveIndex] = React.useState(
    activeIndexFromProps > -1 ? activeIndexFromProps : 0
  )
  const itemRefs = React.useMemo(
    _ => React.Children.map(props.children, () => React.createRef()),
    [props.children]
  )
  React.useEffect(
    () => {
      if (activeIndex !== activeIndexFromProps && activeIndexFromProps !== -1)
        setActiveIndex(activeIndexFromProps)
    },
    [activeIndex, activeIndexFromProps]
  )

  React.useEffect(
    () => {
      let timer
      function calcOverflow() {
        timer = setTimeout(() => {
          const sliderWidth = getWidth(sliderRef)
          const isOverflowingRight = sliderWidth + xOffset > listWidth

          const listLeftX = getLeftX(listRef)
          const sliderLeftX = getLeftX(sliderRef)
          const isOverflowingLeft = sliderLeftX + xOffset < listLeftX

          setDims({
            isOverflowingLeft,
            isOverflowingRight
          })
        }, slideAnimationLength)
      }

      calcOverflow()

      return () => {
        clearTimeout(timer)
        timer = null
      }
    },
    [listRef, sliderRef, xOffset, listWidth]
  )

  React.useEffect(
    function recalcSliderPosition() {
      if (xOffset === 0) return

      const sliderWidth = getWidth(sliderRef)
      const sliderDoesntNeedOverflow = listWidth > sliderWidth
      if (sliderDoesntNeedOverflow) {
        setXOffset(0)
      } else {
        const sliderRightX = getRightX(sliderRef)
        const listRightX = getRightX(listRef)
        const overflowedExcessivelyToTheRight = listRightX > sliderRightX
        if (overflowedExcessivelyToTheRight) {
          const sliderWidth = getWidth(sliderRef)
          setXOffset(-1 * sliderWidth + listWidth)
        }
      }
    },
    [listRef, listWidth, xOffset]
  )

  // TODO: try to move most of these out
  function styleForXOffset(xOffset) {
    return { transform: `translateX(${xOffset}px)` }
  }
  function getWidth(ref) {
    if (!(ref && ref.current)) return 0
    const rect = ref.current.getBoundingClientRect()
    return rect.width
  }
  function getLeftX(ref) {
    if (!(ref && ref.current)) return 0
    const rect = ref.current.getBoundingClientRect()
    return window.pageXOffset + rect.left
  }
  // TODO: test if we WANT scroll left worked into this (since always a container)
  function getRightX(ref) {
    if (!(ref && ref.current)) return 0
    const rect = ref.current.getBoundingClientRect()
    return window.pageXOffset + rect.left + rect.width
  }
  function handleListItemClick(i, originalOnClick, evt) {
    setActiveIndex(i)
    if (typeof originalOnClick === 'function') originalOnClick(i, evt)
  }
  function handleKeyDown(evt) {
    if (evt.key !== 'ArrowRight' && evt.key !== 'ArrowLeft') return

    evt.stopPropagation()
    evt.preventDefault()
    const delta = evt.key === 'ArrowRight' ? 1 : -1
    const nextRef = itemRefs[activeIndex + delta]
    if (nextRef && nextRef.current) {
      nextRef.current.focus()
      nextRef.current.click()
    }
  }

  function handlePageLeft(evt) {
    evt.preventDefault()
    const offscreenLeftWidth = getLeftX(listRef) - getLeftX(sliderRef)
    const smallestNeededWidth = Math.min(listWidth, offscreenLeftWidth)
    const lesserXOffset = Math.min(xOffset + smallestNeededWidth, 0)
    setXOffset(lesserXOffset)
  }

  function handlePageRight(evt) {
    evt.preventDefault()
    const sliderWidth = getWidth(sliderRef)
    const maxXOffset = -1 * sliderWidth + listWidth
    const offscreenRightWidth = getRightX(sliderRef) - getRightX(listRef)
    const smallestNeededWidth = Math.min(listWidth, offscreenRightWidth)
    const furtherXOffset = Math.max(xOffset - smallestNeededWidth, maxXOffset)
    setXOffset(furtherXOffset)
  }

  const { children, ...rest } = props
  const listProps = {
    ...rest,
    role: 'tablist',
    onKeyDown: handleKeyDown,
    tabIndex: '0'
  }
  return (
    <div
      {...filterReactProps(listProps)}
      {...styles.list(listProps)}
      ref={listRef}
    >
      {dims.isOverflowingLeft && (
        <OverflowButton position="left" onClick={handlePageLeft} />
      )}
      <div
        {...styles.slider(rest)}
        ref={sliderRef}
        style={styleForXOffset(xOffset)}
      >
        {React.Children.map(
          props.children,
          (comp, i) =>
            comp &&
            React.cloneElement(comp, {
              active: activeIndex === i,
              key: comp.id,
              onClick: evt => handleListItemClick(i, comp.props.onClick, evt),
              ref: itemRefs[i]
            })
        )}
      </div>
      {dims.isOverflowingRight && (
        <OverflowButton position="right" onClick={handlePageRight} />
      )}
    </div>
  )
}
List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}
List.contextTypes = {
  themeName: PropTypes.string
}
export default withTheme(List)
