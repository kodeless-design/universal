(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	/*:: import type { Window } from '../types'; */

	/*:: declare function getWindow(node: Node | Window): Window; */
	function getWindow(node) {
	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }

	  return node;
	}

	/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
	  Element); */

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}
	/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
	  HTMLElement); */


	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}
	/*:: declare function isShadowRoot(node: mixed): boolean %checks(node instanceof
	  ShadowRoot); */


	function isShadowRoot(node) {
	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]


	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];

	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}

	function effect(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);

	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }

	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }

	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	// Returns the layout rect of an element relative to its offsetParent. Layout
	// means it doesn't take into account transforms.
	function getLayoutRect(element) {
	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: element.offsetWidth,
	    height: element.offsetHeight
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	      var next = child;

	      do {
	        if (next && parent.isSameNode(next)) {
	          return true;
	        } // $FlowFixMe[prop-missing]: need a better way to handle this...


	        next = next.parentNode || next.host;
	      } while (next);
	    } // Give up, the result is false


	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }

	  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || // DOM Element detected
	    // $FlowFixMe[incompatible-return]: need a better way to handle this...
	    element.host || // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback

	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }

	  var offsetParent = element.offsetParent;

	  if (offsetParent) {
	    var html = getDocumentElement(offsetParent);

	    if (getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && getComputedStyle$1(html).position !== 'static') {
	      return html;
	    }
	  }

	  return offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block


	function getContainingBlock(element) {
	  var currentNode = getParentNode(element);

	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.willChange && css.willChange !== 'auto') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }

	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.


	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);

	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }

	  if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static') {
	    return window;
	  }

	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min, value, max) {
	  return Math.max(min, Math.min(value, max));
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign(Object.assign({}, getFreshSideObject()), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	function arrow(_ref) {
	  var _state$modifiersData$;

	  var state = _ref.state,
	      name = _ref.name;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';

	  if (!arrowElement || !popperOffsets) {
	    return;
	  }

	  var paddingObject = state.modifiersData[name + "#persistent"].padding;
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}

	function effect$1(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options,
	      name = _ref2.name;
	  var _options$element = options.element,
	      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
	      _options$padding = options.padding,
	      padding = _options$padding === void 0 ? 0 : _options$padding;

	  if (arrowElement == null) {
	    return;
	  } // CSS selector


	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);

	    if (!arrowElement) {
	      return;
	    }
	  }

	  if (!contains(state.elements.popper, arrowElement)) {

	    return;
	  }

	  state.elements.arrow = arrowElement;
	  state.modifiersData[name + "#persistent"] = {
	    padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	      y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: Math.round(x * dpr) / dpr || 0,
	    y: Math.round(y * dpr) / dpr || 0
	  };
	}

	function mapToStyles(_ref2) {
	  var _Object$assign2;

	  var popper = _ref2.popper,
	      popperRect = _ref2.popperRect,
	      placement = _ref2.placement,
	      offsets = _ref2.offsets,
	      position = _ref2.position,
	      gpuAcceleration = _ref2.gpuAcceleration,
	      adaptive = _ref2.adaptive,
	      roundOffsets = _ref2.roundOffsets;

	  var _ref3 = roundOffsets ? roundOffsetsByDPR(offsets) : offsets,
	      _ref3$x = _ref3.x,
	      x = _ref3$x === void 0 ? 0 : _ref3$x,
	      _ref3$y = _ref3.y,
	      y = _ref3$y === void 0 ? 0 : _ref3$y;

	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;

	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);

	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

	    /*:: offsetParent = (offsetParent: Element); */


	    if (placement === top) {
	      sideY = bottom;
	      y -= offsetParent.clientHeight - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }

	    if (placement === left) {
	      sideX = right;
	      x -= offsetParent.clientWidth - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }

	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);

	  if (gpuAcceleration) {
	    var _Object$assign;

	    return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }

	  return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}

	function computeStyles(_ref4) {
	  var state = _ref4.state,
	      options = _ref4.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	      _options$adaptive = options.adaptive,
	      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	      _options$roundOffsets = options.roundOffsets,
	      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration
	  };

	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign(Object.assign({}, state.styles.popper), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }

	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign(Object.assign({}, state.styles.arrow), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }

	  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};

	function effect$2(_ref) {
	  var state = _ref.state,
	      instance = _ref.instance,
	      options = _ref.options;
	  var _options$scroll = options.scroll,
	      scroll = _options$scroll === void 0 ? true : _options$scroll,
	      _options$resize = options.resize,
	      resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }

	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }

	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }

	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect$2,
	  data: {}
	};

	var hash = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash[matched];
	  });
	}

	var hash$1 = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	function getBoundingClientRect(element) {
	  var rect = element.getBoundingClientRect();
	  return {
	    width: rect.width,
	    height: rect.height,
	    top: rect.top,
	    right: rect.right,
	    bottom: rect.bottom,
	    left: rect.left,
	    x: rect.left,
	    y: rect.top
	  };
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
	  // can be obscured underneath it.
	  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
	  // if it isn't open, so if this isn't available, the popper will be detected
	  // to overflow the bottom of the screen too early.

	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
	    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
	    // errors due to floating point numbers, so we need to check precision.
	    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
	    // Feature detection fails in mobile emulation mode in Chrome.
	    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
	    // 0.001
	    // Fallback here: "Not Safari" userAgent

	    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }

	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = element.ownerDocument.body;
	  var width = Math.max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = Math.max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;

	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += Math.max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }

	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	      overflow = _getComputedStyle.overflow,
	      overflowX = _getComputedStyle.overflowX,
	      overflowY = _getComputedStyle.overflowY;

	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }

	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }

	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  if (list === void 0) {
	    list = [];
	  }

	  var scrollParent = getScrollParent(element);
	  var isBody = getNodeName(scrollParent) === 'body';
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign(Object.assign({}, rect), {}, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element) {
	  var rect = getBoundingClientRect(element);
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}

	function getClientRectFromMixedType(element, clippingParent) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`


	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

	  if (!isElement(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents


	function getClippingRect(element, boundary, rootBoundary) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent);
	    accRect.top = Math.max(rect.top, accRect.top);
	    accRect.right = Math.min(rect.right, accRect.right);
	    accRect.bottom = Math.min(rect.bottom, accRect.bottom);
	    accRect.left = Math.max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	      element = _ref.element,
	      placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;

	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;

	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;

	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;

	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;

	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }

	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';

	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;

	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }

	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      _options$placement = _options.placement,
	      placement = _options$placement === void 0 ? state.placement : _options$placement,
	      _options$boundary = _options.boundary,
	      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	      _options$rootBoundary = _options.rootBoundary,
	      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	      _options$elementConte = _options.elementContext,
	      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	      _options$altBoundary = _options.altBoundary,
	      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	      _options$padding = _options.padding,
	      padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var referenceElement = state.elements.reference;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
	  var referenceClientRect = getBoundingClientRect(referenceElement);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign(Object.assign({}, popperRect), popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }

	  return overflowOffsets;
	}

	/*:: type OverflowsMap = { [ComputedPlacement]: number }; */

	/*;; type OverflowsMap = { [key in ComputedPlacement]: number }; */
	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      placement = _options.placement,
	      boundary = _options.boundary,
	      rootBoundary = _options.rootBoundary,
	      padding = _options.padding,
	      flipVariations = _options.flipVariations,
	      _options$allowedAutoP = _options.allowedAutoPlacements,
	      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });

	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }

	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}

	function flip(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;

	  if (state.modifiersData[name]._skip) {
	    return;
	  }

	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	      specifiedFallbackPlacements = options.fallbackPlacements,
	      padding = options.padding,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      _options$flipVariatio = options.flipVariations,
	      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	      allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];

	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];

	    var _basePlacement = getBasePlacement(placement);

	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }

	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];

	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }

	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }

	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }

	    checksMap.set(placement, checks);
	  }

	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;

	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);

	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });

	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };

	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);

	      if (_ret === "break") break;
	    }
	  }

	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules


	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }

	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}

	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}

	function hide(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

	  var _ref = typeof offset === 'function' ? offset(Object.assign(Object.assign({}, rects), {}, {
	    placement: placement
	  })) : offset,
	      skidding = _ref[0],
	      distance = _ref[1];

	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}

	function offset(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options,
	      name = _ref2.name;
	  var _options$offset = options.offset,
	      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	      x = _data$state$placement.x,
	      y = _data$state$placement.y;

	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      padding = options.padding,
	      _options$tether = options.tether,
	      tether = _options$tether === void 0 ? true : _options$tether,
	      _options$tetherOffset = options.tetherOffset,
	      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign(Object.assign({}, state.rects), {}, {
	    placement: state.placement
	  })) : tetherOffset;
	  var data = {
	    x: 0,
	    y: 0
	  };

	  if (!popperOffsets) {
	    return;
	  }

	  if (checkMainAxis) {
	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min = popperOffsets[mainAxis] + overflow[mainSide];
	    var max = popperOffsets[mainAxis] - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
	    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }

	  if (checkAltAxis) {
	    var _mainSide = mainAxis === 'x' ? top : left;

	    var _altSide = mainAxis === 'x' ? bottom : right;

	    var _offset = popperOffsets[altAxis];

	    var _min = _offset + overflow[_mainSide];

	    var _max = _offset - overflow[_altSide];

	    var _preventedOffset = within(_min, _offset, _max);

	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	// Composite means it takes into account transforms as well as layout.

	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }

	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement);
	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };

	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }

	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }

	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);

	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }

	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}

	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }

	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign(Object.assign(Object.assign({}, existing), current), {}, {
	      options: Object.assign(Object.assign({}, existing.options), current.options),
	      data: Object.assign(Object.assign({}, existing.data), current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};

	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}

	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }

	  var _generatorOptions = generatorOptions,
	      _generatorOptions$def = _generatorOptions.defaultModifiers,
	      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	      _generatorOptions$def2 = _generatorOptions.defaultOptions,
	      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }

	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign(Object.assign({}, DEFAULT_OPTIONS), defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(options) {
	        cleanupModifierEffects();
	        state.options = Object.assign(Object.assign(Object.assign({}, defaultOptions), state.options), options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned

	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }

	        var _state$elements = state.elements,
	            reference = _state$elements.reference,
	            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {

	          return;
	        } // Store the reference and popper rects to be read by modifiers


	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });

	        for (var index = 0; index < state.orderedModifiers.length; index++) {

	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }

	          var _state$orderedModifie = state.orderedModifiers[index],
	              fn = _state$orderedModifie.fn,
	              _state$orderedModifie2 = _state$orderedModifie.options,
	              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	              name = _state$orderedModifie.name;

	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };

	    if (!areValidElements(reference, popper)) {

	      return instance;
	    }

	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	            _ref3$options = _ref3.options,
	            options = _ref3$options === void 0 ? {} : _ref3$options,
	            effect = _ref3.effect;

	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });

	          var noopFn = function noopFn() {};

	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }

	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }

	    return instance;
	  };
	}
	var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper$2 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var lib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		popperGenerator: popperGenerator,
		detectOverflow: detectOverflow,
		createPopperBase: createPopper,
		createPopper: createPopper$2,
		createPopperLite: createPopper$1,
		top: top,
		bottom: bottom,
		right: right,
		left: left,
		auto: auto,
		basePlacements: basePlacements,
		start: start,
		end: end,
		clippingParents: clippingParents,
		viewport: viewport,
		popper: popper,
		reference: reference,
		variationPlacements: variationPlacements,
		placements: placements,
		beforeRead: beforeRead,
		read: read,
		afterRead: afterRead,
		beforeMain: beforeMain,
		main: main,
		afterMain: afterMain,
		beforeWrite: beforeWrite,
		write: write,
		afterWrite: afterWrite,
		modifierPhases: modifierPhases,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		computeStyles: computeStyles$1,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		offset: offset$1,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1
	});

	/*!
	  * Universal data.js v1.0.0 (undefined)
	  * Copyright 2020-2020 Kodeless Design
	  * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	  */
	var data = createCommonjsModule(function (module, exports) {
	  (function (global, factory) {
	     module.exports = factory() ;
	  })(commonjsGlobal, function () {
	    /**
	     * --------------------------------------------------------------------------
	     * Universal (v1.0.0): dom/data.js
	     * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	     * --------------------------------------------------------------------------
	     */

	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */

	    var mapData = function () {
	      var storeData = {};
	      var id = 1;
	      return {
	        set: function set(element, key, data) {
	          if (typeof element.bsKey === 'undefined') {
	            element.bsKey = {
	              key: key,
	              id: id
	            };
	            id++;
	          }

	          storeData[element.bsKey.id] = data;
	        },
	        get: function get(element, key) {
	          if (!element || typeof element.bsKey === 'undefined') {
	            return null;
	          }

	          var keyProperties = element.bsKey;

	          if (keyProperties.key === key) {
	            return storeData[keyProperties.id];
	          }

	          return null;
	        },
	        delete: function _delete(element, key) {
	          if (typeof element.bsKey === 'undefined') {
	            return;
	          }

	          var keyProperties = element.bsKey;

	          if (keyProperties.key === key) {
	            delete storeData[keyProperties.id];
	            delete element.bsKey;
	          }
	        }
	      };
	    }();

	    var Data = {
	      setData: function setData(instance, key, data) {
	        mapData.set(instance, key, data);
	      },
	      getData: function getData(instance, key) {
	        return mapData.get(instance, key);
	      },
	      removeData: function removeData(instance, key) {
	        mapData.delete(instance, key);
	      }
	    };
	    return Data;
	  });
	});

	/*!
	  * Universal event-handler.js v1.0.0 (undefined)
	  * Copyright 2020-2020 Kodeless Design
	  * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	  */
	var eventHandler = createCommonjsModule(function (module, exports) {
	  (function (global, factory) {
	     module.exports = factory() ;
	  })(commonjsGlobal, function () {
	    /**
	     * --------------------------------------------------------------------------
	     * Universal (v1.0.0): util/index.js
	     * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	     * --------------------------------------------------------------------------
	     */

	    var getjQuery = function getjQuery() {
	      var _window = window,
	          jQuery = _window.jQuery;

	      if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	        return jQuery;
	      }

	      return null;
	    };

	    var isRTL = document.documentElement.dir === 'rtl';
	    /**
	     * --------------------------------------------------------------------------
	     * Universal (v1.0.0): dom/event-handler.js
	     * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	     * --------------------------------------------------------------------------
	     */

	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */

	    var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
	    var stripNameRegex = /\..*/;
	    var stripUidRegex = /::\d+$/;
	    var eventRegistry = {}; // Events storage

	    var uidEvent = 1;
	    var customEvents = {
	      mouseenter: 'mouseover',
	      mouseleave: 'mouseout'
	    };
	    var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
	    /**
	     * ------------------------------------------------------------------------
	     * Private methods
	     * ------------------------------------------------------------------------
	     */

	    function getUidEvent(element, uid) {
	      return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
	    }

	    function getEvent(element) {
	      var uid = getUidEvent(element);
	      element.uidEvent = uid;
	      eventRegistry[uid] = eventRegistry[uid] || {};
	      return eventRegistry[uid];
	    }

	    function universalHandler(element, fn) {
	      return function handler(event) {
	        event.delegateTarget = element;

	        if (handler.oneOff) {
	          EventHandler.off(element, event.type, fn);
	        }

	        return fn.apply(element, [event]);
	      };
	    }

	    function universalDelegationHandler(element, selector, fn) {
	      return function handler(event) {
	        var domElements = element.querySelectorAll(selector);

	        for (var target = event.target; target && target !== this; target = target.parentNode) {
	          for (var i = domElements.length; i--;) {
	            if (domElements[i] === target) {
	              event.delegateTarget = target;

	              if (handler.oneOff) {
	                EventHandler.off(element, event.type, fn);
	              }

	              return fn.apply(target, [event]);
	            }
	          }
	        } // To please ESLint


	        return null;
	      };
	    }

	    function findHandler(events, handler, delegationSelector) {
	      if (delegationSelector === void 0) {
	        delegationSelector = null;
	      }

	      var uidEventList = Object.keys(events);

	      for (var i = 0, len = uidEventList.length; i < len; i++) {
	        var event = events[uidEventList[i]];

	        if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
	          return event;
	        }
	      }

	      return null;
	    }

	    function normalizeParams(originalTypeEvent, handler, delegationFn) {
	      var delegation = typeof handler === 'string';
	      var originalHandler = delegation ? delegationFn : handler; // allow to get the native events from namespaced events ('click.un.button' --> 'click')

	      var typeEvent = originalTypeEvent.replace(stripNameRegex, '');
	      var custom = customEvents[typeEvent];

	      if (custom) {
	        typeEvent = custom;
	      }

	      var isNative = nativeEvents.has(typeEvent);

	      if (!isNative) {
	        typeEvent = originalTypeEvent;
	      }

	      return [delegation, originalHandler, typeEvent];
	    }

	    function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
	      if (typeof originalTypeEvent !== 'string' || !element) {
	        return;
	      }

	      if (!handler) {
	        handler = delegationFn;
	        delegationFn = null;
	      }

	      var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
	          delegation = _normalizeParams[0],
	          originalHandler = _normalizeParams[1],
	          typeEvent = _normalizeParams[2];

	      var events = getEvent(element);
	      var handlers = events[typeEvent] || (events[typeEvent] = {});
	      var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

	      if (previousFn) {
	        previousFn.oneOff = previousFn.oneOff && oneOff;
	        return;
	      }

	      var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
	      var fn = delegation ? universalDelegationHandler(element, handler, delegationFn) : universalHandler(element, handler);
	      fn.delegationSelector = delegation ? handler : null;
	      fn.originalHandler = originalHandler;
	      fn.oneOff = oneOff;
	      fn.uidEvent = uid;
	      handlers[uid] = fn;
	      element.addEventListener(typeEvent, fn, delegation);
	    }

	    function removeHandler(element, events, typeEvent, handler, delegationSelector) {
	      var fn = findHandler(events[typeEvent], handler, delegationSelector);

	      if (!fn) {
	        return;
	      }

	      element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
	      delete events[typeEvent][fn.uidEvent];
	    }

	    function removeNamespacedHandlers(element, events, typeEvent, namespace) {
	      var storeElementEvent = events[typeEvent] || {};
	      Object.keys(storeElementEvent).forEach(function (handlerKey) {
	        if (handlerKey.includes(namespace)) {
	          var event = storeElementEvent[handlerKey];
	          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	        }
	      });
	    }

	    var EventHandler = {
	      on: function on(element, event, handler, delegationFn) {
	        addHandler(element, event, handler, delegationFn, false);
	      },
	      one: function one(element, event, handler, delegationFn) {
	        addHandler(element, event, handler, delegationFn, true);
	      },
	      off: function off(element, originalTypeEvent, handler, delegationFn) {
	        if (typeof originalTypeEvent !== 'string' || !element) {
	          return;
	        }

	        var _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn),
	            delegation = _normalizeParams2[0],
	            originalHandler = _normalizeParams2[1],
	            typeEvent = _normalizeParams2[2];

	        var inNamespace = typeEvent !== originalTypeEvent;
	        var events = getEvent(element);
	        var isNamespace = originalTypeEvent.startsWith('.');

	        if (typeof originalHandler !== 'undefined') {
	          // Simplest case: handler is passed, remove that listener ONLY.
	          if (!events || !events[typeEvent]) {
	            return;
	          }

	          removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
	          return;
	        }

	        if (isNamespace) {
	          Object.keys(events).forEach(function (elementEvent) {
	            removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
	          });
	        }

	        var storeElementEvent = events[typeEvent] || {};
	        Object.keys(storeElementEvent).forEach(function (keyHandlers) {
	          var handlerKey = keyHandlers.replace(stripUidRegex, '');

	          if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
	            var event = storeElementEvent[keyHandlers];
	            removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	          }
	        });
	      },
	      trigger: function trigger(element, event, args) {
	        if (typeof event !== 'string' || !element) {
	          return null;
	        }

	        var $ = getjQuery();
	        var typeEvent = event.replace(stripNameRegex, '');
	        var inNamespace = event !== typeEvent;
	        var isNative = nativeEvents.has(typeEvent);
	        var jQueryEvent;
	        var bubbles = true;
	        var nativeDispatch = true;
	        var defaultPrevented = false;
	        var evt = null;

	        if (inNamespace && $) {
	          jQueryEvent = $.Event(event, args);
	          $(element).trigger(jQueryEvent);
	          bubbles = !jQueryEvent.isPropagationStopped();
	          nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
	          defaultPrevented = jQueryEvent.isDefaultPrevented();
	        }

	        if (isNative) {
	          evt = document.createEvent('HTMLEvents');
	          evt.initEvent(typeEvent, bubbles, true);
	        } else {
	          evt = new CustomEvent(event, {
	            bubbles: bubbles,
	            cancelable: true
	          });
	        } // merge custom information in our event


	        if (typeof args !== 'undefined') {
	          Object.keys(args).forEach(function (key) {
	            Object.defineProperty(evt, key, {
	              get: function get() {
	                return args[key];
	              }
	            });
	          });
	        }

	        if (defaultPrevented) {
	          evt.preventDefault();
	        }

	        if (nativeDispatch) {
	          element.dispatchEvent(evt);
	        }

	        if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
	          jQueryEvent.preventDefault();
	        }

	        return evt;
	      }
	    };
	    return EventHandler;
	  });
	});

	/*!
	  * Universal manipulator.js v1.0.0 (undefined)
	  * Copyright 2020-2020 Kodeless Design
	  * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	  */
	var manipulator = createCommonjsModule(function (module, exports) {
	  (function (global, factory) {
	     module.exports = factory() ;
	  })(commonjsGlobal, function () {
	    /**
	     * --------------------------------------------------------------------------
	     * Universal (v1.0.0): dom/manipulator.js
	     * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	     * --------------------------------------------------------------------------
	     */

	    function normalizeData(val) {
	      if (val === 'true') {
	        return true;
	      }

	      if (val === 'false') {
	        return false;
	      }

	      if (val === Number(val).toString()) {
	        return Number(val);
	      }

	      if (val === '' || val === 'null') {
	        return null;
	      }

	      return val;
	    }

	    function normalizeDataKey(key) {
	      return key.replace(/[A-Z]/g, function (chr) {
	        return "-" + chr.toLowerCase();
	      });
	    }

	    var Manipulator = {
	      setDataAttribute: function setDataAttribute(element, key, value) {
	        element.setAttribute("data-bs-" + normalizeDataKey(key), value);
	      },
	      removeDataAttribute: function removeDataAttribute(element, key) {
	        element.removeAttribute("data-bs-" + normalizeDataKey(key));
	      },
	      getDataAttributes: function getDataAttributes(element) {
	        if (!element) {
	          return {};
	        }

	        var attributes = {};
	        Object.keys(element.dataset).filter(function (key) {
	          return key.startsWith('bs');
	        }).forEach(function (key) {
	          var pureKey = key.replace(/^bs/, '');
	          pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
	          attributes[pureKey] = normalizeData(element.dataset[key]);
	        });
	        return attributes;
	      },
	      getDataAttribute: function getDataAttribute(element, key) {
	        return normalizeData(element.getAttribute("data-bs-" + normalizeDataKey(key)));
	      },
	      offset: function offset(element) {
	        var rect = element.getBoundingClientRect();
	        return {
	          top: rect.top + document.body.scrollTop,
	          left: rect.left + document.body.scrollLeft
	        };
	      },
	      position: function position(element) {
	        return {
	          top: element.offsetTop,
	          left: element.offsetLeft
	        };
	      }
	    };
	    return Manipulator;
	  });
	});

	/*!
	  * Universal selector-engine.js v1.0.0 (undefined)
	  * Copyright 2020-2020 Kodeless Design
	  * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	  */
	var selectorEngine = createCommonjsModule(function (module, exports) {
	  (function (global, factory) {
	     module.exports = factory() ;
	  })(commonjsGlobal, function () {
	    /**
	     * --------------------------------------------------------------------------
	     * Universal (v1.0.0): dom/selector-engine.js
	     * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	     * --------------------------------------------------------------------------
	     */

	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */

	    var NODE_TEXT = 3;
	    var SelectorEngine = {
	      find: function find(selector, element) {
	        var _ref;

	        if (element === void 0) {
	          element = document.documentElement;
	        }

	        return (_ref = []).concat.apply(_ref, Element.prototype.querySelectorAll.call(element, selector));
	      },
	      findOne: function findOne(selector, element) {
	        if (element === void 0) {
	          element = document.documentElement;
	        }

	        return Element.prototype.querySelector.call(element, selector);
	      },
	      children: function children(element, selector) {
	        var _ref2;

	        return (_ref2 = []).concat.apply(_ref2, element.children).filter(function (child) {
	          return child.matches(selector);
	        });
	      },
	      parents: function parents(element, selector) {
	        var parents = [];
	        var ancestor = element.parentNode;

	        while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
	          if (ancestor.matches(selector)) {
	            parents.push(ancestor);
	          }

	          ancestor = ancestor.parentNode;
	        }

	        return parents;
	      },
	      prev: function prev(element, selector) {
	        var previous = element.previousElementSibling;

	        while (previous) {
	          if (previous.matches(selector)) {
	            return [previous];
	          }

	          previous = previous.previousElementSibling;
	        }

	        return [];
	      },
	      next: function next(element, selector) {
	        var next = element.nextElementSibling;

	        while (next) {
	          if (next.matches(selector)) {
	            return [next];
	          }

	          next = next.nextElementSibling;
	        }

	        return [];
	      }
	    };
	    return SelectorEngine;
	  });
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib);

	/*!
	  * Universal tooltip.js v1.0.0 (undefined)
	  * Copyright 2020-2020 Kodeless Design
	  * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	  */
	var tooltip = createCommonjsModule(function (module, exports) {
	  (function (global, factory) {
	     module.exports = factory(require$$0, data, eventHandler, manipulator, selectorEngine) ;
	  })(commonjsGlobal, function (Popper, Data, EventHandler, Manipulator, SelectorEngine) {

	    function _interopDefaultLegacy(e) {
	      return e && typeof e === 'object' && 'default' in e ? e : {
	        'default': e
	      };
	    }

	    function _interopNamespace(e) {
	      if (e && e.__esModule) return e;
	      var n = Object.create(null);

	      if (e) {
	        Object.keys(e).forEach(function (k) {
	          if (k !== 'default') {
	            var d = Object.getOwnPropertyDescriptor(e, k);
	            Object.defineProperty(n, k, d.get ? d : {
	              enumerable: true,
	              get: function get() {
	                return e[k];
	              }
	            });
	          }
	        });
	      }

	      n['default'] = e;
	      return Object.freeze(n);
	    }

	    var Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);

	    var Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);

	    var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

	    var Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

	    var SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);

	    function _defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }

	    function _createClass(Constructor, protoProps, staticProps) {
	      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) _defineProperties(Constructor, staticProps);
	      return Constructor;
	    }

	    function _extends() {
	      _extends = Object.assign || function (target) {
	        for (var i = 1; i < arguments.length; i++) {
	          var source = arguments[i];

	          for (var key in source) {
	            if (Object.prototype.hasOwnProperty.call(source, key)) {
	              target[key] = source[key];
	            }
	          }
	        }

	        return target;
	      };

	      return _extends.apply(this, arguments);
	    }

	    function _inheritsLoose(subClass, superClass) {
	      subClass.prototype = Object.create(superClass.prototype);
	      subClass.prototype.constructor = subClass;
	      subClass.__proto__ = superClass;
	    }
	    /**
	     * --------------------------------------------------------------------------
	     * Universal (v1.0.0): util/index.js
	     * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	     * --------------------------------------------------------------------------
	     */


	    var MAX_UID = 1000000;
	    var MILLISECONDS_MULTIPLIER = 1000;
	    var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	    var toType = function toType(obj) {
	      if (obj === null || obj === undefined) {
	        return "" + obj;
	      }

	      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	    };
	    /**
	     * --------------------------------------------------------------------------
	     * Public Util Api
	     * --------------------------------------------------------------------------
	     */


	    var getUID = function getUID(prefix) {
	      do {
	        prefix += Math.floor(Math.random() * MAX_UID);
	      } while (document.getElementById(prefix));

	      return prefix;
	    };

	    var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
	      if (!element) {
	        return 0;
	      } // Get transition-duration of the element


	      var _window$getComputedSt = window.getComputedStyle(element),
	          transitionDuration = _window$getComputedSt.transitionDuration,
	          transitionDelay = _window$getComputedSt.transitionDelay;

	      var floatTransitionDuration = Number.parseFloat(transitionDuration);
	      var floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	      if (!floatTransitionDuration && !floatTransitionDelay) {
	        return 0;
	      } // If multiple durations are defined, take the first


	      transitionDuration = transitionDuration.split(',')[0];
	      transitionDelay = transitionDelay.split(',')[0];
	      return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	    };

	    var triggerTransitionEnd = function triggerTransitionEnd(element) {
	      element.dispatchEvent(new Event(TRANSITION_END));
	    };

	    var isElement = function isElement(obj) {
	      return (obj[0] || obj).nodeType;
	    };

	    var emulateTransitionEnd = function emulateTransitionEnd(element, duration) {
	      var called = false;
	      var durationPadding = 5;
	      var emulatedDuration = duration + durationPadding;

	      function listener() {
	        called = true;
	        element.removeEventListener(TRANSITION_END, listener);
	      }

	      element.addEventListener(TRANSITION_END, listener);
	      setTimeout(function () {
	        if (!called) {
	          triggerTransitionEnd(element);
	        }
	      }, emulatedDuration);
	    };

	    var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
	      Object.keys(configTypes).forEach(function (property) {
	        var expectedTypes = configTypes[property];
	        var value = config[property];
	        var valueType = value && isElement(value) ? 'element' : toType(value);

	        if (!new RegExp(expectedTypes).test(valueType)) {
	          throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
	        }
	      });
	    };

	    var findShadowRoot = function findShadowRoot(element) {
	      if (!document.documentElement.attachShadow) {
	        return null;
	      } // Can find the shadow root otherwise it'll return the document


	      if (typeof element.getRootNode === 'function') {
	        var root = element.getRootNode();
	        return root instanceof ShadowRoot ? root : null;
	      }

	      if (element instanceof ShadowRoot) {
	        return element;
	      } // when we don't find a shadow root


	      if (!element.parentNode) {
	        return null;
	      }

	      return findShadowRoot(element.parentNode);
	    };

	    var noop = function noop() {
	      return function () {};
	    };

	    var getjQuery = function getjQuery() {
	      var _window = window,
	          jQuery = _window.jQuery;

	      if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	        return jQuery;
	      }

	      return null;
	    };

	    var onDOMContentLoaded = function onDOMContentLoaded(callback) {
	      if (document.readyState === 'loading') {
	        document.addEventListener('DOMContentLoaded', callback);
	      } else {
	        callback();
	      }
	    };

	    var isRTL = document.documentElement.dir === 'rtl';

	    var defineJQueryPlugin = function defineJQueryPlugin(name, plugin) {
	      onDOMContentLoaded(function () {
	        var $ = getjQuery();
	        /* istanbul ignore if */

	        if ($) {
	          var JQUERY_NO_CONFLICT = $.fn[name];
	          $.fn[name] = plugin.jQueryInterface;
	          $.fn[name].Constructor = plugin;

	          $.fn[name].noConflict = function () {
	            $.fn[name] = JQUERY_NO_CONFLICT;
	            return plugin.jQueryInterface;
	          };
	        }
	      });
	    };
	    /**
	     * --------------------------------------------------------------------------
	     * Universal (v1.0.0): util/sanitizer.js
	     * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	     * --------------------------------------------------------------------------
	     */


	    var uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
	    var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
	    /**
	     * A pattern that recognizes a commonly useful subset of URLs that are safe.
	     *
	     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
	     */

	    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
	    /**
	     * A pattern that matches safe data URLs. Only matches image, video and audio types.
	     *
	     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
	     */

	    var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

	    var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
	      var attrName = attr.nodeName.toLowerCase();

	      if (allowedAttributeList.includes(attrName)) {
	        if (uriAttrs.has(attrName)) {
	          return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
	        }

	        return true;
	      }

	      var regExp = allowedAttributeList.filter(function (attrRegex) {
	        return attrRegex instanceof RegExp;
	      }); // Check if a regular expression validates the attribute.

	      for (var i = 0, len = regExp.length; i < len; i++) {
	        if (attrName.match(regExp[i])) {
	          return true;
	        }
	      }

	      return false;
	    };

	    var DefaultAllowlist = {
	      // Global attributes allowed on any supplied element below.
	      '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
	      a: ['target', 'href', 'title', 'rel'],
	      area: [],
	      b: [],
	      br: [],
	      col: [],
	      code: [],
	      div: [],
	      em: [],
	      hr: [],
	      h1: [],
	      h2: [],
	      h3: [],
	      h4: [],
	      h5: [],
	      h6: [],
	      i: [],
	      img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
	      li: [],
	      ol: [],
	      p: [],
	      pre: [],
	      s: [],
	      small: [],
	      span: [],
	      sub: [],
	      sup: [],
	      strong: [],
	      u: [],
	      ul: []
	    };

	    function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
	      var _ref;

	      if (!unsafeHtml.length) {
	        return unsafeHtml;
	      }

	      if (sanitizeFn && typeof sanitizeFn === 'function') {
	        return sanitizeFn(unsafeHtml);
	      }

	      var domParser = new window.DOMParser();
	      var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
	      var allowlistKeys = Object.keys(allowList);

	      var elements = (_ref = []).concat.apply(_ref, createdDocument.body.querySelectorAll('*'));

	      var _loop = function _loop(i, len) {
	        var _ref2;

	        var el = elements[i];
	        var elName = el.nodeName.toLowerCase();

	        if (!allowlistKeys.includes(elName)) {
	          el.parentNode.removeChild(el);
	          return "continue";
	        }

	        var attributeList = (_ref2 = []).concat.apply(_ref2, el.attributes);

	        var allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
	        attributeList.forEach(function (attr) {
	          if (!allowedAttribute(attr, allowedAttributes)) {
	            el.removeAttribute(attr.nodeName);
	          }
	        });
	      };

	      for (var i = 0, len = elements.length; i < len; i++) {
	        var _ret = _loop(i);

	        if (_ret === "continue") continue;
	      }

	      return createdDocument.body.innerHTML;
	    }
	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */


	    var VERSION = '5.0.0-beta1';

	    var BaseComponent = /*#__PURE__*/function () {
	      function BaseComponent(element) {
	        if (!element) {
	          return;
	        }

	        this._element = element;
	        Data__default['default'].setData(element, this.constructor.DATA_KEY, this);
	      }

	      var _proto = BaseComponent.prototype;

	      _proto.dispose = function dispose() {
	        Data__default['default'].removeData(this._element, this.constructor.DATA_KEY);
	        this._element = null;
	      }
	      /** Static */
	      ;

	      BaseComponent.getInstance = function getInstance(element) {
	        return Data__default['default'].getData(element, this.DATA_KEY);
	      };

	      _createClass(BaseComponent, null, [{
	        key: "VERSION",
	        get: function get() {
	          return VERSION;
	        }
	      }]);

	      return BaseComponent;
	    }();
	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */


	    var NAME = 'tooltip';
	    var DATA_KEY = 'bs.tooltip';
	    var EVENT_KEY = "." + DATA_KEY;
	    var CLASS_PREFIX = 'bs-tooltip';
	    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
	    var DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
	    var DefaultType = {
	      animation: 'boolean',
	      template: 'string',
	      title: '(string|element|function)',
	      trigger: 'string',
	      delay: '(number|object)',
	      html: 'boolean',
	      selector: '(string|boolean)',
	      placement: '(string|function)',
	      container: '(string|element|boolean)',
	      fallbackPlacements: 'array',
	      boundary: '(string|element)',
	      customClass: '(string|function)',
	      sanitize: 'boolean',
	      sanitizeFn: '(null|function)',
	      allowList: 'object',
	      popperConfig: '(null|object)'
	    };
	    var AttachmentMap = {
	      AUTO: 'auto',
	      TOP: 'top',
	      RIGHT: isRTL ? 'left' : 'right',
	      BOTTOM: 'bottom',
	      LEFT: isRTL ? 'right' : 'left'
	    };
	    var Default = {
	      animation: true,
	      template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
	      trigger: 'hover focus',
	      title: '',
	      delay: 0,
	      html: false,
	      selector: false,
	      placement: 'top',
	      container: false,
	      fallbackPlacements: ['top', 'right', 'bottom', 'left'],
	      boundary: 'clippingParents',
	      customClass: '',
	      sanitize: true,
	      sanitizeFn: null,
	      allowList: DefaultAllowlist,
	      popperConfig: null
	    };
	    var Event$1 = {
	      HIDE: "hide" + EVENT_KEY,
	      HIDDEN: "hidden" + EVENT_KEY,
	      SHOW: "show" + EVENT_KEY,
	      SHOWN: "shown" + EVENT_KEY,
	      INSERTED: "inserted" + EVENT_KEY,
	      CLICK: "click" + EVENT_KEY,
	      FOCUSIN: "focusin" + EVENT_KEY,
	      FOCUSOUT: "focusout" + EVENT_KEY,
	      MOUSEENTER: "mouseenter" + EVENT_KEY,
	      MOUSELEAVE: "mouseleave" + EVENT_KEY
	    };
	    var CLASS_NAME_FADE = 'fade';
	    var CLASS_NAME_MODAL = 'modal';
	    var CLASS_NAME_SHOW = 'show';
	    var HOVER_STATE_SHOW = 'show';
	    var HOVER_STATE_OUT = 'out';
	    var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
	    var TRIGGER_HOVER = 'hover';
	    var TRIGGER_FOCUS = 'focus';
	    var TRIGGER_CLICK = 'click';
	    var TRIGGER_MANUAL = 'manual';
	    /**
	     * ------------------------------------------------------------------------
	     * Class Definition
	     * ------------------------------------------------------------------------
	     */

	    var Tooltip = /*#__PURE__*/function (_BaseComponent) {
	      _inheritsLoose(Tooltip, _BaseComponent);

	      function Tooltip(element, config) {
	        var _this;

	        if (typeof Popper__namespace === 'undefined') {
	          throw new TypeError('Universal\'s tooltips require Popper (https://popper.js.org)');
	        }

	        _this = _BaseComponent.call(this, element) || this; // private

	        _this._isEnabled = true;
	        _this._timeout = 0;
	        _this._hoverState = '';
	        _this._activeTrigger = {};
	        _this._popper = null; // Protected

	        _this.config = _this._getConfig(config);
	        _this.tip = null;

	        _this._setListeners();

	        return _this;
	      } // Getters


	      var _proto = Tooltip.prototype; // Public

	      _proto.enable = function enable() {
	        this._isEnabled = true;
	      };

	      _proto.disable = function disable() {
	        this._isEnabled = false;
	      };

	      _proto.toggleEnabled = function toggleEnabled() {
	        this._isEnabled = !this._isEnabled;
	      };

	      _proto.toggle = function toggle(event) {
	        if (!this._isEnabled) {
	          return;
	        }

	        if (event) {
	          var dataKey = this.constructor.DATA_KEY;
	          var context = Data__default['default'].getData(event.delegateTarget, dataKey);

	          if (!context) {
	            context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
	            Data__default['default'].setData(event.delegateTarget, dataKey, context);
	          }

	          context._activeTrigger.click = !context._activeTrigger.click;

	          if (context._isWithActiveTrigger()) {
	            context._enter(null, context);
	          } else {
	            context._leave(null, context);
	          }
	        } else {
	          if (this.getTipElement().classList.contains(CLASS_NAME_SHOW)) {
	            this._leave(null, this);

	            return;
	          }

	          this._enter(null, this);
	        }
	      };

	      _proto.dispose = function dispose() {
	        clearTimeout(this._timeout);
	        EventHandler__default['default'].off(this._element, this.constructor.EVENT_KEY);
	        EventHandler__default['default'].off(this._element.closest("." + CLASS_NAME_MODAL), 'hide.un.modal', this._hideModalHandler);

	        if (this.tip && this.tip.parentNode) {
	          this.tip.parentNode.removeChild(this.tip);
	        }

	        this._isEnabled = null;
	        this._timeout = null;
	        this._hoverState = null;
	        this._activeTrigger = null;

	        if (this._popper) {
	          this._popper.destroy();
	        }

	        this._popper = null;
	        this.config = null;
	        this.tip = null;

	        _BaseComponent.prototype.dispose.call(this);
	      };

	      _proto.show = function show() {
	        var _this2 = this;

	        if (this._element.style.display === 'none') {
	          throw new Error('Please use show on visible elements');
	        }

	        if (this.isWithContent() && this._isEnabled) {
	          var showEvent = EventHandler__default['default'].trigger(this._element, this.constructor.Event.SHOW);
	          var shadowRoot = findShadowRoot(this._element);
	          var isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

	          if (showEvent.defaultPrevented || !isInTheDom) {
	            return;
	          }

	          var tip = this.getTipElement();
	          var tipId = getUID(this.constructor.NAME);
	          tip.setAttribute('id', tipId);

	          this._element.setAttribute('aria-describedby', tipId);

	          this.setContent();

	          if (this.config.animation) {
	            tip.classList.add(CLASS_NAME_FADE);
	          }

	          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this._element) : this.config.placement;

	          var attachment = this._getAttachment(placement);

	          this._addAttachmentClass(attachment);

	          var container = this._getContainer();

	          Data__default['default'].setData(tip, this.constructor.DATA_KEY, this);

	          if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
	            container.appendChild(tip);
	          }

	          EventHandler__default['default'].trigger(this._element, this.constructor.Event.INSERTED);
	          this._popper = Popper.createPopper(this._element, tip, this._getPopperConfig(attachment));
	          tip.classList.add(CLASS_NAME_SHOW);
	          var customClass = typeof this.config.customClass === 'function' ? this.config.customClass() : this.config.customClass;

	          if (customClass) {
	            var _tip$classList;

	            (_tip$classList = tip.classList).add.apply(_tip$classList, customClass.split(' '));
	          } // If this is a touch-enabled device we add extra
	          // empty mouseover listeners to the body's immediate children;
	          // only needed because of broken event delegation on iOS
	          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


	          if ('ontouchstart' in document.documentElement) {
	            var _ref;

	            (_ref = []).concat.apply(_ref, document.body.children).forEach(function (element) {
	              EventHandler__default['default'].on(element, 'mouseover', noop());
	            });
	          }

	          var complete = function complete() {
	            var prevHoverState = _this2._hoverState;
	            _this2._hoverState = null;
	            EventHandler__default['default'].trigger(_this2._element, _this2.constructor.Event.SHOWN);

	            if (prevHoverState === HOVER_STATE_OUT) {
	              _this2._leave(null, _this2);
	            }
	          };

	          if (this.tip.classList.contains(CLASS_NAME_FADE)) {
	            var transitionDuration = getTransitionDurationFromElement(this.tip);
	            EventHandler__default['default'].one(this.tip, 'transitionend', complete);
	            emulateTransitionEnd(this.tip, transitionDuration);
	          } else {
	            complete();
	          }
	        }
	      };

	      _proto.hide = function hide() {
	        var _this3 = this;

	        if (!this._popper) {
	          return;
	        }

	        var tip = this.getTipElement();

	        var complete = function complete() {
	          if (_this3._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
	            tip.parentNode.removeChild(tip);
	          }

	          _this3._cleanTipClass();

	          _this3._element.removeAttribute('aria-describedby');

	          EventHandler__default['default'].trigger(_this3._element, _this3.constructor.Event.HIDDEN);

	          if (_this3._popper) {
	            _this3._popper.destroy();

	            _this3._popper = null;
	          }
	        };

	        var hideEvent = EventHandler__default['default'].trigger(this._element, this.constructor.Event.HIDE);

	        if (hideEvent.defaultPrevented) {
	          return;
	        }

	        tip.classList.remove(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
	        // empty mouseover listeners we added for iOS support

	        if ('ontouchstart' in document.documentElement) {
	          var _ref2;

	          (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function (element) {
	            return EventHandler__default['default'].off(element, 'mouseover', noop);
	          });
	        }

	        this._activeTrigger[TRIGGER_CLICK] = false;
	        this._activeTrigger[TRIGGER_FOCUS] = false;
	        this._activeTrigger[TRIGGER_HOVER] = false;

	        if (this.tip.classList.contains(CLASS_NAME_FADE)) {
	          var transitionDuration = getTransitionDurationFromElement(tip);
	          EventHandler__default['default'].one(tip, 'transitionend', complete);
	          emulateTransitionEnd(tip, transitionDuration);
	        } else {
	          complete();
	        }

	        this._hoverState = '';
	      };

	      _proto.update = function update() {
	        if (this._popper !== null) {
	          this._popper.update();
	        }
	      } // Protected
	      ;

	      _proto.isWithContent = function isWithContent() {
	        return Boolean(this.getTitle());
	      };

	      _proto.getTipElement = function getTipElement() {
	        if (this.tip) {
	          return this.tip;
	        }

	        var element = document.createElement('div');
	        element.innerHTML = this.config.template;
	        this.tip = element.children[0];
	        return this.tip;
	      };

	      _proto.setContent = function setContent() {
	        var tip = this.getTipElement();
	        this.setElementContent(SelectorEngine__default['default'].findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
	        tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW);
	      };

	      _proto.setElementContent = function setElementContent(element, content) {
	        if (element === null) {
	          return;
	        }

	        if (typeof content === 'object' && isElement(content)) {
	          if (content.jquery) {
	            content = content[0];
	          } // content is a DOM node or a jQuery


	          if (this.config.html) {
	            if (content.parentNode !== element) {
	              element.innerHTML = '';
	              element.appendChild(content);
	            }
	          } else {
	            element.textContent = content.textContent;
	          }

	          return;
	        }

	        if (this.config.html) {
	          if (this.config.sanitize) {
	            content = sanitizeHtml(content, this.config.allowList, this.config.sanitizeFn);
	          }

	          element.innerHTML = content;
	        } else {
	          element.textContent = content;
	        }
	      };

	      _proto.getTitle = function getTitle() {
	        var title = this._element.getAttribute('data-bs-original-title');

	        if (!title) {
	          title = typeof this.config.title === 'function' ? this.config.title.call(this._element) : this.config.title;
	        }

	        return title;
	      };

	      _proto.updateAttachment = function updateAttachment(attachment) {
	        if (attachment === 'right') {
	          return 'end';
	        }

	        if (attachment === 'left') {
	          return 'start';
	        }

	        return attachment;
	      } // Private
	      ;

	      _proto._getPopperConfig = function _getPopperConfig(attachment) {
	        var _this4 = this;

	        var defaultBsConfig = {
	          placement: attachment,
	          modifiers: [{
	            name: 'flip',
	            options: {
	              altBoundary: true,
	              fallbackPlacements: this.config.fallbackPlacements
	            }
	          }, {
	            name: 'preventOverflow',
	            options: {
	              rootBoundary: this.config.boundary
	            }
	          }, {
	            name: 'arrow',
	            options: {
	              element: "." + this.constructor.NAME + "-arrow"
	            }
	          }, {
	            name: 'onChange',
	            enabled: true,
	            phase: 'afterWrite',
	            fn: function fn(data) {
	              return _this4._handlePopperPlacementChange(data);
	            }
	          }],
	          onFirstUpdate: function onFirstUpdate(data) {
	            if (data.options.placement !== data.placement) {
	              _this4._handlePopperPlacementChange(data);
	            }
	          }
	        };
	        return _extends({}, defaultBsConfig, this.config.popperConfig);
	      };

	      _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
	        this.getTipElement().classList.add(CLASS_PREFIX + "-" + this.updateAttachment(attachment));
	      };

	      _proto._getContainer = function _getContainer() {
	        if (this.config.container === false) {
	          return document.body;
	        }

	        if (isElement(this.config.container)) {
	          return this.config.container;
	        }

	        return SelectorEngine__default['default'].findOne(this.config.container);
	      };

	      _proto._getAttachment = function _getAttachment(placement) {
	        return AttachmentMap[placement.toUpperCase()];
	      };

	      _proto._setListeners = function _setListeners() {
	        var _this5 = this;

	        var triggers = this.config.trigger.split(' ');
	        triggers.forEach(function (trigger) {
	          if (trigger === 'click') {
	            EventHandler__default['default'].on(_this5._element, _this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
	              return _this5.toggle(event);
	            });
	          } else if (trigger !== TRIGGER_MANUAL) {
	            var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
	            var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
	            EventHandler__default['default'].on(_this5._element, eventIn, _this5.config.selector, function (event) {
	              return _this5._enter(event);
	            });
	            EventHandler__default['default'].on(_this5._element, eventOut, _this5.config.selector, function (event) {
	              return _this5._leave(event);
	            });
	          }
	        });

	        this._hideModalHandler = function () {
	          if (_this5._element) {
	            _this5.hide();
	          }
	        };

	        EventHandler__default['default'].on(this._element.closest("." + CLASS_NAME_MODAL), 'hide.un.modal', this._hideModalHandler);

	        if (this.config.selector) {
	          this.config = _extends({}, this.config, {
	            trigger: 'manual',
	            selector: ''
	          });
	        } else {
	          this._fixTitle();
	        }
	      };

	      _proto._fixTitle = function _fixTitle() {
	        var title = this._element.getAttribute('title');

	        var originalTitleType = typeof this._element.getAttribute('data-bs-original-title');

	        if (title || originalTitleType !== 'string') {
	          this._element.setAttribute('data-bs-original-title', title || '');

	          if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
	            this._element.setAttribute('aria-label', title);
	          }

	          this._element.setAttribute('title', '');
	        }
	      };

	      _proto._enter = function _enter(event, context) {
	        var dataKey = this.constructor.DATA_KEY;
	        context = context || Data__default['default'].getData(event.delegateTarget, dataKey);

	        if (!context) {
	          context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
	          Data__default['default'].setData(event.delegateTarget, dataKey, context);
	        }

	        if (event) {
	          context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
	        }

	        if (context.getTipElement().classList.contains(CLASS_NAME_SHOW) || context._hoverState === HOVER_STATE_SHOW) {
	          context._hoverState = HOVER_STATE_SHOW;
	          return;
	        }

	        clearTimeout(context._timeout);
	        context._hoverState = HOVER_STATE_SHOW;

	        if (!context.config.delay || !context.config.delay.show) {
	          context.show();
	          return;
	        }

	        context._timeout = setTimeout(function () {
	          if (context._hoverState === HOVER_STATE_SHOW) {
	            context.show();
	          }
	        }, context.config.delay.show);
	      };

	      _proto._leave = function _leave(event, context) {
	        var dataKey = this.constructor.DATA_KEY;
	        context = context || Data__default['default'].getData(event.delegateTarget, dataKey);

	        if (!context) {
	          context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
	          Data__default['default'].setData(event.delegateTarget, dataKey, context);
	        }

	        if (event) {
	          context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
	        }

	        if (context._isWithActiveTrigger()) {
	          return;
	        }

	        clearTimeout(context._timeout);
	        context._hoverState = HOVER_STATE_OUT;

	        if (!context.config.delay || !context.config.delay.hide) {
	          context.hide();
	          return;
	        }

	        context._timeout = setTimeout(function () {
	          if (context._hoverState === HOVER_STATE_OUT) {
	            context.hide();
	          }
	        }, context.config.delay.hide);
	      };

	      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
	        for (var trigger in this._activeTrigger) {
	          if (this._activeTrigger[trigger]) {
	            return true;
	          }
	        }

	        return false;
	      };

	      _proto._getConfig = function _getConfig(config) {
	        var dataAttributes = Manipulator__default['default'].getDataAttributes(this._element);
	        Object.keys(dataAttributes).forEach(function (dataAttr) {
	          if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
	            delete dataAttributes[dataAttr];
	          }
	        });

	        if (config && typeof config.container === 'object' && config.container.jquery) {
	          config.container = config.container[0];
	        }

	        config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

	        if (typeof config.delay === 'number') {
	          config.delay = {
	            show: config.delay,
	            hide: config.delay
	          };
	        }

	        if (typeof config.title === 'number') {
	          config.title = config.title.toString();
	        }

	        if (typeof config.content === 'number') {
	          config.content = config.content.toString();
	        }

	        typeCheckConfig(NAME, config, this.constructor.DefaultType);

	        if (config.sanitize) {
	          config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
	        }

	        return config;
	      };

	      _proto._getDelegateConfig = function _getDelegateConfig() {
	        var config = {};

	        if (this.config) {
	          for (var key in this.config) {
	            if (this.constructor.Default[key] !== this.config[key]) {
	              config[key] = this.config[key];
	            }
	          }
	        }

	        return config;
	      };

	      _proto._cleanTipClass = function _cleanTipClass() {
	        var tip = this.getTipElement();
	        var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

	        if (tabClass !== null && tabClass.length > 0) {
	          tabClass.map(function (token) {
	            return token.trim();
	          }).forEach(function (tClass) {
	            return tip.classList.remove(tClass);
	          });
	        }
	      };

	      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
	        var state = popperData.state;

	        if (!state) {
	          return;
	        }

	        this.tip = state.elements.popper;

	        this._cleanTipClass();

	        this._addAttachmentClass(this._getAttachment(state.placement));
	      } // Static
	      ;

	      Tooltip.jQueryInterface = function jQueryInterface(config) {
	        return this.each(function () {
	          var data = Data__default['default'].getData(this, DATA_KEY);

	          var _config = typeof config === 'object' && config;

	          if (!data && /dispose|hide/.test(config)) {
	            return;
	          }

	          if (!data) {
	            data = new Tooltip(this, _config);
	          }

	          if (typeof config === 'string') {
	            if (typeof data[config] === 'undefined') {
	              throw new TypeError("No method named \"" + config + "\"");
	            }

	            data[config]();
	          }
	        });
	      };

	      _createClass(Tooltip, null, [{
	        key: "Default",
	        get: function get() {
	          return Default;
	        }
	      }, {
	        key: "NAME",
	        get: function get() {
	          return NAME;
	        }
	      }, {
	        key: "DATA_KEY",
	        get: function get() {
	          return DATA_KEY;
	        }
	      }, {
	        key: "Event",
	        get: function get() {
	          return Event$1;
	        }
	      }, {
	        key: "EVENT_KEY",
	        get: function get() {
	          return EVENT_KEY;
	        }
	      }, {
	        key: "DefaultType",
	        get: function get() {
	          return DefaultType;
	        }
	      }]);

	      return Tooltip;
	    }(BaseComponent);
	    /**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     * add .Tooltip to jQuery only if jQuery is present
	     */


	    defineJQueryPlugin(NAME, Tooltip);
	    return Tooltip;
	  });
	});
	var Tooltip = /*@__PURE__*/getDefaultExportFromCjs(tooltip);

	/*!
	  * Universal carousel.js v1.0.0 (undefined)
	  * Copyright 2020-2020 Kodeless Design
	  * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	  */
	var carousel = createCommonjsModule(function (module, exports) {
	  (function (global, factory) {
	     module.exports = factory(data, eventHandler, manipulator, selectorEngine) ;
	  })(commonjsGlobal, function (Data, EventHandler, Manipulator, SelectorEngine) {

	    function _interopDefaultLegacy(e) {
	      return e && typeof e === 'object' && 'default' in e ? e : {
	        'default': e
	      };
	    }

	    var Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);

	    var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

	    var Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

	    var SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);

	    function _defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }

	    function _createClass(Constructor, protoProps, staticProps) {
	      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) _defineProperties(Constructor, staticProps);
	      return Constructor;
	    }

	    function _extends() {
	      _extends = Object.assign || function (target) {
	        for (var i = 1; i < arguments.length; i++) {
	          var source = arguments[i];

	          for (var key in source) {
	            if (Object.prototype.hasOwnProperty.call(source, key)) {
	              target[key] = source[key];
	            }
	          }
	        }

	        return target;
	      };

	      return _extends.apply(this, arguments);
	    }

	    function _inheritsLoose(subClass, superClass) {
	      subClass.prototype = Object.create(superClass.prototype);
	      subClass.prototype.constructor = subClass;
	      subClass.__proto__ = superClass;
	    }
	    /**
	     * --------------------------------------------------------------------------
	     * Universal (v1.0.0): util/index.js
	     * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
	     * --------------------------------------------------------------------------
	     */


	    var MILLISECONDS_MULTIPLIER = 1000;
	    var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	    var toType = function toType(obj) {
	      if (obj === null || obj === undefined) {
	        return "" + obj;
	      }

	      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	    };

	    var getSelector = function getSelector(element) {
	      var selector = element.getAttribute('data-bs-target');

	      if (!selector || selector === '#') {
	        var hrefAttr = element.getAttribute('href');
	        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	      }

	      return selector;
	    };

	    var getElementFromSelector = function getElementFromSelector(element) {
	      var selector = getSelector(element);
	      return selector ? document.querySelector(selector) : null;
	    };

	    var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
	      if (!element) {
	        return 0;
	      } // Get transition-duration of the element


	      var _window$getComputedSt = window.getComputedStyle(element),
	          transitionDuration = _window$getComputedSt.transitionDuration,
	          transitionDelay = _window$getComputedSt.transitionDelay;

	      var floatTransitionDuration = Number.parseFloat(transitionDuration);
	      var floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	      if (!floatTransitionDuration && !floatTransitionDelay) {
	        return 0;
	      } // If multiple durations are defined, take the first


	      transitionDuration = transitionDuration.split(',')[0];
	      transitionDelay = transitionDelay.split(',')[0];
	      return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	    };

	    var triggerTransitionEnd = function triggerTransitionEnd(element) {
	      element.dispatchEvent(new Event(TRANSITION_END));
	    };

	    var isElement = function isElement(obj) {
	      return (obj[0] || obj).nodeType;
	    };

	    var emulateTransitionEnd = function emulateTransitionEnd(element, duration) {
	      var called = false;
	      var durationPadding = 5;
	      var emulatedDuration = duration + durationPadding;

	      function listener() {
	        called = true;
	        element.removeEventListener(TRANSITION_END, listener);
	      }

	      element.addEventListener(TRANSITION_END, listener);
	      setTimeout(function () {
	        if (!called) {
	          triggerTransitionEnd(element);
	        }
	      }, emulatedDuration);
	    };

	    var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
	      Object.keys(configTypes).forEach(function (property) {
	        var expectedTypes = configTypes[property];
	        var value = config[property];
	        var valueType = value && isElement(value) ? 'element' : toType(value);

	        if (!new RegExp(expectedTypes).test(valueType)) {
	          throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
	        }
	      });
	    };

	    var isVisible = function isVisible(element) {
	      if (!element) {
	        return false;
	      }

	      if (element.style && element.parentNode && element.parentNode.style) {
	        var elementStyle = getComputedStyle(element);
	        var parentNodeStyle = getComputedStyle(element.parentNode);
	        return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden';
	      }

	      return false;
	    };

	    var reflow = function reflow(element) {
	      return element.offsetHeight;
	    };

	    var getjQuery = function getjQuery() {
	      var _window = window,
	          jQuery = _window.jQuery;

	      if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	        return jQuery;
	      }

	      return null;
	    };

	    var onDOMContentLoaded = function onDOMContentLoaded(callback) {
	      if (document.readyState === 'loading') {
	        document.addEventListener('DOMContentLoaded', callback);
	      } else {
	        callback();
	      }
	    };

	    var isRTL = document.documentElement.dir === 'rtl';

	    var defineJQueryPlugin = function defineJQueryPlugin(name, plugin) {
	      onDOMContentLoaded(function () {
	        var $ = getjQuery();
	        /* istanbul ignore if */

	        if ($) {
	          var JQUERY_NO_CONFLICT = $.fn[name];
	          $.fn[name] = plugin.jQueryInterface;
	          $.fn[name].Constructor = plugin;

	          $.fn[name].noConflict = function () {
	            $.fn[name] = JQUERY_NO_CONFLICT;
	            return plugin.jQueryInterface;
	          };
	        }
	      });
	    };
	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */


	    var VERSION = '5.0.0-beta1';

	    var BaseComponent = /*#__PURE__*/function () {
	      function BaseComponent(element) {
	        if (!element) {
	          return;
	        }

	        this._element = element;
	        Data__default['default'].setData(element, this.constructor.DATA_KEY, this);
	      }

	      var _proto = BaseComponent.prototype;

	      _proto.dispose = function dispose() {
	        Data__default['default'].removeData(this._element, this.constructor.DATA_KEY);
	        this._element = null;
	      }
	      /** Static */
	      ;

	      BaseComponent.getInstance = function getInstance(element) {
	        return Data__default['default'].getData(element, this.DATA_KEY);
	      };

	      _createClass(BaseComponent, null, [{
	        key: "VERSION",
	        get: function get() {
	          return VERSION;
	        }
	      }]);

	      return BaseComponent;
	    }();
	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */


	    var NAME = 'carousel';
	    var DATA_KEY = 'bs.carousel';
	    var EVENT_KEY = "." + DATA_KEY;
	    var DATA_API_KEY = '.data-api';
	    var ARROW_LEFT_KEY = 'ArrowLeft';
	    var ARROW_RIGHT_KEY = 'ArrowRight';
	    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

	    var SWIPE_THRESHOLD = 40;
	    var Default = {
	      interval: 5000,
	      keyboard: true,
	      slide: false,
	      pause: 'hover',
	      wrap: true,
	      touch: true
	    };
	    var DefaultType = {
	      interval: '(number|boolean)',
	      keyboard: 'boolean',
	      slide: '(boolean|string)',
	      pause: '(string|boolean)',
	      wrap: 'boolean',
	      touch: 'boolean'
	    };
	    var DIRECTION_NEXT = 'next';
	    var DIRECTION_PREV = 'prev';
	    var DIRECTION_LEFT = 'left';
	    var DIRECTION_RIGHT = 'right';
	    var EVENT_SLIDE = "slide" + EVENT_KEY;
	    var EVENT_SLID = "slid" + EVENT_KEY;
	    var EVENT_KEYDOWN = "keydown" + EVENT_KEY;
	    var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY;
	    var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY;
	    var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY;
	    var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY;
	    var EVENT_TOUCHEND = "touchend" + EVENT_KEY;
	    var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY;
	    var EVENT_POINTERUP = "pointerup" + EVENT_KEY;
	    var EVENT_DRAG_START = "dragstart" + EVENT_KEY;
	    var EVENT_LOAD_DATA_API = "load" + EVENT_KEY + DATA_API_KEY;
	    var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
	    var CLASS_NAME_CAROUSEL = 'carousel';
	    var CLASS_NAME_ACTIVE = 'active';
	    var CLASS_NAME_SLIDE = 'slide';
	    var CLASS_NAME_END = 'carousel-item-end';
	    var CLASS_NAME_START = 'carousel-item-start';
	    var CLASS_NAME_NEXT = 'carousel-item-next';
	    var CLASS_NAME_PREV = 'carousel-item-prev';
	    var CLASS_NAME_POINTER_EVENT = 'pointer-event';
	    var SELECTOR_ACTIVE = '.active';
	    var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
	    var SELECTOR_ITEM = '.carousel-item';
	    var SELECTOR_ITEM_IMG = '.carousel-item img';
	    var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
	    var SELECTOR_INDICATORS = '.carousel-indicators';
	    var SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
	    var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
	    var POINTER_TYPE_TOUCH = 'touch';
	    var POINTER_TYPE_PEN = 'pen';
	    /**
	     * ------------------------------------------------------------------------
	     * Class Definition
	     * ------------------------------------------------------------------------
	     */

	    var Carousel = /*#__PURE__*/function (_BaseComponent) {
	      _inheritsLoose(Carousel, _BaseComponent);

	      function Carousel(element, config) {
	        var _this;

	        _this = _BaseComponent.call(this, element) || this;
	        _this._items = null;
	        _this._interval = null;
	        _this._activeElement = null;
	        _this._isPaused = false;
	        _this._isSliding = false;
	        _this.touchTimeout = null;
	        _this.touchStartX = 0;
	        _this.touchDeltaX = 0;
	        _this._config = _this._getConfig(config);
	        _this._indicatorsElement = SelectorEngine__default['default'].findOne(SELECTOR_INDICATORS, _this._element);
	        _this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
	        _this._pointerEvent = Boolean(window.PointerEvent);

	        _this._addEventListeners();

	        return _this;
	      } // Getters


	      var _proto = Carousel.prototype; // Public

	      _proto.next = function next() {
	        if (!this._isSliding) {
	          this._slide(DIRECTION_NEXT);
	        }
	      };

	      _proto.nextWhenVisible = function nextWhenVisible() {
	        // Don't call next when the page isn't visible
	        // or the carousel or its parent isn't visible
	        if (!document.hidden && isVisible(this._element)) {
	          this.next();
	        }
	      };

	      _proto.prev = function prev() {
	        if (!this._isSliding) {
	          this._slide(DIRECTION_PREV);
	        }
	      };

	      _proto.pause = function pause(event) {
	        if (!event) {
	          this._isPaused = true;
	        }

	        if (SelectorEngine__default['default'].findOne(SELECTOR_NEXT_PREV, this._element)) {
	          triggerTransitionEnd(this._element);
	          this.cycle(true);
	        }

	        clearInterval(this._interval);
	        this._interval = null;
	      };

	      _proto.cycle = function cycle(event) {
	        if (!event) {
	          this._isPaused = false;
	        }

	        if (this._interval) {
	          clearInterval(this._interval);
	          this._interval = null;
	        }

	        if (this._config && this._config.interval && !this._isPaused) {
	          this._updateInterval();

	          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
	        }
	      };

	      _proto.to = function to(index) {
	        var _this2 = this;

	        this._activeElement = SelectorEngine__default['default'].findOne(SELECTOR_ACTIVE_ITEM, this._element);

	        var activeIndex = this._getItemIndex(this._activeElement);

	        if (index > this._items.length - 1 || index < 0) {
	          return;
	        }

	        if (this._isSliding) {
	          EventHandler__default['default'].one(this._element, EVENT_SLID, function () {
	            return _this2.to(index);
	          });
	          return;
	        }

	        if (activeIndex === index) {
	          this.pause();
	          this.cycle();
	          return;
	        }

	        var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

	        this._slide(direction, this._items[index]);
	      };

	      _proto.dispose = function dispose() {
	        _BaseComponent.prototype.dispose.call(this);

	        EventHandler__default['default'].off(this._element, EVENT_KEY);
	        this._items = null;
	        this._config = null;
	        this._interval = null;
	        this._isPaused = null;
	        this._isSliding = null;
	        this._activeElement = null;
	        this._indicatorsElement = null;
	      } // Private
	      ;

	      _proto._getConfig = function _getConfig(config) {
	        config = _extends({}, Default, config);
	        typeCheckConfig(NAME, config, DefaultType);
	        return config;
	      };

	      _proto._handleSwipe = function _handleSwipe() {
	        var absDeltax = Math.abs(this.touchDeltaX);

	        if (absDeltax <= SWIPE_THRESHOLD) {
	          return;
	        }

	        var direction = absDeltax / this.touchDeltaX;
	        this.touchDeltaX = 0; // swipe left

	        if (direction > 0) {
	          if (isRTL) {
	            this.next();
	          } else {
	            this.prev();
	          }
	        } // swipe right


	        if (direction < 0) {
	          if (isRTL) {
	            this.prev();
	          } else {
	            this.next();
	          }
	        }
	      };

	      _proto._addEventListeners = function _addEventListeners() {
	        var _this3 = this;

	        if (this._config.keyboard) {
	          EventHandler__default['default'].on(this._element, EVENT_KEYDOWN, function (event) {
	            return _this3._keydown(event);
	          });
	        }

	        if (this._config.pause === 'hover') {
	          EventHandler__default['default'].on(this._element, EVENT_MOUSEENTER, function (event) {
	            return _this3.pause(event);
	          });
	          EventHandler__default['default'].on(this._element, EVENT_MOUSELEAVE, function (event) {
	            return _this3.cycle(event);
	          });
	        }

	        if (this._config.touch && this._touchSupported) {
	          this._addTouchEventListeners();
	        }
	      };

	      _proto._addTouchEventListeners = function _addTouchEventListeners() {
	        var _this4 = this;

	        var start = function start(event) {
	          if (_this4._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
	            _this4.touchStartX = event.clientX;
	          } else if (!_this4._pointerEvent) {
	            _this4.touchStartX = event.touches[0].clientX;
	          }
	        };

	        var move = function move(event) {
	          // ensure swiping with one touch and not pinching
	          if (event.touches && event.touches.length > 1) {
	            _this4.touchDeltaX = 0;
	          } else {
	            _this4.touchDeltaX = event.touches[0].clientX - _this4.touchStartX;
	          }
	        };

	        var end = function end(event) {
	          if (_this4._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
	            _this4.touchDeltaX = event.clientX - _this4.touchStartX;
	          }

	          _this4._handleSwipe();

	          if (_this4._config.pause === 'hover') {
	            // If it's a touch-enabled device, mouseenter/leave are fired as
	            // part of the mouse compatibility events on first tap - the carousel
	            // would stop cycling until user tapped out of it;
	            // here, we listen for touchend, explicitly pause the carousel
	            // (as if it's the second time we tap on it, mouseenter compat event
	            // is NOT fired) and after a timeout (to allow for mouse compatibility
	            // events to fire) we explicitly restart cycling
	            _this4.pause();

	            if (_this4.touchTimeout) {
	              clearTimeout(_this4.touchTimeout);
	            }

	            _this4.touchTimeout = setTimeout(function (event) {
	              return _this4.cycle(event);
	            }, TOUCHEVENT_COMPAT_WAIT + _this4._config.interval);
	          }
	        };

	        SelectorEngine__default['default'].find(SELECTOR_ITEM_IMG, this._element).forEach(function (itemImg) {
	          EventHandler__default['default'].on(itemImg, EVENT_DRAG_START, function (e) {
	            return e.preventDefault();
	          });
	        });

	        if (this._pointerEvent) {
	          EventHandler__default['default'].on(this._element, EVENT_POINTERDOWN, function (event) {
	            return start(event);
	          });
	          EventHandler__default['default'].on(this._element, EVENT_POINTERUP, function (event) {
	            return end(event);
	          });

	          this._element.classList.add(CLASS_NAME_POINTER_EVENT);
	        } else {
	          EventHandler__default['default'].on(this._element, EVENT_TOUCHSTART, function (event) {
	            return start(event);
	          });
	          EventHandler__default['default'].on(this._element, EVENT_TOUCHMOVE, function (event) {
	            return move(event);
	          });
	          EventHandler__default['default'].on(this._element, EVENT_TOUCHEND, function (event) {
	            return end(event);
	          });
	        }
	      };

	      _proto._keydown = function _keydown(event) {
	        if (/input|textarea/i.test(event.target.tagName)) {
	          return;
	        }

	        if (event.key === ARROW_LEFT_KEY) {
	          event.preventDefault();

	          if (isRTL) {
	            this.next();
	          } else {
	            this.prev();
	          }
	        } else if (event.key === ARROW_RIGHT_KEY) {
	          event.preventDefault();

	          if (isRTL) {
	            this.prev();
	          } else {
	            this.next();
	          }
	        }
	      };

	      _proto._getItemIndex = function _getItemIndex(element) {
	        this._items = element && element.parentNode ? SelectorEngine__default['default'].find(SELECTOR_ITEM, element.parentNode) : [];
	        return this._items.indexOf(element);
	      };

	      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
	        var isNextDirection = direction === DIRECTION_NEXT;
	        var isPrevDirection = direction === DIRECTION_PREV;

	        var activeIndex = this._getItemIndex(activeElement);

	        var lastItemIndex = this._items.length - 1;
	        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

	        if (isGoingToWrap && !this._config.wrap) {
	          return activeElement;
	        }

	        var delta = direction === DIRECTION_PREV ? -1 : 1;
	        var itemIndex = (activeIndex + delta) % this._items.length;
	        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
	      };

	      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
	        var targetIndex = this._getItemIndex(relatedTarget);

	        var fromIndex = this._getItemIndex(SelectorEngine__default['default'].findOne(SELECTOR_ACTIVE_ITEM, this._element));

	        return EventHandler__default['default'].trigger(this._element, EVENT_SLIDE, {
	          relatedTarget: relatedTarget,
	          direction: eventDirectionName,
	          from: fromIndex,
	          to: targetIndex
	        });
	      };

	      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
	        if (this._indicatorsElement) {
	          var indicators = SelectorEngine__default['default'].find(SELECTOR_ACTIVE, this._indicatorsElement);

	          for (var i = 0; i < indicators.length; i++) {
	            indicators[i].classList.remove(CLASS_NAME_ACTIVE);
	          }

	          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

	          if (nextIndicator) {
	            nextIndicator.classList.add(CLASS_NAME_ACTIVE);
	          }
	        }
	      };

	      _proto._updateInterval = function _updateInterval() {
	        var element = this._activeElement || SelectorEngine__default['default'].findOne(SELECTOR_ACTIVE_ITEM, this._element);

	        if (!element) {
	          return;
	        }

	        var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

	        if (elementInterval) {
	          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
	          this._config.interval = elementInterval;
	        } else {
	          this._config.interval = this._config.defaultInterval || this._config.interval;
	        }
	      };

	      _proto._slide = function _slide(direction, element) {
	        var _this5 = this;

	        var activeElement = SelectorEngine__default['default'].findOne(SELECTOR_ACTIVE_ITEM, this._element);

	        var activeElementIndex = this._getItemIndex(activeElement);

	        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

	        var nextElementIndex = this._getItemIndex(nextElement);

	        var isCycling = Boolean(this._interval);
	        var directionalClassName = direction === DIRECTION_NEXT ? CLASS_NAME_START : CLASS_NAME_END;
	        var orderClassName = direction === DIRECTION_NEXT ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
	        var eventDirectionName = direction === DIRECTION_NEXT ? DIRECTION_LEFT : DIRECTION_RIGHT;

	        if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE)) {
	          this._isSliding = false;
	          return;
	        }

	        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

	        if (slideEvent.defaultPrevented) {
	          return;
	        }

	        if (!activeElement || !nextElement) {
	          // Some weirdness is happening, so we bail
	          return;
	        }

	        this._isSliding = true;

	        if (isCycling) {
	          this.pause();
	        }

	        this._setActiveIndicatorElement(nextElement);

	        this._activeElement = nextElement;

	        if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
	          nextElement.classList.add(orderClassName);
	          reflow(nextElement);
	          activeElement.classList.add(directionalClassName);
	          nextElement.classList.add(directionalClassName);
	          var transitionDuration = getTransitionDurationFromElement(activeElement);
	          EventHandler__default['default'].one(activeElement, 'transitionend', function () {
	            nextElement.classList.remove(directionalClassName, orderClassName);
	            nextElement.classList.add(CLASS_NAME_ACTIVE);
	            activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
	            _this5._isSliding = false;
	            setTimeout(function () {
	              EventHandler__default['default'].trigger(_this5._element, EVENT_SLID, {
	                relatedTarget: nextElement,
	                direction: eventDirectionName,
	                from: activeElementIndex,
	                to: nextElementIndex
	              });
	            }, 0);
	          });
	          emulateTransitionEnd(activeElement, transitionDuration);
	        } else {
	          activeElement.classList.remove(CLASS_NAME_ACTIVE);
	          nextElement.classList.add(CLASS_NAME_ACTIVE);
	          this._isSliding = false;
	          EventHandler__default['default'].trigger(this._element, EVENT_SLID, {
	            relatedTarget: nextElement,
	            direction: eventDirectionName,
	            from: activeElementIndex,
	            to: nextElementIndex
	          });
	        }

	        if (isCycling) {
	          this.cycle();
	        }
	      } // Static
	      ;

	      Carousel.carouselInterface = function carouselInterface(element, config) {
	        var data = Data__default['default'].getData(element, DATA_KEY);

	        var _config = _extends({}, Default, Manipulator__default['default'].getDataAttributes(element));

	        if (typeof config === 'object') {
	          _config = _extends({}, _config, config);
	        }

	        var action = typeof config === 'string' ? config : _config.slide;

	        if (!data) {
	          data = new Carousel(element, _config);
	        }

	        if (typeof config === 'number') {
	          data.to(config);
	        } else if (typeof action === 'string') {
	          if (typeof data[action] === 'undefined') {
	            throw new TypeError("No method named \"" + action + "\"");
	          }

	          data[action]();
	        } else if (_config.interval && _config.ride) {
	          data.pause();
	          data.cycle();
	        }
	      };

	      Carousel.jQueryInterface = function jQueryInterface(config) {
	        return this.each(function () {
	          Carousel.carouselInterface(this, config);
	        });
	      };

	      Carousel.dataApiClickHandler = function dataApiClickHandler(event) {
	        var target = getElementFromSelector(this);

	        if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
	          return;
	        }

	        var config = _extends({}, Manipulator__default['default'].getDataAttributes(target), Manipulator__default['default'].getDataAttributes(this));

	        var slideIndex = this.getAttribute('data-bs-slide-to');

	        if (slideIndex) {
	          config.interval = false;
	        }

	        Carousel.carouselInterface(target, config);

	        if (slideIndex) {
	          Data__default['default'].getData(target, DATA_KEY).to(slideIndex);
	        }

	        event.preventDefault();
	      };

	      _createClass(Carousel, null, [{
	        key: "Default",
	        get: function get() {
	          return Default;
	        }
	      }, {
	        key: "DATA_KEY",
	        get: function get() {
	          return DATA_KEY;
	        }
	      }]);

	      return Carousel;
	    }(BaseComponent);
	    /**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */


	    EventHandler__default['default'].on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
	    EventHandler__default['default'].on(window, EVENT_LOAD_DATA_API, function () {
	      var carousels = SelectorEngine__default['default'].find(SELECTOR_DATA_RIDE);

	      for (var i = 0, len = carousels.length; i < len; i++) {
	        Carousel.carouselInterface(carousels[i], Data__default['default'].getData(carousels[i], DATA_KEY));
	      }
	    });
	    /**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     * add .Carousel to jQuery only if jQuery is present
	     */

	    defineJQueryPlugin(NAME, Carousel);
	    return Carousel;
	  });
	});

	window.addEventListener('load', function () {
	  var _ref;

	  (_ref = []).concat.apply(_ref, document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipNode) {
	    return new Tooltip(tooltipNode);
	  });
	});

}());
