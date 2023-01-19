(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };
    function addTouchClass() {
        if (isMobile.any()) document.documentElement.classList.add("touch");
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    function fullVHfix() {
        const fullScreens = document.querySelectorAll("[data-fullscreen]");
        if (fullScreens.length && isMobile.any()) {
            window.addEventListener("resize", fixHeight);
            function fixHeight() {
                let vh = .01 * window.innerHeight;
                document.documentElement.style.setProperty("--vh", `${vh}px`);
            }
            fixHeight();
        }
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function spollers() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            }));
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach((spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                }));
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                    spollerTitles.forEach((spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    }));
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", (function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    if (spollersBlock.classList.contains("_spoller-init")) {
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        spollerClose.classList.remove("_spoller-active");
                        _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                    }
                }));
            }));
        }
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    function ssr_window_esm_isObject(obj) {
        return null !== obj && "object" === typeof obj && "constructor" in obj && obj.constructor === Object;
    }
    function extend(target = {}, src = {}) {
        Object.keys(src).forEach((key => {
            if ("undefined" === typeof target[key]) target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
        }));
    }
    const ssrDocument = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        getElementById() {
            return null;
        },
        createEvent() {
            return {
                initEvent() {}
            };
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName() {
                    return [];
                }
            };
        },
        createElementNS() {
            return {};
        },
        importNode() {
            return null;
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function ssr_window_esm_getDocument() {
        const doc = "undefined" !== typeof document ? document : {};
        extend(doc, ssrDocument);
        return doc;
    }
    const ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return "";
                }
            };
        },
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia() {
            return {};
        },
        requestAnimationFrame(callback) {
            if ("undefined" === typeof setTimeout) {
                callback();
                return null;
            }
            return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
            if ("undefined" === typeof setTimeout) return;
            clearTimeout(id);
        }
    };
    function ssr_window_esm_getWindow() {
        const win = "undefined" !== typeof window ? window : {};
        extend(win, ssrWindow);
        return win;
    }
    function makeReactive(obj) {
        const proto = obj.__proto__;
        Object.defineProperty(obj, "__proto__", {
            get() {
                return proto;
            },
            set(value) {
                proto.__proto__ = value;
            }
        });
    }
    class Dom7 extends Array {
        constructor(items) {
            if ("number" === typeof items) super(items); else {
                super(...items || []);
                makeReactive(this);
            }
        }
    }
    function arrayFlat(arr = []) {
        const res = [];
        arr.forEach((el => {
            if (Array.isArray(el)) res.push(...arrayFlat(el)); else res.push(el);
        }));
        return res;
    }
    function arrayFilter(arr, callback) {
        return Array.prototype.filter.call(arr, callback);
    }
    function arrayUnique(arr) {
        const uniqueArray = [];
        for (let i = 0; i < arr.length; i += 1) if (-1 === uniqueArray.indexOf(arr[i])) uniqueArray.push(arr[i]);
        return uniqueArray;
    }
    function qsa(selector, context) {
        if ("string" !== typeof selector) return [ selector ];
        const a = [];
        const res = context.querySelectorAll(selector);
        for (let i = 0; i < res.length; i += 1) a.push(res[i]);
        return a;
    }
    function dom7_esm_$(selector, context) {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        let arr = [];
        if (!context && selector instanceof Dom7) return selector;
        if (!selector) return new Dom7(arr);
        if ("string" === typeof selector) {
            const html = selector.trim();
            if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
                let toCreate = "div";
                if (0 === html.indexOf("<li")) toCreate = "ul";
                if (0 === html.indexOf("<tr")) toCreate = "tbody";
                if (0 === html.indexOf("<td") || 0 === html.indexOf("<th")) toCreate = "tr";
                if (0 === html.indexOf("<tbody")) toCreate = "table";
                if (0 === html.indexOf("<option")) toCreate = "select";
                const tempParent = document.createElement(toCreate);
                tempParent.innerHTML = html;
                for (let i = 0; i < tempParent.childNodes.length; i += 1) arr.push(tempParent.childNodes[i]);
            } else arr = qsa(selector.trim(), context || document);
        } else if (selector.nodeType || selector === window || selector === document) arr.push(selector); else if (Array.isArray(selector)) {
            if (selector instanceof Dom7) return selector;
            arr = selector;
        }
        return new Dom7(arrayUnique(arr));
    }
    dom7_esm_$.fn = Dom7.prototype;
    function addClass(...classes) {
        const classNames = arrayFlat(classes.map((c => c.split(" "))));
        this.forEach((el => {
            el.classList.add(...classNames);
        }));
        return this;
    }
    function removeClass(...classes) {
        const classNames = arrayFlat(classes.map((c => c.split(" "))));
        this.forEach((el => {
            el.classList.remove(...classNames);
        }));
        return this;
    }
    function toggleClass(...classes) {
        const classNames = arrayFlat(classes.map((c => c.split(" "))));
        this.forEach((el => {
            classNames.forEach((className => {
                el.classList.toggle(className);
            }));
        }));
    }
    function hasClass(...classes) {
        const classNames = arrayFlat(classes.map((c => c.split(" "))));
        return arrayFilter(this, (el => classNames.filter((className => el.classList.contains(className))).length > 0)).length > 0;
    }
    function attr(attrs, value) {
        if (1 === arguments.length && "string" === typeof attrs) {
            if (this[0]) return this[0].getAttribute(attrs);
            return;
        }
        for (let i = 0; i < this.length; i += 1) if (2 === arguments.length) this[i].setAttribute(attrs, value); else for (const attrName in attrs) {
            this[i][attrName] = attrs[attrName];
            this[i].setAttribute(attrName, attrs[attrName]);
        }
        return this;
    }
    function removeAttr(attr) {
        for (let i = 0; i < this.length; i += 1) this[i].removeAttribute(attr);
        return this;
    }
    function transform(transform) {
        for (let i = 0; i < this.length; i += 1) this[i].style.transform = transform;
        return this;
    }
    function transition(duration) {
        for (let i = 0; i < this.length; i += 1) this[i].style.transitionDuration = "string" !== typeof duration ? `${duration}ms` : duration;
        return this;
    }
    function on(...args) {
        let [eventType, targetSelector, listener, capture] = args;
        if ("function" === typeof args[1]) {
            [eventType, listener, capture] = args;
            targetSelector = void 0;
        }
        if (!capture) capture = false;
        function handleLiveEvent(e) {
            const target = e.target;
            if (!target) return;
            const eventData = e.target.dom7EventData || [];
            if (eventData.indexOf(e) < 0) eventData.unshift(e);
            if (dom7_esm_$(target).is(targetSelector)) listener.apply(target, eventData); else {
                const parents = dom7_esm_$(target).parents();
                for (let k = 0; k < parents.length; k += 1) if (dom7_esm_$(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
            }
        }
        function handleEvent(e) {
            const eventData = e && e.target ? e.target.dom7EventData || [] : [];
            if (eventData.indexOf(e) < 0) eventData.unshift(e);
            listener.apply(this, eventData);
        }
        const events = eventType.split(" ");
        let j;
        for (let i = 0; i < this.length; i += 1) {
            const el = this[i];
            if (!targetSelector) for (j = 0; j < events.length; j += 1) {
                const event = events[j];
                if (!el.dom7Listeners) el.dom7Listeners = {};
                if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
                el.dom7Listeners[event].push({
                    listener,
                    proxyListener: handleEvent
                });
                el.addEventListener(event, handleEvent, capture);
            } else for (j = 0; j < events.length; j += 1) {
                const event = events[j];
                if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
                if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
                el.dom7LiveListeners[event].push({
                    listener,
                    proxyListener: handleLiveEvent
                });
                el.addEventListener(event, handleLiveEvent, capture);
            }
        }
        return this;
    }
    function off(...args) {
        let [eventType, targetSelector, listener, capture] = args;
        if ("function" === typeof args[1]) {
            [eventType, listener, capture] = args;
            targetSelector = void 0;
        }
        if (!capture) capture = false;
        const events = eventType.split(" ");
        for (let i = 0; i < events.length; i += 1) {
            const event = events[i];
            for (let j = 0; j < this.length; j += 1) {
                const el = this[j];
                let handlers;
                if (!targetSelector && el.dom7Listeners) handlers = el.dom7Listeners[event]; else if (targetSelector && el.dom7LiveListeners) handlers = el.dom7LiveListeners[event];
                if (handlers && handlers.length) for (let k = handlers.length - 1; k >= 0; k -= 1) {
                    const handler = handlers[k];
                    if (listener && handler.listener === listener) {
                        el.removeEventListener(event, handler.proxyListener, capture);
                        handlers.splice(k, 1);
                    } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                        el.removeEventListener(event, handler.proxyListener, capture);
                        handlers.splice(k, 1);
                    } else if (!listener) {
                        el.removeEventListener(event, handler.proxyListener, capture);
                        handlers.splice(k, 1);
                    }
                }
            }
        }
        return this;
    }
    function trigger(...args) {
        const window = ssr_window_esm_getWindow();
        const events = args[0].split(" ");
        const eventData = args[1];
        for (let i = 0; i < events.length; i += 1) {
            const event = events[i];
            for (let j = 0; j < this.length; j += 1) {
                const el = this[j];
                if (window.CustomEvent) {
                    const evt = new window.CustomEvent(event, {
                        detail: eventData,
                        bubbles: true,
                        cancelable: true
                    });
                    el.dom7EventData = args.filter(((data, dataIndex) => dataIndex > 0));
                    el.dispatchEvent(evt);
                    el.dom7EventData = [];
                    delete el.dom7EventData;
                }
            }
        }
        return this;
    }
    function transitionEnd(callback) {
        const dom = this;
        function fireCallBack(e) {
            if (e.target !== this) return;
            callback.call(this, e);
            dom.off("transitionend", fireCallBack);
        }
        if (callback) dom.on("transitionend", fireCallBack);
        return this;
    }
    function dom7_esm_outerWidth(includeMargins) {
        if (this.length > 0) {
            if (includeMargins) {
                const styles = this.styles();
                return this[0].offsetWidth + parseFloat(styles.getPropertyValue("margin-right")) + parseFloat(styles.getPropertyValue("margin-left"));
            }
            return this[0].offsetWidth;
        }
        return null;
    }
    function dom7_esm_outerHeight(includeMargins) {
        if (this.length > 0) {
            if (includeMargins) {
                const styles = this.styles();
                return this[0].offsetHeight + parseFloat(styles.getPropertyValue("margin-top")) + parseFloat(styles.getPropertyValue("margin-bottom"));
            }
            return this[0].offsetHeight;
        }
        return null;
    }
    function offset() {
        if (this.length > 0) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            const el = this[0];
            const box = el.getBoundingClientRect();
            const body = document.body;
            const clientTop = el.clientTop || body.clientTop || 0;
            const clientLeft = el.clientLeft || body.clientLeft || 0;
            const scrollTop = el === window ? window.scrollY : el.scrollTop;
            const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
            return {
                top: box.top + scrollTop - clientTop,
                left: box.left + scrollLeft - clientLeft
            };
        }
        return null;
    }
    function styles() {
        const window = ssr_window_esm_getWindow();
        if (this[0]) return window.getComputedStyle(this[0], null);
        return {};
    }
    function css(props, value) {
        const window = ssr_window_esm_getWindow();
        let i;
        if (1 === arguments.length) if ("string" === typeof props) {
            if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
        } else {
            for (i = 0; i < this.length; i += 1) for (const prop in props) this[i].style[prop] = props[prop];
            return this;
        }
        if (2 === arguments.length && "string" === typeof props) {
            for (i = 0; i < this.length; i += 1) this[i].style[props] = value;
            return this;
        }
        return this;
    }
    function each(callback) {
        if (!callback) return this;
        this.forEach(((el, index) => {
            callback.apply(el, [ el, index ]);
        }));
        return this;
    }
    function filter(callback) {
        const result = arrayFilter(this, callback);
        return dom7_esm_$(result);
    }
    function html(html) {
        if ("undefined" === typeof html) return this[0] ? this[0].innerHTML : null;
        for (let i = 0; i < this.length; i += 1) this[i].innerHTML = html;
        return this;
    }
    function dom7_esm_text(text) {
        if ("undefined" === typeof text) return this[0] ? this[0].textContent.trim() : null;
        for (let i = 0; i < this.length; i += 1) this[i].textContent = text;
        return this;
    }
    function is(selector) {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        const el = this[0];
        let compareWith;
        let i;
        if (!el || "undefined" === typeof selector) return false;
        if ("string" === typeof selector) {
            if (el.matches) return el.matches(selector);
            if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
            if (el.msMatchesSelector) return el.msMatchesSelector(selector);
            compareWith = dom7_esm_$(selector);
            for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
            return false;
        }
        if (selector === document) return el === document;
        if (selector === window) return el === window;
        if (selector.nodeType || selector instanceof Dom7) {
            compareWith = selector.nodeType ? [ selector ] : selector;
            for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
            return false;
        }
        return false;
    }
    function index() {
        let child = this[0];
        let i;
        if (child) {
            i = 0;
            while (null !== (child = child.previousSibling)) if (1 === child.nodeType) i += 1;
            return i;
        }
        return;
    }
    function eq(index) {
        if ("undefined" === typeof index) return this;
        const length = this.length;
        if (index > length - 1) return dom7_esm_$([]);
        if (index < 0) {
            const returnIndex = length + index;
            if (returnIndex < 0) return dom7_esm_$([]);
            return dom7_esm_$([ this[returnIndex] ]);
        }
        return dom7_esm_$([ this[index] ]);
    }
    function append(...els) {
        let newChild;
        const document = ssr_window_esm_getDocument();
        for (let k = 0; k < els.length; k += 1) {
            newChild = els[k];
            for (let i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = newChild;
                while (tempDiv.firstChild) this[i].appendChild(tempDiv.firstChild);
            } else if (newChild instanceof Dom7) for (let j = 0; j < newChild.length; j += 1) this[i].appendChild(newChild[j]); else this[i].appendChild(newChild);
        }
        return this;
    }
    function prepend(newChild) {
        const document = ssr_window_esm_getDocument();
        let i;
        let j;
        for (i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = newChild;
            for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        } else if (newChild instanceof Dom7) for (j = 0; j < newChild.length; j += 1) this[i].insertBefore(newChild[j], this[i].childNodes[0]); else this[i].insertBefore(newChild, this[i].childNodes[0]);
        return this;
    }
    function next(selector) {
        if (this.length > 0) {
            if (selector) {
                if (this[0].nextElementSibling && dom7_esm_$(this[0].nextElementSibling).is(selector)) return dom7_esm_$([ this[0].nextElementSibling ]);
                return dom7_esm_$([]);
            }
            if (this[0].nextElementSibling) return dom7_esm_$([ this[0].nextElementSibling ]);
            return dom7_esm_$([]);
        }
        return dom7_esm_$([]);
    }
    function nextAll(selector) {
        const nextEls = [];
        let el = this[0];
        if (!el) return dom7_esm_$([]);
        while (el.nextElementSibling) {
            const next = el.nextElementSibling;
            if (selector) {
                if (dom7_esm_$(next).is(selector)) nextEls.push(next);
            } else nextEls.push(next);
            el = next;
        }
        return dom7_esm_$(nextEls);
    }
    function prev(selector) {
        if (this.length > 0) {
            const el = this[0];
            if (selector) {
                if (el.previousElementSibling && dom7_esm_$(el.previousElementSibling).is(selector)) return dom7_esm_$([ el.previousElementSibling ]);
                return dom7_esm_$([]);
            }
            if (el.previousElementSibling) return dom7_esm_$([ el.previousElementSibling ]);
            return dom7_esm_$([]);
        }
        return dom7_esm_$([]);
    }
    function prevAll(selector) {
        const prevEls = [];
        let el = this[0];
        if (!el) return dom7_esm_$([]);
        while (el.previousElementSibling) {
            const prev = el.previousElementSibling;
            if (selector) {
                if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
            } else prevEls.push(prev);
            el = prev;
        }
        return dom7_esm_$(prevEls);
    }
    function dom7_esm_parent(selector) {
        const parents = [];
        for (let i = 0; i < this.length; i += 1) if (null !== this[i].parentNode) if (selector) {
            if (dom7_esm_$(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
        } else parents.push(this[i].parentNode);
        return dom7_esm_$(parents);
    }
    function parents(selector) {
        const parents = [];
        for (let i = 0; i < this.length; i += 1) {
            let parent = this[i].parentNode;
            while (parent) {
                if (selector) {
                    if (dom7_esm_$(parent).is(selector)) parents.push(parent);
                } else parents.push(parent);
                parent = parent.parentNode;
            }
        }
        return dom7_esm_$(parents);
    }
    function closest(selector) {
        let closest = this;
        if ("undefined" === typeof selector) return dom7_esm_$([]);
        if (!closest.is(selector)) closest = closest.parents(selector).eq(0);
        return closest;
    }
    function find(selector) {
        const foundElements = [];
        for (let i = 0; i < this.length; i += 1) {
            const found = this[i].querySelectorAll(selector);
            for (let j = 0; j < found.length; j += 1) foundElements.push(found[j]);
        }
        return dom7_esm_$(foundElements);
    }
    function children(selector) {
        const children = [];
        for (let i = 0; i < this.length; i += 1) {
            const childNodes = this[i].children;
            for (let j = 0; j < childNodes.length; j += 1) if (!selector || dom7_esm_$(childNodes[j]).is(selector)) children.push(childNodes[j]);
        }
        return dom7_esm_$(children);
    }
    function remove() {
        for (let i = 0; i < this.length; i += 1) if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
        return this;
    }
    const noTrigger = "resize scroll".split(" ");
    function shortcut(name) {
        function eventHandler(...args) {
            if ("undefined" === typeof args[0]) {
                for (let i = 0; i < this.length; i += 1) if (noTrigger.indexOf(name) < 0) if (name in this[i]) this[i][name](); else dom7_esm_$(this[i]).trigger(name);
                return this;
            }
            return this.on(name, ...args);
        }
        return eventHandler;
    }
    shortcut("click");
    shortcut("blur");
    shortcut("focus");
    shortcut("focusin");
    shortcut("focusout");
    shortcut("keyup");
    shortcut("keydown");
    shortcut("keypress");
    shortcut("submit");
    shortcut("change");
    shortcut("mousedown");
    shortcut("mousemove");
    shortcut("mouseup");
    shortcut("mouseenter");
    shortcut("mouseleave");
    shortcut("mouseout");
    shortcut("mouseover");
    shortcut("touchstart");
    shortcut("touchend");
    shortcut("touchmove");
    shortcut("resize");
    shortcut("scroll");
    const Methods = {
        addClass,
        removeClass,
        hasClass,
        toggleClass,
        attr,
        removeAttr,
        transform,
        transition,
        on,
        off,
        trigger,
        transitionEnd,
        outerWidth: dom7_esm_outerWidth,
        outerHeight: dom7_esm_outerHeight,
        styles,
        offset,
        css,
        each,
        html,
        text: dom7_esm_text,
        is,
        index,
        eq,
        append,
        prepend,
        next,
        nextAll,
        prev,
        prevAll,
        parent: dom7_esm_parent,
        parents,
        closest,
        find,
        children,
        filter,
        remove
    };
    Object.keys(Methods).forEach((methodName => {
        Object.defineProperty(dom7_esm_$.fn, methodName, {
            value: Methods[methodName],
            writable: true
        });
    }));
    const dom = dom7_esm_$;
    function deleteProps(obj) {
        const object = obj;
        Object.keys(object).forEach((key => {
            try {
                object[key] = null;
            } catch (e) {}
            try {
                delete object[key];
            } catch (e) {}
        }));
    }
    function utils_nextTick(callback, delay = 0) {
        return setTimeout(callback, delay);
    }
    function utils_now() {
        return Date.now();
    }
    function utils_getComputedStyle(el) {
        const window = ssr_window_esm_getWindow();
        let style;
        if (window.getComputedStyle) style = window.getComputedStyle(el, null);
        if (!style && el.currentStyle) style = el.currentStyle;
        if (!style) style = el.style;
        return style;
    }
    function utils_getTranslate(el, axis = "x") {
        const window = ssr_window_esm_getWindow();
        let matrix;
        let curTransform;
        let transformMatrix;
        const curStyle = utils_getComputedStyle(el, null);
        if (window.WebKitCSSMatrix) {
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
            transformMatrix = new window.WebKitCSSMatrix("none" === curTransform ? "" : curTransform);
        } else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
            matrix = transformMatrix.toString().split(",");
        }
        if ("x" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (16 === matrix.length) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
        if ("y" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (16 === matrix.length) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
        return curTransform || 0;
    }
    function utils_isObject(o) {
        return "object" === typeof o && null !== o && o.constructor && "Object" === Object.prototype.toString.call(o).slice(8, -1);
    }
    function isNode(node) {
        if ("undefined" !== typeof window && "undefined" !== typeof window.HTMLElement) return node instanceof HTMLElement;
        return node && (1 === node.nodeType || 11 === node.nodeType);
    }
    function utils_extend(...args) {
        const to = Object(args[0]);
        const noExtend = [ "__proto__", "constructor", "prototype" ];
        for (let i = 1; i < args.length; i += 1) {
            const nextSource = args[i];
            if (void 0 !== nextSource && null !== nextSource && !isNode(nextSource)) {
                const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (void 0 !== desc && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                        to[nextKey] = {};
                        if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                    } else to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
    function utils_setCSSProperty(el, varName, varValue) {
        el.style.setProperty(varName, varValue);
    }
    function animateCSSModeScroll({swiper, targetPosition, side}) {
        const window = ssr_window_esm_getWindow();
        const startPosition = -swiper.translate;
        let startTime = null;
        let time;
        const duration = swiper.params.speed;
        swiper.wrapperEl.style.scrollSnapType = "none";
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        const dir = targetPosition > startPosition ? "next" : "prev";
        const isOutOfBound = (current, target) => "next" === dir && current >= target || "prev" === dir && current <= target;
        const animate = () => {
            time = (new Date).getTime();
            if (null === startTime) startTime = time;
            const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
            const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
            let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
            if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
            swiper.wrapperEl.scrollTo({
                [side]: currentPosition
            });
            if (isOutOfBound(currentPosition, targetPosition)) {
                swiper.wrapperEl.style.overflow = "hidden";
                swiper.wrapperEl.style.scrollSnapType = "";
                setTimeout((() => {
                    swiper.wrapperEl.style.overflow = "";
                    swiper.wrapperEl.scrollTo({
                        [side]: currentPosition
                    });
                }));
                window.cancelAnimationFrame(swiper.cssModeFrameID);
                return;
            }
            swiper.cssModeFrameID = window.requestAnimationFrame(animate);
        };
        animate();
    }
    let support;
    function calcSupport() {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        return {
            smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
            passiveListener: function checkPassiveListener() {
                let supportsPassive = false;
                try {
                    const opts = Object.defineProperty({}, "passive", {
                        get() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener("testPassiveListener", null, opts);
                } catch (e) {}
                return supportsPassive;
            }(),
            gestures: function checkGestures() {
                return "ongesturestart" in window;
            }()
        };
    }
    function getSupport() {
        if (!support) support = calcSupport();
        return support;
    }
    let deviceCached;
    function calcDevice({userAgent} = {}) {
        const support = getSupport();
        const window = ssr_window_esm_getWindow();
        const platform = window.navigator.platform;
        const ua = userAgent || window.navigator.userAgent;
        const device = {
            ios: false,
            android: false
        };
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        const windows = "Win32" === platform;
        let macos = "MacIntel" === platform;
        const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
        if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
            ipad = ua.match(/(Version)\/([\d.]+)/);
            if (!ipad) ipad = [ 0, 1, "13_0_0" ];
            macos = false;
        }
        if (android && !windows) {
            device.os = "android";
            device.android = true;
        }
        if (ipad || iphone || ipod) {
            device.os = "ios";
            device.ios = true;
        }
        return device;
    }
    function getDevice(overrides = {}) {
        if (!deviceCached) deviceCached = calcDevice(overrides);
        return deviceCached;
    }
    let browser;
    function calcBrowser() {
        const window = ssr_window_esm_getWindow();
        function isSafari() {
            const ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
        }
        return {
            isSafari: isSafari(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
        };
    }
    function getBrowser() {
        if (!browser) browser = calcBrowser();
        return browser;
    }
    function Resize({swiper, on, emit}) {
        const window = ssr_window_esm_getWindow();
        let observer = null;
        let animationFrame = null;
        const resizeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("beforeResize");
            emit("resize");
        };
        const createObserver = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            observer = new ResizeObserver((entries => {
                animationFrame = window.requestAnimationFrame((() => {
                    const {width, height} = swiper;
                    let newWidth = width;
                    let newHeight = height;
                    entries.forEach((({contentBoxSize, contentRect, target}) => {
                        if (target && target !== swiper.el) return;
                        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                    }));
                    if (newWidth !== width || newHeight !== height) resizeHandler();
                }));
            }));
            observer.observe(swiper.el);
        };
        const removeObserver = () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            if (observer && observer.unobserve && swiper.el) {
                observer.unobserve(swiper.el);
                observer = null;
            }
        };
        const orientationChangeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("orientationchange");
        };
        on("init", (() => {
            if (swiper.params.resizeObserver && "undefined" !== typeof window.ResizeObserver) {
                createObserver();
                return;
            }
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("orientationchange", orientationChangeHandler);
        }));
        on("destroy", (() => {
            removeObserver();
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", orientationChangeHandler);
        }));
    }
    function Observer({swiper, extendParams, on, emit}) {
        const observers = [];
        const window = ssr_window_esm_getWindow();
        const attach = (target, options = {}) => {
            const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            const observer = new ObserverFunc((mutations => {
                if (1 === mutations.length) {
                    emit("observerUpdate", mutations[0]);
                    return;
                }
                const observerUpdate = function observerUpdate() {
                    emit("observerUpdate", mutations[0]);
                };
                if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
            }));
            observer.observe(target, {
                attributes: "undefined" === typeof options.attributes ? true : options.attributes,
                childList: "undefined" === typeof options.childList ? true : options.childList,
                characterData: "undefined" === typeof options.characterData ? true : options.characterData
            });
            observers.push(observer);
        };
        const init = () => {
            if (!swiper.params.observer) return;
            if (swiper.params.observeParents) {
                const containerParents = swiper.$el.parents();
                for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
            }
            attach(swiper.$el[0], {
                childList: swiper.params.observeSlideChildren
            });
            attach(swiper.$wrapperEl[0], {
                attributes: false
            });
        };
        const destroy = () => {
            observers.forEach((observer => {
                observer.disconnect();
            }));
            observers.splice(0, observers.length);
        };
        extendParams({
            observer: false,
            observeParents: false,
            observeSlideChildren: false
        });
        on("init", init);
        on("destroy", destroy);
    }
    const events_emitter = {
        on(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if ("function" !== typeof handler) return self;
            const method = priority ? "unshift" : "push";
            events.split(" ").forEach((event => {
                if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                self.eventsListeners[event][method](handler);
            }));
            return self;
        },
        once(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if ("function" !== typeof handler) return self;
            function onceHandler(...args) {
                self.off(events, onceHandler);
                if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                handler.apply(self, args);
            }
            onceHandler.__emitterProxy = handler;
            return self.on(events, onceHandler, priority);
        },
        onAny(handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if ("function" !== typeof handler) return self;
            const method = priority ? "unshift" : "push";
            if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
            return self;
        },
        offAny(handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsAnyListeners) return self;
            const index = self.eventsAnyListeners.indexOf(handler);
            if (index >= 0) self.eventsAnyListeners.splice(index, 1);
            return self;
        },
        off(events, handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            events.split(" ").forEach((event => {
                if ("undefined" === typeof handler) self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                    if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                }));
            }));
            return self;
        },
        emit(...args) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            let events;
            let data;
            let context;
            if ("string" === typeof args[0] || Array.isArray(args[0])) {
                events = args[0];
                data = args.slice(1, args.length);
                context = self;
            } else {
                events = args[0].events;
                data = args[0].data;
                context = args[0].context || self;
            }
            data.unshift(context);
            const eventsArray = Array.isArray(events) ? events : events.split(" ");
            eventsArray.forEach((event => {
                if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                    eventHandler.apply(context, [ event, ...data ]);
                }));
                if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                    eventHandler.apply(context, data);
                }));
            }));
            return self;
        }
    };
    function updateSize() {
        const swiper = this;
        let width;
        let height;
        const $el = swiper.$el;
        if ("undefined" !== typeof swiper.params.width && null !== swiper.params.width) width = swiper.params.width; else width = $el[0].clientWidth;
        if ("undefined" !== typeof swiper.params.height && null !== swiper.params.height) height = swiper.params.height; else height = $el[0].clientHeight;
        if (0 === width && swiper.isHorizontal() || 0 === height && swiper.isVertical()) return;
        width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
        height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
        if (Number.isNaN(width)) width = 0;
        if (Number.isNaN(height)) height = 0;
        Object.assign(swiper, {
            width,
            height,
            size: swiper.isHorizontal() ? width : height
        });
    }
    function updateSlides() {
        const swiper = this;
        function getDirectionLabel(property) {
            if (swiper.isHorizontal()) return property;
            return {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[property];
        }
        function getDirectionPropertyValue(node, label) {
            return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
        }
        const params = swiper.params;
        const {$wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
        const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        let snapGrid = [];
        const slidesGrid = [];
        const slidesSizesGrid = [];
        let offsetBefore = params.slidesOffsetBefore;
        if ("function" === typeof offsetBefore) offsetBefore = params.slidesOffsetBefore.call(swiper);
        let offsetAfter = params.slidesOffsetAfter;
        if ("function" === typeof offsetAfter) offsetAfter = params.slidesOffsetAfter.call(swiper);
        const previousSnapGridLength = swiper.snapGrid.length;
        const previousSlidesGridLength = swiper.slidesGrid.length;
        let spaceBetween = params.spaceBetween;
        let slidePosition = -offsetBefore;
        let prevSlideSize = 0;
        let index = 0;
        if ("undefined" === typeof swiperSize) return;
        if ("string" === typeof spaceBetween && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
        swiper.virtualSize = -spaceBetween;
        if (rtl) slides.css({
            marginLeft: "",
            marginBottom: "",
            marginTop: ""
        }); else slides.css({
            marginRight: "",
            marginBottom: "",
            marginTop: ""
        });
        if (params.centeredSlides && params.cssMode) {
            utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
            utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
        }
        const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
        if (gridEnabled) swiper.grid.initSlides(slidesLength);
        let slideSize;
        const shouldResetSlideSize = "auto" === params.slidesPerView && params.breakpoints && Object.keys(params.breakpoints).filter((key => "undefined" !== typeof params.breakpoints[key].slidesPerView)).length > 0;
        for (let i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            const slide = slides.eq(i);
            if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
            if ("none" === slide.css("display")) continue;
            if ("auto" === params.slidesPerView) {
                if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                const slideStyles = getComputedStyle(slide[0]);
                const currentTransform = slide[0].style.transform;
                const currentWebKitTransform = slide[0].style.webkitTransform;
                if (currentTransform) slide[0].style.transform = "none";
                if (currentWebKitTransform) slide[0].style.webkitTransform = "none";
                if (params.roundLengths) slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true); else {
                    const width = getDirectionPropertyValue(slideStyles, "width");
                    const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                    const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                    const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                    const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                    const boxSizing = slideStyles.getPropertyValue("box-sizing");
                    if (boxSizing && "border-box" === boxSizing) slideSize = width + marginLeft + marginRight; else {
                        const {clientWidth, offsetWidth} = slide[0];
                        slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                    }
                }
                if (currentTransform) slide[0].style.transform = currentTransform;
                if (currentWebKitTransform) slide[0].style.webkitTransform = currentWebKitTransform;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
            } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
            }
            if (slides[i]) slides[i].swiperSlideSize = slideSize;
            slidesSizesGrid.push(slideSize);
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (0 === prevSlideSize && 0 !== i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (0 === i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
            } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }
            swiper.virtualSize += slideSize + spaceBetween;
            prevSlideSize = slideSize;
            index += 1;
        }
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
        if (rtl && wrongRTL && ("slide" === params.effect || "coverflow" === params.effect)) $wrapperEl.css({
            width: `${swiper.virtualSize + params.spaceBetween}px`
        });
        if (params.setWrapperSize) $wrapperEl.css({
            [getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
        });
        if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
        if (!params.centeredSlides) {
            const newSlidesGrid = [];
            for (let i = 0; i < snapGrid.length; i += 1) {
                let slidesGridItem = snapGrid[i];
                if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
        }
        if (0 === snapGrid.length) snapGrid = [ 0 ];
        if (0 !== params.spaceBetween) {
            const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
            slides.filter(((_, slideIndex) => {
                if (!params.cssMode) return true;
                if (slideIndex === slides.length - 1) return false;
                return true;
            })).css({
                [key]: `${spaceBetween}px`
            });
        }
        if (params.centeredSlides && params.centeredSlidesBounds) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
            }));
            allSlidesSize -= params.spaceBetween;
            const maxSnap = allSlidesSize - swiperSize;
            snapGrid = snapGrid.map((snap => {
                if (snap < 0) return -offsetBefore;
                if (snap > maxSnap) return maxSnap + offsetAfter;
                return snap;
            }));
        }
        if (params.centerInsufficientSlides) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
            }));
            allSlidesSize -= params.spaceBetween;
            if (allSlidesSize < swiperSize) {
                const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                snapGrid.forEach(((snap, snapIndex) => {
                    snapGrid[snapIndex] = snap - allSlidesOffset;
                }));
                slidesGrid.forEach(((snap, snapIndex) => {
                    slidesGrid[snapIndex] = snap + allSlidesOffset;
                }));
            }
        }
        Object.assign(swiper, {
            slides,
            snapGrid,
            slidesGrid,
            slidesSizesGrid
        });
        if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
            utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
            utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
            const addToSnapGrid = -swiper.snapGrid[0];
            const addToSlidesGrid = -swiper.slidesGrid[0];
            swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
            swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
        }
        if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
        if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            swiper.emit("snapGridLengthChange");
        }
        if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (!isVirtual && !params.cssMode && ("slide" === params.effect || "fade" === params.effect)) {
            const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
            const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);
            if (slidesLength <= params.maxBackfaceHiddenSlides) {
                if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
            } else if (hasClassBackfaceClassAdded) swiper.$el.removeClass(backFaceHiddenClass);
        }
    }
    function updateAutoHeight(speed) {
        const swiper = this;
        const activeSlides = [];
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let newHeight = 0;
        let i;
        if ("number" === typeof speed) swiper.setTransition(speed); else if (true === speed) swiper.setTransition(swiper.params.speed);
        const getSlideByIndex = index => {
            if (isVirtual) return swiper.slides.filter((el => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index))[0];
            return swiper.slides.eq(index)[0];
        };
        if ("auto" !== swiper.params.slidesPerView && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || dom([])).each((slide => {
            activeSlides.push(slide);
        })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
        } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
        for (i = 0; i < activeSlides.length; i += 1) if ("undefined" !== typeof activeSlides[i]) {
            const height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight;
        }
        if (newHeight || 0 === newHeight) swiper.$wrapperEl.css("height", `${newHeight}px`);
    }
    function updateSlidesOffset() {
        const swiper = this;
        const slides = swiper.slides;
        for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
    function updateSlidesProgress(translate = this && this.translate || 0) {
        const swiper = this;
        const params = swiper.params;
        const {slides, rtlTranslate: rtl, snapGrid} = swiper;
        if (0 === slides.length) return;
        if ("undefined" === typeof slides[0].swiperSlideOffset) swiper.updateSlidesOffset();
        let offsetCenter = -translate;
        if (rtl) offsetCenter = translate;
        slides.removeClass(params.slideVisibleClass);
        swiper.visibleSlidesIndexes = [];
        swiper.visibleSlides = [];
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            let slideOffset = slide.swiperSlideOffset;
            if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
            const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
            const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
            const slideBefore = -(offsetCenter - slideOffset);
            const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
            const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
            if (isVisible) {
                swiper.visibleSlides.push(slide);
                swiper.visibleSlidesIndexes.push(i);
                slides.eq(i).addClass(params.slideVisibleClass);
            }
            slide.progress = rtl ? -slideProgress : slideProgress;
            slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
        }
        swiper.visibleSlides = dom(swiper.visibleSlides);
    }
    function updateProgress(translate) {
        const swiper = this;
        if ("undefined" === typeof translate) {
            const multiplier = swiper.rtlTranslate ? -1 : 1;
            translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
        }
        const params = swiper.params;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        let {progress, isBeginning, isEnd} = swiper;
        const wasBeginning = isBeginning;
        const wasEnd = isEnd;
        if (0 === translatesDiff) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
        } else {
            progress = (translate - swiper.minTranslate()) / translatesDiff;
            isBeginning = progress <= 0;
            isEnd = progress >= 1;
        }
        Object.assign(swiper, {
            progress,
            isBeginning,
            isEnd
        });
        if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
        if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
        if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
        if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
        swiper.emit("progress", progress);
    }
    function updateSlidesClasses() {
        const swiper = this;
        const {slides, params, $wrapperEl, activeIndex, realIndex} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
        let activeSlide;
        if (isVirtual) activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides.eq(activeIndex);
        activeSlide.addClass(params.slideActiveClass);
        if (params.loop) if (activeSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
        let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
        if (params.loop && 0 === nextSlide.length) {
            nextSlide = slides.eq(0);
            nextSlide.addClass(params.slideNextClass);
        }
        let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
        if (params.loop && 0 === prevSlide.length) {
            prevSlide = slides.eq(-1);
            prevSlide.addClass(params.slidePrevClass);
        }
        if (params.loop) {
            if (nextSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
            if (prevSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
        }
        swiper.emitSlidesClasses();
    }
    function updateActiveIndex(newActiveIndex) {
        const swiper = this;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        const {slidesGrid, snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
        let activeIndex = newActiveIndex;
        let snapIndex;
        if ("undefined" === typeof activeIndex) {
            for (let i = 0; i < slidesGrid.length; i += 1) if ("undefined" !== typeof slidesGrid[i + 1]) {
                if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
            } else if (translate >= slidesGrid[i]) activeIndex = i;
            if (params.normalizeSlideIndex) if (activeIndex < 0 || "undefined" === typeof activeIndex) activeIndex = 0;
        }
        if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
            const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
            snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
        }
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        if (activeIndex === previousIndex) {
            if (snapIndex !== previousSnapIndex) {
                swiper.snapIndex = snapIndex;
                swiper.emit("snapIndexChange");
            }
            return;
        }
        const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
        Object.assign(swiper, {
            snapIndex,
            realIndex,
            previousIndex,
            activeIndex
        });
        swiper.emit("activeIndexChange");
        swiper.emit("snapIndexChange");
        if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
        if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
    }
    function updateClickedSlide(e) {
        const swiper = this;
        const params = swiper.params;
        const slide = dom(e).closest(`.${params.slideClass}`)[0];
        let slideFound = false;
        let slideIndex;
        if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
        }
        if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(dom(slide).attr("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
        } else {
            swiper.clickedSlide = void 0;
            swiper.clickedIndex = void 0;
            return;
        }
        if (params.slideToClickedSlide && void 0 !== swiper.clickedIndex && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
    }
    const update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
    };
    function getSwiperTranslate(axis = (this.isHorizontal() ? "x" : "y")) {
        const swiper = this;
        const {params, rtlTranslate: rtl, translate, $wrapperEl} = swiper;
        if (params.virtualTranslate) return rtl ? -translate : translate;
        if (params.cssMode) return translate;
        let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
        if (rtl) currentTranslate = -currentTranslate;
        return currentTranslate || 0;
    }
    function setTranslate(translate, byController) {
        const swiper = this;
        const {rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress} = swiper;
        let x = 0;
        let y = 0;
        const z = 0;
        if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
        if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
        }
        if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y;
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (0 === translatesDiff) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== progress) swiper.updateProgress(translate);
        swiper.emit("setTranslate", swiper.translate, byController);
    }
    function minTranslate() {
        return -this.snapGrid[0];
    }
    function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
    }
    function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
        const swiper = this;
        const {params, wrapperEl} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition) return false;
        const minTranslate = swiper.minTranslate();
        const maxTranslate = swiper.maxTranslate();
        let newTranslate;
        if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
        swiper.updateProgress(newTranslate);
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            if (0 === speed) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: -newTranslate,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: -newTranslate,
                    behavior: "smooth"
                });
            }
            return true;
        }
        if (0 === speed) {
            swiper.setTransition(0);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionEnd");
            }
        } else {
            swiper.setTransition(speed);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionStart");
            }
            if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.onTranslateToWrapperTransitionEnd = null;
                    delete swiper.onTranslateToWrapperTransitionEnd;
                    if (runCallbacks) swiper.emit("transitionEnd");
                };
                swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
            }
        }
        return true;
    }
    const translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
    };
    function setTransition(duration, byController) {
        const swiper = this;
        if (!swiper.params.cssMode) swiper.$wrapperEl.transition(duration);
        swiper.emit("setTransition", duration, byController);
    }
    function transitionEmit({swiper, runCallbacks, direction, step}) {
        const {activeIndex, previousIndex} = swiper;
        let dir = direction;
        if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
        swiper.emit(`transition${step}`);
        if (runCallbacks && activeIndex !== previousIndex) {
            if ("reset" === dir) {
                swiper.emit(`slideResetTransition${step}`);
                return;
            }
            swiper.emit(`slideChangeTransition${step}`);
            if ("next" === dir) swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
        }
    }
    function transitionStart(runCallbacks = true, direction) {
        const swiper = this;
        const {params} = swiper;
        if (params.cssMode) return;
        if (params.autoHeight) swiper.updateAutoHeight();
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "Start"
        });
    }
    function transitionEnd_transitionEnd(runCallbacks = true, direction) {
        const swiper = this;
        const {params} = swiper;
        swiper.animating = false;
        if (params.cssMode) return;
        swiper.setTransition(0);
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "End"
        });
    }
    const core_transition = {
        setTransition,
        transitionStart,
        transitionEnd: transitionEnd_transitionEnd
    };
    function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
        if ("number" !== typeof index && "string" !== typeof index) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
        if ("string" === typeof index) {
            const indexAsNumber = parseInt(index, 10);
            const isValidNumber = isFinite(indexAsNumber);
            if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
            index = indexAsNumber;
        }
        const swiper = this;
        let slideIndex = index;
        if (slideIndex < 0) slideIndex = 0;
        const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
        let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        const translate = -snapGrid[snapIndex];
        if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
            const normalizedTranslate = -Math.floor(100 * translate);
            const normalizedGrid = Math.floor(100 * slidesGrid[i]);
            const normalizedGridNext = Math.floor(100 * slidesGrid[i + 1]);
            if ("undefined" !== typeof slidesGrid[i + 1]) {
                if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
            } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
        }
        if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) return false;
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
        }
        if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
        swiper.updateProgress(translate);
        let direction;
        if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
        if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
            swiper.updateActiveIndex(slideIndex);
            if (params.autoHeight) swiper.updateAutoHeight();
            swiper.updateSlidesClasses();
            if ("slide" !== params.effect) swiper.setTranslate(translate);
            if ("reset" !== direction) {
                swiper.transitionStart(runCallbacks, direction);
                swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
        }
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            const t = rtl ? translate : -translate;
            if (0 === speed) {
                const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                if (isVirtual) {
                    swiper.wrapperEl.style.scrollSnapType = "none";
                    swiper._immediateVirtual = true;
                }
                wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                if (isVirtual) requestAnimationFrame((() => {
                    swiper.wrapperEl.style.scrollSnapType = "";
                    swiper._swiperImmediateVirtual = false;
                }));
            } else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: t,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: t,
                    behavior: "smooth"
                });
            }
            return true;
        }
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (0 === speed) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
            swiper.animating = true;
            if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                if (!swiper || swiper.destroyed) return;
                if (e.target !== this) return;
                swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
                swiper.onSlideToWrapperTransitionEnd = null;
                delete swiper.onSlideToWrapperTransitionEnd;
                swiper.transitionEnd(runCallbacks, direction);
            };
            swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
        }
        return true;
    }
    function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
        if ("string" === typeof index) {
            const indexAsNumber = parseInt(index, 10);
            const isValidNumber = isFinite(indexAsNumber);
            if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
            index = indexAsNumber;
        }
        const swiper = this;
        let newIndex = index;
        if (swiper.params.loop) newIndex += swiper.loopedSlides;
        return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }
    function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
        const swiper = this;
        const {animating, enabled, params} = swiper;
        if (!enabled) return swiper;
        let perGroup = params.slidesPerGroup;
        if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
        const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
        if (params.loop) {
            if (animating && params.loopPreventsSlide) return false;
            swiper.loopFix();
            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        }
        if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
        return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }
    function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
        const swiper = this;
        const {params, animating, snapGrid, slidesGrid, rtlTranslate, enabled} = swiper;
        if (!enabled) return swiper;
        if (params.loop) {
            if (animating && params.loopPreventsSlide) return false;
            swiper.loopFix();
            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        }
        const translate = rtlTranslate ? swiper.translate : -swiper.translate;
        function normalize(val) {
            if (val < 0) return -Math.floor(Math.abs(val));
            return Math.floor(val);
        }
        const normalizedTranslate = normalize(translate);
        const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
        let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
        if ("undefined" === typeof prevSnap && params.cssMode) {
            let prevSnapIndex;
            snapGrid.forEach(((snap, snapIndex) => {
                if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
            }));
            if ("undefined" !== typeof prevSnapIndex) prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
        let prevIndex = 0;
        if ("undefined" !== typeof prevSnap) {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
            if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) {
                prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                prevIndex = Math.max(prevIndex, 0);
            }
        }
        if (params.rewind && swiper.isBeginning) {
            const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
            return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
        }
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }
    function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
        const swiper = this;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }
    function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = .5) {
        const swiper = this;
        let index = swiper.activeIndex;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
        const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        if (translate >= swiper.snapGrid[snapIndex]) {
            const currentSnap = swiper.snapGrid[snapIndex];
            const nextSnap = swiper.snapGrid[snapIndex + 1];
            if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
        } else {
            const prevSnap = swiper.snapGrid[snapIndex - 1];
            const currentSnap = swiper.snapGrid[snapIndex];
            if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
        }
        index = Math.max(index, 0);
        index = Math.min(index, swiper.slidesGrid.length - 1);
        return swiper.slideTo(index, speed, runCallbacks, internal);
    }
    function slideToClickedSlide() {
        const swiper = this;
        const {params, $wrapperEl} = swiper;
        const slidesPerView = "auto" === params.slidesPerView ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        let slideToIndex = swiper.clickedIndex;
        let realIndex;
        if (params.loop) {
            if (swiper.animating) return;
            realIndex = parseInt(dom(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
            if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                swiper.loopFix();
                slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                swiper.loopFix();
                slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex);
        } else swiper.slideTo(slideToIndex);
    }
    const slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
    };
    function loopCreate() {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const {params, $wrapperEl} = swiper;
        const $selector = $wrapperEl.children().length > 0 ? dom($wrapperEl.children()[0].parentNode) : $wrapperEl;
        $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
        let slides = $selector.children(`.${params.slideClass}`);
        if (params.loopFillGroupWithBlank) {
            const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
            if (blankSlidesNum !== params.slidesPerGroup) {
                for (let i = 0; i < blankSlidesNum; i += 1) {
                    const blankNode = dom(document.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
                    $selector.append(blankNode);
                }
                slides = $selector.children(`.${params.slideClass}`);
            }
        }
        if ("auto" === params.slidesPerView && !params.loopedSlides) params.loopedSlides = slides.length;
        swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
        swiper.loopedSlides += params.loopAdditionalSlides;
        if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) swiper.loopedSlides = slides.length;
        const prependSlides = [];
        const appendSlides = [];
        slides.each(((el, index) => {
            const slide = dom(el);
            slide.attr("data-swiper-slide-index", index);
        }));
        for (let i = 0; i < swiper.loopedSlides; i += 1) {
            const index = i - Math.floor(i / slides.length) * slides.length;
            appendSlides.push(slides.eq(index)[0]);
            prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
        }
        for (let i = 0; i < appendSlides.length; i += 1) $selector.append(dom(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
        for (let i = prependSlides.length - 1; i >= 0; i -= 1) $selector.prepend(dom(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
    function loopFix() {
        const swiper = this;
        swiper.emit("beforeLoopFix");
        const {activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl} = swiper;
        let newIndex;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        const snapTranslate = -snapGrid[activeIndex];
        const diff = snapTranslate - swiper.getTranslate();
        if (activeIndex < loopedSlides) {
            newIndex = slides.length - 3 * loopedSlides + activeIndex;
            newIndex += loopedSlides;
            const slideChanged = swiper.slideTo(newIndex, 0, false, true);
            if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        } else if (activeIndex >= slides.length - loopedSlides) {
            newIndex = -slides.length + activeIndex + loopedSlides;
            newIndex += loopedSlides;
            const slideChanged = swiper.slideTo(newIndex, 0, false, true);
            if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        swiper.emit("loopFix");
    }
    function loopDestroy() {
        const swiper = this;
        const {$wrapperEl, params, slides} = swiper;
        $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
        slides.removeAttr("data-swiper-slide-index");
    }
    const loop = {
        loopCreate,
        loopFix,
        loopDestroy
    };
    function setGrabCursor(moving) {
        const swiper = this;
        if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        const el = "container" === swiper.params.touchEventsTarget ? swiper.el : swiper.wrapperEl;
        el.style.cursor = "move";
        el.style.cursor = moving ? "grabbing" : "grab";
    }
    function unsetGrabCursor() {
        const swiper = this;
        if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        swiper["container" === swiper.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "";
    }
    const grab_cursor = {
        setGrabCursor,
        unsetGrabCursor
    };
    function closestElement(selector, base = this) {
        function __closestFrom(el) {
            if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
            if (el.assignedSlot) el = el.assignedSlot;
            const found = el.closest(selector);
            if (!found && !el.getRootNode) return null;
            return found || __closestFrom(el.getRootNode().host);
        }
        return __closestFrom(base);
    }
    function onTouchStart(event) {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const window = ssr_window_esm_getWindow();
        const data = swiper.touchEventsData;
        const {params, touches, enabled} = swiper;
        if (!enabled) return;
        if (swiper.animating && params.preventInteractionOnTransition) return;
        if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        let $targetEl = dom(e.target);
        if ("wrapper" === params.touchEventsTarget) if (!$targetEl.closest(swiper.wrapperEl).length) return;
        data.isTouchEvent = "touchstart" === e.type;
        if (!data.isTouchEvent && "which" in e && 3 === e.which) return;
        if (!data.isTouchEvent && "button" in e && e.button > 0) return;
        if (data.isTouched && data.isMoved) return;
        const swipingClassHasValue = !!params.noSwipingClass && "" !== params.noSwipingClass;
        const eventPath = event.composedPath ? event.composedPath() : event.path;
        if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) $targetEl = dom(eventPath[0]);
        const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
        const isTargetShadow = !!(e.target && e.target.shadowRoot);
        if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
            swiper.allowClick = true;
            return;
        }
        if (params.swipeHandler) if (!$targetEl.closest(params.swipeHandler)[0]) return;
        touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX;
        touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
        const startX = touches.currentX;
        const startY = touches.currentY;
        const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
        const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
        if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if ("prevent" === edgeSwipeDetection) event.preventDefault(); else return;
        Object.assign(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: void 0,
            startMoving: void 0
        });
        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = utils_now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = void 0;
        if (params.threshold > 0) data.allowThresholdMove = false;
        if ("touchstart" !== e.type) {
            let preventDefault = true;
            if ($targetEl.is(data.focusableElements)) {
                preventDefault = false;
                if ("SELECT" === $targetEl[0].nodeName) data.isTouched = false;
            }
            if (document.activeElement && dom(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) document.activeElement.blur();
            const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
            if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) e.preventDefault();
        }
        if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
        swiper.emit("touchStart", e);
    }
    function onTouchMove(event) {
        const document = ssr_window_esm_getDocument();
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, enabled} = swiper;
        if (!enabled) return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
            return;
        }
        if (data.isTouchEvent && "touchmove" !== e.type) return;
        const targetTouch = "touchmove" === e.type && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
        const pageX = "touchmove" === e.type ? targetTouch.pageX : e.pageX;
        const pageY = "touchmove" === e.type ? targetTouch.pageY : e.pageY;
        if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
        }
        if (!swiper.allowTouchMove) {
            if (!dom(e.target).is(data.focusableElements)) swiper.allowClick = false;
            if (data.isTouched) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    currentX: pageX,
                    currentY: pageY
                });
                data.touchStartTime = utils_now();
            }
            return;
        }
        if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
            if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                data.isTouched = false;
                data.isMoved = false;
                return;
            }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
        if (data.isTouchEvent && document.activeElement) if (e.target === document.activeElement && dom(e.target).is(data.focusableElements)) {
            data.isMoved = true;
            swiper.allowClick = false;
            return;
        }
        if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
        if (e.targetTouches && e.targetTouches.length > 1) return;
        touches.currentX = pageX;
        touches.currentY = pageY;
        const diffX = touches.currentX - touches.startX;
        const diffY = touches.currentY - touches.startY;
        if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
        if ("undefined" === typeof data.isScrolling) {
            let touchAngle;
            if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                touchAngle = 180 * Math.atan2(Math.abs(diffY), Math.abs(diffX)) / Math.PI;
                data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
            }
        }
        if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
        if ("undefined" === typeof data.startMoving) if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
        if (data.isScrolling) {
            data.isTouched = false;
            return;
        }
        if (!data.startMoving) return;
        swiper.allowClick = false;
        if (!params.cssMode && e.cancelable) e.preventDefault();
        if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
        if (!data.isMoved) {
            if (params.loop && !params.cssMode) swiper.loopFix();
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
            data.allowMomentumBounce = false;
            if (params.grabCursor && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(true);
            swiper.emit("sliderFirstMove", e);
        }
        swiper.emit("sliderMove", e);
        data.isMoved = true;
        let diff = swiper.isHorizontal() ? diffX : diffY;
        touches.diff = diff;
        diff *= params.touchRatio;
        if (rtl) diff = -diff;
        swiper.swipeDirection = diff > 0 ? "prev" : "next";
        data.currentTranslate = diff + data.startTranslate;
        let disableParentSwiper = true;
        let resistanceRatio = params.resistanceRatio;
        if (params.touchReleaseOnEdges) resistanceRatio = 0;
        if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
            disableParentSwiper = false;
            if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
        } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
            disableParentSwiper = false;
            if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
        }
        if (disableParentSwiper) e.preventedByNestedSwiper = true;
        if (!swiper.allowSlideNext && "next" === swiper.swipeDirection && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && "prev" === swiper.swipeDirection && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
        if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
            if (!data.allowThresholdMove) {
                data.allowThresholdMove = true;
                touches.startX = touches.currentX;
                touches.startY = touches.currentY;
                data.currentTranslate = data.startTranslate;
                touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                return;
            }
        } else {
            data.currentTranslate = data.startTranslate;
            return;
        }
        if (!params.followFinger || params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
        swiper.updateProgress(data.currentTranslate);
        swiper.setTranslate(data.currentTranslate);
    }
    function onTouchEnd(event) {
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
        if (!enabled) return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
        data.allowTouchCallbacks = false;
        if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        if (params.grabCursor && data.isMoved && data.isTouched && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(false);
        const touchEndTime = utils_now();
        const timeDiff = touchEndTime - data.touchStartTime;
        if (swiper.allowClick) {
            const pathTree = e.path || e.composedPath && e.composedPath();
            swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
            swiper.emit("tap click", e);
            if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
        }
        data.lastClickTime = utils_now();
        utils_nextTick((() => {
            if (!swiper.destroyed) swiper.allowClick = true;
        }));
        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || 0 === touches.diff || data.currentTranslate === data.startTranslate) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        let currentPos;
        if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
        if (params.cssMode) return;
        if (swiper.params.freeMode && params.freeMode.enabled) {
            swiper.freeMode.onTouchEnd({
                currentPos
            });
            return;
        }
        let stopIndex = 0;
        let groupSize = swiper.slidesSizesGrid[0];
        for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
            const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if ("undefined" !== typeof slidesGrid[i + increment]) {
                if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                    stopIndex = i;
                    groupSize = slidesGrid[i + increment] - slidesGrid[i];
                }
            } else if (currentPos >= slidesGrid[i]) {
                stopIndex = i;
                groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
        }
        let rewindFirstIndex = null;
        let rewindLastIndex = null;
        if (params.rewind) if (swiper.isBeginning) rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
        const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
        const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
        if (timeDiff > params.longSwipesMs) {
            if (!params.longSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if ("next" === swiper.swipeDirection) if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
            if ("prev" === swiper.swipeDirection) if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (null !== rewindLastIndex && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
        } else {
            if (!params.shortSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
            if (!isNavButtonTarget) {
                if ("next" === swiper.swipeDirection) swiper.slideTo(null !== rewindFirstIndex ? rewindFirstIndex : stopIndex + increment);
                if ("prev" === swiper.swipeDirection) swiper.slideTo(null !== rewindLastIndex ? rewindLastIndex : stopIndex);
            } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
        }
    }
    function onResize() {
        const swiper = this;
        const {params, el} = swiper;
        if (el && 0 === el.offsetWidth) return;
        if (params.breakpoints) swiper.setBreakpoint();
        const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateSlidesClasses();
        if (("auto" === params.slidesPerView || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.run();
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
    }
    function onClick(e) {
        const swiper = this;
        if (!swiper.enabled) return;
        if (!swiper.allowClick) {
            if (swiper.params.preventClicks) e.preventDefault();
            if (swiper.params.preventClicksPropagation && swiper.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
    }
    function onScroll() {
        const swiper = this;
        const {wrapperEl, rtlTranslate, enabled} = swiper;
        if (!enabled) return;
        swiper.previousTranslate = swiper.translate;
        if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
        if (0 === swiper.translate) swiper.translate = 0;
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (0 === translatesDiff) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
        swiper.emit("setTranslate", swiper.translate, false);
    }
    let dummyEventAttached = false;
    function dummyEventListener() {}
    const events = (swiper, method) => {
        const document = ssr_window_esm_getDocument();
        const {params, touchEvents, el, wrapperEl, device, support} = swiper;
        const capture = !!params.nested;
        const domMethod = "on" === method ? "addEventListener" : "removeEventListener";
        const swiperMethod = method;
        if (!support.touch) {
            el[domMethod](touchEvents.start, swiper.onTouchStart, false);
            document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
            document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
        } else {
            const passiveListener = "touchstart" === touchEvents.start && support.passiveListener && params.passiveListeners ? {
                passive: true,
                capture: false
            } : false;
            el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
            el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
                passive: false,
                capture
            } : capture);
            el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
            if (touchEvents.cancel) el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }
        if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
        if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
        if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
    };
    function attachEvents() {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        const {params, support} = swiper;
        swiper.onTouchStart = onTouchStart.bind(swiper);
        swiper.onTouchMove = onTouchMove.bind(swiper);
        swiper.onTouchEnd = onTouchEnd.bind(swiper);
        if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
        swiper.onClick = onClick.bind(swiper);
        if (support.touch && !dummyEventAttached) {
            document.addEventListener("touchstart", dummyEventListener);
            dummyEventAttached = true;
        }
        events(swiper, "on");
    }
    function detachEvents() {
        const swiper = this;
        events(swiper, "off");
    }
    const core_events = {
        attachEvents,
        detachEvents
    };
    const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
    function setBreakpoint() {
        const swiper = this;
        const {activeIndex, initialized, loopedSlides = 0, params, $el} = swiper;
        const breakpoints = params.breakpoints;
        if (!breakpoints || breakpoints && 0 === Object.keys(breakpoints).length) return;
        const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
        if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
        const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
        const breakpointParams = breakpointOnlyParams || swiper.originalParams;
        const wasMultiRow = isGridEnabled(swiper, params);
        const isMultiRow = isGridEnabled(swiper, breakpointParams);
        const wasEnabled = params.enabled;
        if (wasMultiRow && !isMultiRow) {
            $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        } else if (!wasMultiRow && isMultiRow) {
            $el.addClass(`${params.containerModifierClass}grid`);
            if (breakpointParams.grid.fill && "column" === breakpointParams.grid.fill || !breakpointParams.grid.fill && "column" === params.grid.fill) $el.addClass(`${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        }
        [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
            const wasModuleEnabled = params[prop] && params[prop].enabled;
            const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
            if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
            if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
        }));
        const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
        if (directionChanged && initialized) swiper.changeDirection();
        utils_extend(swiper.params, breakpointParams);
        const isEnabled = swiper.params.enabled;
        Object.assign(swiper, {
            allowTouchMove: swiper.params.allowTouchMove,
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev
        });
        if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
        swiper.currentBreakpoint = breakpoint;
        swiper.emit("_beforeBreakpoint", breakpointParams);
        if (needsReLoop && initialized) {
            swiper.loopDestroy();
            swiper.loopCreate();
            swiper.updateSlides();
            swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
        }
        swiper.emit("breakpoint", breakpointParams);
    }
    function getBreakpoint(breakpoints, base = "window", containerEl) {
        if (!breakpoints || "container" === base && !containerEl) return;
        let breakpoint = false;
        const window = ssr_window_esm_getWindow();
        const currentHeight = "window" === base ? window.innerHeight : containerEl.clientHeight;
        const points = Object.keys(breakpoints).map((point => {
            if ("string" === typeof point && 0 === point.indexOf("@")) {
                const minRatio = parseFloat(point.substr(1));
                const value = currentHeight * minRatio;
                return {
                    value,
                    point
                };
            }
            return {
                value: point,
                point
            };
        }));
        points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
        for (let i = 0; i < points.length; i += 1) {
            const {point, value} = points[i];
            if ("window" === base) {
                if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
            } else if (value <= containerEl.clientWidth) breakpoint = point;
        }
        return breakpoint || "max";
    }
    const breakpoints = {
        setBreakpoint,
        getBreakpoint
    };
    function prepareClasses(entries, prefix) {
        const resultClasses = [];
        entries.forEach((item => {
            if ("object" === typeof item) Object.keys(item).forEach((classNames => {
                if (item[classNames]) resultClasses.push(prefix + classNames);
            })); else if ("string" === typeof item) resultClasses.push(prefix + item);
        }));
        return resultClasses;
    }
    function addClasses() {
        const swiper = this;
        const {classNames, params, rtl, $el, device, support} = swiper;
        const suffixes = prepareClasses([ "initialized", params.direction, {
            "pointer-events": !support.touch
        }, {
            "free-mode": swiper.params.freeMode && params.freeMode.enabled
        }, {
            autoheight: params.autoHeight
        }, {
            rtl
        }, {
            grid: params.grid && params.grid.rows > 1
        }, {
            "grid-column": params.grid && params.grid.rows > 1 && "column" === params.grid.fill
        }, {
            android: device.android
        }, {
            ios: device.ios
        }, {
            "css-mode": params.cssMode
        }, {
            centered: params.cssMode && params.centeredSlides
        }, {
            "watch-progress": params.watchSlidesProgress
        } ], params.containerModifierClass);
        classNames.push(...suffixes);
        $el.addClass([ ...classNames ].join(" "));
        swiper.emitContainerClasses();
    }
    function removeClasses_removeClasses() {
        const swiper = this;
        const {$el, classNames} = swiper;
        $el.removeClass(classNames.join(" "));
        swiper.emitContainerClasses();
    }
    const classes = {
        addClasses,
        removeClasses: removeClasses_removeClasses
    };
    function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
        const window = ssr_window_esm_getWindow();
        let image;
        function onReady() {
            if (callback) callback();
        }
        const isPicture = dom(imageEl).parent("picture")[0];
        if (!isPicture && (!imageEl.complete || !checkForComplete)) if (src) {
            image = new window.Image;
            image.onload = onReady;
            image.onerror = onReady;
            if (sizes) image.sizes = sizes;
            if (srcset) image.srcset = srcset;
            if (src) image.src = src;
        } else onReady(); else onReady();
    }
    function preloadImages() {
        const swiper = this;
        swiper.imagesToLoad = swiper.$el.find("img");
        function onReady() {
            if ("undefined" === typeof swiper || null === swiper || !swiper || swiper.destroyed) return;
            if (void 0 !== swiper.imagesLoaded) swiper.imagesLoaded += 1;
            if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
                if (swiper.params.updateOnImagesReady) swiper.update();
                swiper.emit("imagesReady");
            }
        }
        for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
            const imageEl = swiper.imagesToLoad[i];
            swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
        }
    }
    const core_images = {
        loadImage,
        preloadImages
    };
    function checkOverflow() {
        const swiper = this;
        const {isLocked: wasLocked, params} = swiper;
        const {slidesOffsetBefore} = params;
        if (slidesOffsetBefore) {
            const lastSlideIndex = swiper.slides.length - 1;
            const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + 2 * slidesOffsetBefore;
            swiper.isLocked = swiper.size > lastSlideRightEdge;
        } else swiper.isLocked = 1 === swiper.snapGrid.length;
        if (true === params.allowSlideNext) swiper.allowSlideNext = !swiper.isLocked;
        if (true === params.allowSlidePrev) swiper.allowSlidePrev = !swiper.isLocked;
        if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
        if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
    const check_overflow = {
        checkOverflow
    };
    const defaults = {
        init: true,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        enabled: true,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: false,
        userAgent: null,
        url: null,
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        autoHeight: false,
        setWrapperSize: false,
        virtualTranslate: false,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        watchOverflow: true,
        roundLengths: false,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 0,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        uniqueNavElements: true,
        resistance: true,
        resistanceRatio: .85,
        watchSlidesProgress: false,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        preloadImages: true,
        updateOnImagesReady: true,
        loop: false,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopedSlidesLimit: true,
        loopFillGroupWithBlank: false,
        loopPreventsSlide: true,
        rewind: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: true,
        _emitClasses: false
    };
    function moduleExtendParams(params, allModulesParams) {
        return function extendParams(obj = {}) {
            const moduleParamName = Object.keys(obj)[0];
            const moduleParams = obj[moduleParamName];
            if ("object" !== typeof moduleParams || null === moduleParams) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if ([ "navigation", "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && true === params[moduleParamName]) params[moduleParamName] = {
                auto: true
            };
            if (!(moduleParamName in params && "enabled" in moduleParams)) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (true === params[moduleParamName]) params[moduleParamName] = {
                enabled: true
            };
            if ("object" === typeof params[moduleParamName] && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
            if (!params[moduleParamName]) params[moduleParamName] = {
                enabled: false
            };
            utils_extend(allModulesParams, obj);
        };
    }
    const prototypes = {
        eventsEmitter: events_emitter,
        update,
        translate,
        transition: core_transition,
        slide,
        loop,
        grabCursor: grab_cursor,
        events: core_events,
        breakpoints,
        checkOverflow: check_overflow,
        classes,
        images: core_images
    };
    const extendedDefaults = {};
    class core_Swiper {
        constructor(...args) {
            let el;
            let params;
            if (1 === args.length && args[0].constructor && "Object" === Object.prototype.toString.call(args[0]).slice(8, -1)) params = args[0]; else [el, params] = args;
            if (!params) params = {};
            params = utils_extend({}, params);
            if (el && !params.el) params.el = el;
            if (params.el && dom(params.el).length > 1) {
                const swipers = [];
                dom(params.el).each((containerEl => {
                    const newParams = utils_extend({}, params, {
                        el: containerEl
                    });
                    swipers.push(new core_Swiper(newParams));
                }));
                return swipers;
            }
            const swiper = this;
            swiper.__swiper__ = true;
            swiper.support = getSupport();
            swiper.device = getDevice({
                userAgent: params.userAgent
            });
            swiper.browser = getBrowser();
            swiper.eventsListeners = {};
            swiper.eventsAnyListeners = [];
            swiper.modules = [ ...swiper.__modules__ ];
            if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
            const allModulesParams = {};
            swiper.modules.forEach((mod => {
                mod({
                    swiper,
                    extendParams: moduleExtendParams(params, allModulesParams),
                    on: swiper.on.bind(swiper),
                    once: swiper.once.bind(swiper),
                    off: swiper.off.bind(swiper),
                    emit: swiper.emit.bind(swiper)
                });
            }));
            const swiperParams = utils_extend({}, defaults, allModulesParams);
            swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = utils_extend({}, swiper.params);
            swiper.passedParams = utils_extend({}, params);
            if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                swiper.on(eventName, swiper.params.on[eventName]);
            }));
            if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
            swiper.$ = dom;
            Object.assign(swiper, {
                enabled: swiper.params.enabled,
                el,
                classNames: [],
                slides: dom(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return "horizontal" === swiper.params.direction;
                },
                isVertical() {
                    return "vertical" === swiper.params.direction;
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: true,
                isEnd: false,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: false,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,
                touchEvents: function touchEvents() {
                    const touch = [ "touchstart", "touchmove", "touchend", "touchcancel" ];
                    const desktop = [ "pointerdown", "pointermove", "pointerup" ];
                    swiper.touchEventsTouch = {
                        start: touch[0],
                        move: touch[1],
                        end: touch[2],
                        cancel: touch[3]
                    };
                    swiper.touchEventsDesktop = {
                        start: desktop[0],
                        move: desktop[1],
                        end: desktop[2]
                    };
                    return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
                }(),
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: swiper.params.focusableElements,
                    lastClickTime: utils_now(),
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    isTouchEvent: void 0,
                    startMoving: void 0
                },
                allowClick: true,
                allowTouchMove: swiper.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            });
            swiper.emit("_swiper");
            if (swiper.params.init) swiper.init();
            return swiper;
        }
        enable() {
            const swiper = this;
            if (swiper.enabled) return;
            swiper.enabled = true;
            if (swiper.params.grabCursor) swiper.setGrabCursor();
            swiper.emit("enable");
        }
        disable() {
            const swiper = this;
            if (!swiper.enabled) return;
            swiper.enabled = false;
            if (swiper.params.grabCursor) swiper.unsetGrabCursor();
            swiper.emit("disable");
        }
        setProgress(progress, speed) {
            const swiper = this;
            progress = Math.min(Math.max(progress, 0), 1);
            const min = swiper.minTranslate();
            const max = swiper.maxTranslate();
            const current = (max - min) * progress + min;
            swiper.translateTo(current, "undefined" === typeof speed ? 0 : speed);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        emitContainerClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const cls = swiper.el.className.split(" ").filter((className => 0 === className.indexOf("swiper") || 0 === className.indexOf(swiper.params.containerModifierClass)));
            swiper.emit("_containerClasses", cls.join(" "));
        }
        getSlideClasses(slideEl) {
            const swiper = this;
            if (swiper.destroyed) return "";
            return slideEl.className.split(" ").filter((className => 0 === className.indexOf("swiper-slide") || 0 === className.indexOf(swiper.params.slideClass))).join(" ");
        }
        emitSlidesClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const updates = [];
            swiper.slides.each((slideEl => {
                const classNames = swiper.getSlideClasses(slideEl);
                updates.push({
                    slideEl,
                    classNames
                });
                swiper.emit("_slideClass", slideEl, classNames);
            }));
            swiper.emit("_slideClasses", updates);
        }
        slidesPerViewDynamic(view = "current", exact = false) {
            const swiper = this;
            const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
            let spv = 1;
            if (params.centeredSlides) {
                let slideSize = slides[activeIndex].swiperSlideSize;
                let breakLoop;
                for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
                for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
            } else if ("current" === view) for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                if (slideInView) spv += 1;
            } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                if (slideInView) spv += 1;
            }
            return spv;
        }
        update() {
            const swiper = this;
            if (!swiper || swiper.destroyed) return;
            const {snapGrid, params} = swiper;
            if (params.breakpoints) swiper.setBreakpoint();
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
            function setTranslate() {
                const translateValue = swiper.rtlTranslate ? -1 * swiper.translate : swiper.translate;
                const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                swiper.setTranslate(newTranslate);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            let translated;
            if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                setTranslate();
                if (swiper.params.autoHeight) swiper.updateAutoHeight();
            } else {
                if (("auto" === swiper.params.slidesPerView || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true); else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                if (!translated) setTranslate();
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
            swiper.emit("update");
        }
        changeDirection(newDirection, needUpdate = true) {
            const swiper = this;
            const currentDirection = swiper.params.direction;
            if (!newDirection) newDirection = "horizontal" === currentDirection ? "vertical" : "horizontal";
            if (newDirection === currentDirection || "horizontal" !== newDirection && "vertical" !== newDirection) return swiper;
            swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
            swiper.emitContainerClasses();
            swiper.params.direction = newDirection;
            swiper.slides.each((slideEl => {
                if ("vertical" === newDirection) slideEl.style.width = ""; else slideEl.style.height = "";
            }));
            swiper.emit("changeDirection");
            if (needUpdate) swiper.update();
            return swiper;
        }
        changeLanguageDirection(direction) {
            const swiper = this;
            if (swiper.rtl && "rtl" === direction || !swiper.rtl && "ltr" === direction) return;
            swiper.rtl = "rtl" === direction;
            swiper.rtlTranslate = "horizontal" === swiper.params.direction && swiper.rtl;
            if (swiper.rtl) {
                swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "rtl";
            } else {
                swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "ltr";
            }
            swiper.update();
        }
        mount(el) {
            const swiper = this;
            if (swiper.mounted) return true;
            const $el = dom(el || swiper.params.el);
            el = $el[0];
            if (!el) return false;
            el.swiper = swiper;
            const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
            const getWrapper = () => {
                if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                    const res = dom(el.shadowRoot.querySelector(getWrapperSelector()));
                    res.children = options => $el.children(options);
                    return res;
                }
                if (!$el.children) return dom($el).children(getWrapperSelector());
                return $el.children(getWrapperSelector());
            };
            let $wrapperEl = getWrapper();
            if (0 === $wrapperEl.length && swiper.params.createElements) {
                const document = ssr_window_esm_getDocument();
                const wrapper = document.createElement("div");
                $wrapperEl = dom(wrapper);
                wrapper.className = swiper.params.wrapperClass;
                $el.append(wrapper);
                $el.children(`.${swiper.params.slideClass}`).each((slideEl => {
                    $wrapperEl.append(slideEl);
                }));
            }
            Object.assign(swiper, {
                $el,
                el,
                $wrapperEl,
                wrapperEl: $wrapperEl[0],
                mounted: true,
                rtl: "rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction"),
                rtlTranslate: "horizontal" === swiper.params.direction && ("rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction")),
                wrongRTL: "-webkit-box" === $wrapperEl.css("display")
            });
            return true;
        }
        init(el) {
            const swiper = this;
            if (swiper.initialized) return swiper;
            const mounted = swiper.mount(el);
            if (false === mounted) return swiper;
            swiper.emit("beforeInit");
            if (swiper.params.breakpoints) swiper.setBreakpoint();
            swiper.addClasses();
            if (swiper.params.loop) swiper.loopCreate();
            swiper.updateSize();
            swiper.updateSlides();
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
            if (swiper.params.preloadImages) swiper.preloadImages();
            if (swiper.params.loop) swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
            swiper.attachEvents();
            swiper.initialized = true;
            swiper.emit("init");
            swiper.emit("afterInit");
            return swiper;
        }
        destroy(deleteInstance = true, cleanStyles = true) {
            const swiper = this;
            const {params, $el, $wrapperEl, slides} = swiper;
            if ("undefined" === typeof swiper.params || swiper.destroyed) return null;
            swiper.emit("beforeDestroy");
            swiper.initialized = false;
            swiper.detachEvents();
            if (params.loop) swiper.loopDestroy();
            if (cleanStyles) {
                swiper.removeClasses();
                $el.removeAttr("style");
                $wrapperEl.removeAttr("style");
                if (slides && slides.length) slides.removeClass([ params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
            }
            swiper.emit("destroy");
            Object.keys(swiper.eventsListeners).forEach((eventName => {
                swiper.off(eventName);
            }));
            if (false !== deleteInstance) {
                swiper.$el[0].swiper = null;
                deleteProps(swiper);
            }
            swiper.destroyed = true;
            return null;
        }
        static extendDefaults(newDefaults) {
            utils_extend(extendedDefaults, newDefaults);
        }
        static get extendedDefaults() {
            return extendedDefaults;
        }
        static get defaults() {
            return defaults;
        }
        static installModule(mod) {
            if (!core_Swiper.prototype.__modules__) core_Swiper.prototype.__modules__ = [];
            const modules = core_Swiper.prototype.__modules__;
            if ("function" === typeof mod && modules.indexOf(mod) < 0) modules.push(mod);
        }
        static use(module) {
            if (Array.isArray(module)) {
                module.forEach((m => core_Swiper.installModule(m)));
                return core_Swiper;
            }
            core_Swiper.installModule(module);
            return core_Swiper;
        }
    }
    Object.keys(prototypes).forEach((prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
            core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }));
    }));
    core_Swiper.use([ Resize, Observer ]);
    const core = core_Swiper;
    function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
        const document = ssr_window_esm_getDocument();
        if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
            if (!params[key] && true === params.auto) {
                let element = swiper.$el.children(`.${checkProps[key]}`)[0];
                if (!element) {
                    element = document.createElement("div");
                    element.className = checkProps[key];
                    swiper.$el.append(element);
                }
                params[key] = element;
                originalParams[key] = element;
            }
        }));
        return params;
    }
    function Navigation({swiper, extendParams, on, emit}) {
        extendParams({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: false,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        });
        swiper.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null
        };
        function getEl(el) {
            let $el;
            if (el) {
                $el = dom(el);
                if (swiper.params.uniqueNavElements && "string" === typeof el && $el.length > 1 && 1 === swiper.$el.find(el).length) $el = swiper.$el.find(el);
            }
            return $el;
        }
        function toggleEl($el, disabled) {
            const params = swiper.params.navigation;
            if ($el && $el.length > 0) {
                $el[disabled ? "addClass" : "removeClass"](params.disabledClass);
                if ($el[0] && "BUTTON" === $el[0].tagName) $el[0].disabled = disabled;
                if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
            }
        }
        function update() {
            if (swiper.params.loop) return;
            const {$nextEl, $prevEl} = swiper.navigation;
            toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
            toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
        }
        function onPrevClick(e) {
            e.preventDefault();
            if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slidePrev();
            emit("navigationPrev");
        }
        function onNextClick(e) {
            e.preventDefault();
            if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slideNext();
            emit("navigationNext");
        }
        function init() {
            const params = swiper.params.navigation;
            swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            });
            if (!(params.nextEl || params.prevEl)) return;
            const $nextEl = getEl(params.nextEl);
            const $prevEl = getEl(params.prevEl);
            if ($nextEl && $nextEl.length > 0) $nextEl.on("click", onNextClick);
            if ($prevEl && $prevEl.length > 0) $prevEl.on("click", onPrevClick);
            Object.assign(swiper.navigation, {
                $nextEl,
                nextEl: $nextEl && $nextEl[0],
                $prevEl,
                prevEl: $prevEl && $prevEl[0]
            });
            if (!swiper.enabled) {
                if ($nextEl) $nextEl.addClass(params.lockClass);
                if ($prevEl) $prevEl.addClass(params.lockClass);
            }
        }
        function destroy() {
            const {$nextEl, $prevEl} = swiper.navigation;
            if ($nextEl && $nextEl.length) {
                $nextEl.off("click", onNextClick);
                $nextEl.removeClass(swiper.params.navigation.disabledClass);
            }
            if ($prevEl && $prevEl.length) {
                $prevEl.off("click", onPrevClick);
                $prevEl.removeClass(swiper.params.navigation.disabledClass);
            }
        }
        on("init", (() => {
            if (false === swiper.params.navigation.enabled) disable(); else {
                init();
                update();
            }
        }));
        on("toEdge fromEdge lock unlock", (() => {
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            const {$nextEl, $prevEl} = swiper.navigation;
            if ($nextEl) $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
            if ($prevEl) $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
        }));
        on("click", ((_s, e) => {
            const {$nextEl, $prevEl} = swiper.navigation;
            const targetEl = e.target;
            if (swiper.params.navigation.hideOnClick && !dom(targetEl).is($prevEl) && !dom(targetEl).is($nextEl)) {
                if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                let isHidden;
                if ($nextEl) isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass); else if ($prevEl) isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
                if (true === isHidden) emit("navigationShow"); else emit("navigationHide");
                if ($nextEl) $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
                if ($prevEl) $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
            }
        }));
        const enable = () => {
            swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);
            init();
            update();
        };
        const disable = () => {
            swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);
            destroy();
        };
        Object.assign(swiper.navigation, {
            enable,
            disable,
            update,
            init,
            destroy
        });
    }
    function classes_to_selector_classesToSelector(classes = "") {
        return `.${classes.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function Pagination({swiper, extendParams, on, emit}) {
        const pfx = "swiper-pagination";
        extendParams({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: false,
                hideOnClick: false,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: false,
                type: "bullets",
                dynamicBullets: false,
                dynamicMainBullets: 1,
                formatFractionCurrent: number => number,
                formatFractionTotal: number => number,
                bulletClass: `${pfx}-bullet`,
                bulletActiveClass: `${pfx}-bullet-active`,
                modifierClass: `${pfx}-`,
                currentClass: `${pfx}-current`,
                totalClass: `${pfx}-total`,
                hiddenClass: `${pfx}-hidden`,
                progressbarFillClass: `${pfx}-progressbar-fill`,
                progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                clickableClass: `${pfx}-clickable`,
                lockClass: `${pfx}-lock`,
                horizontalClass: `${pfx}-horizontal`,
                verticalClass: `${pfx}-vertical`,
                paginationDisabledClass: `${pfx}-disabled`
            }
        });
        swiper.pagination = {
            el: null,
            $el: null,
            bullets: []
        };
        let bulletSize;
        let dynamicBulletIndex = 0;
        function isPaginationDisabled() {
            return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || 0 === swiper.pagination.$el.length;
        }
        function setSideBullets($bulletEl, position) {
            const {bulletActiveClass} = swiper.params.pagination;
            $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
        }
        function update() {
            const rtl = swiper.rtl;
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            const $el = swiper.pagination.$el;
            let current;
            const total = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
            if (swiper.params.loop) {
                current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
                if (current > slidesLength - 1 - 2 * swiper.loopedSlides) current -= slidesLength - 2 * swiper.loopedSlides;
                if (current > total - 1) current -= total;
                if (current < 0 && "bullets" !== swiper.params.paginationType) current = total + current;
            } else if ("undefined" !== typeof swiper.snapIndex) current = swiper.snapIndex; else current = swiper.activeIndex || 0;
            if ("bullets" === params.type && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                const bullets = swiper.pagination.bullets;
                let firstIndex;
                let lastIndex;
                let midIndex;
                if (params.dynamicBullets) {
                    bulletSize = bullets.eq(0)[swiper.isHorizontal() ? "outerWidth" : "outerHeight"](true);
                    $el.css(swiper.isHorizontal() ? "width" : "height", `${bulletSize * (params.dynamicMainBullets + 4)}px`);
                    if (params.dynamicMainBullets > 1 && void 0 !== swiper.previousIndex) {
                        dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);
                        if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                    }
                    firstIndex = Math.max(current - dynamicBulletIndex, 0);
                    lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                    midIndex = (lastIndex + firstIndex) / 2;
                }
                bullets.removeClass([ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)).join(" "));
                if ($el.length > 1) bullets.each((bullet => {
                    const $bullet = dom(bullet);
                    const bulletIndex = $bullet.index();
                    if (bulletIndex === current) $bullet.addClass(params.bulletActiveClass);
                    if (params.dynamicBullets) {
                        if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) $bullet.addClass(`${params.bulletActiveClass}-main`);
                        if (bulletIndex === firstIndex) setSideBullets($bullet, "prev");
                        if (bulletIndex === lastIndex) setSideBullets($bullet, "next");
                    }
                })); else {
                    const $bullet = bullets.eq(current);
                    const bulletIndex = $bullet.index();
                    $bullet.addClass(params.bulletActiveClass);
                    if (params.dynamicBullets) {
                        const $firstDisplayedBullet = bullets.eq(firstIndex);
                        const $lastDisplayedBullet = bullets.eq(lastIndex);
                        for (let i = firstIndex; i <= lastIndex; i += 1) bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
                        if (swiper.params.loop) if (bulletIndex >= bullets.length) {
                            for (let i = params.dynamicMainBullets; i >= 0; i -= 1) bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                            bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                        } else {
                            setSideBullets($firstDisplayedBullet, "prev");
                            setSideBullets($lastDisplayedBullet, "next");
                        } else {
                            setSideBullets($firstDisplayedBullet, "prev");
                            setSideBullets($lastDisplayedBullet, "next");
                        }
                    }
                }
                if (params.dynamicBullets) {
                    const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                    const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                    const offsetProp = rtl ? "right" : "left";
                    bullets.css(swiper.isHorizontal() ? offsetProp : "top", `${bulletsOffset}px`);
                }
            }
            if ("fraction" === params.type) {
                $el.find(classes_to_selector_classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
                $el.find(classes_to_selector_classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
            }
            if ("progressbar" === params.type) {
                let progressbarDirection;
                if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                const scale = (current + 1) / total;
                let scaleX = 1;
                let scaleY = 1;
                if ("horizontal" === progressbarDirection) scaleX = scale; else scaleY = scale;
                $el.find(classes_to_selector_classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
            }
            if ("custom" === params.type && params.renderCustom) {
                $el.html(params.renderCustom(swiper, current + 1, total));
                emit("paginationRender", $el[0]);
            } else emit("paginationUpdate", $el[0]);
            if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
        }
        function render() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            const $el = swiper.pagination.$el;
            let paginationHTML = "";
            if ("bullets" === params.type) {
                let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
                $el.html(paginationHTML);
                swiper.pagination.bullets = $el.find(classes_to_selector_classesToSelector(params.bulletClass));
            }
            if ("fraction" === params.type) {
                if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
                $el.html(paginationHTML);
            }
            if ("progressbar" === params.type) {
                if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
                $el.html(paginationHTML);
            }
            if ("custom" !== params.type) emit("paginationRender", swiper.pagination.$el[0]);
        }
        function init() {
            swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                el: "swiper-pagination"
            });
            const params = swiper.params.pagination;
            if (!params.el) return;
            let $el = dom(params.el);
            if (0 === $el.length) return;
            if (swiper.params.uniqueNavElements && "string" === typeof params.el && $el.length > 1) {
                $el = swiper.$el.find(params.el);
                if ($el.length > 1) $el = $el.filter((el => {
                    if (dom(el).parents(".swiper")[0] !== swiper.el) return false;
                    return true;
                }));
            }
            if ("bullets" === params.type && params.clickable) $el.addClass(params.clickableClass);
            $el.addClass(params.modifierClass + params.type);
            $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            if ("bullets" === params.type && params.dynamicBullets) {
                $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
                dynamicBulletIndex = 0;
                if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
            }
            if ("progressbar" === params.type && params.progressbarOpposite) $el.addClass(params.progressbarOppositeClass);
            if (params.clickable) $el.on("click", classes_to_selector_classesToSelector(params.bulletClass), (function onClick(e) {
                e.preventDefault();
                let index = dom(this).index() * swiper.params.slidesPerGroup;
                if (swiper.params.loop) index += swiper.loopedSlides;
                swiper.slideTo(index);
            }));
            Object.assign(swiper.pagination, {
                $el,
                el: $el[0]
            });
            if (!swiper.enabled) $el.addClass(params.lockClass);
        }
        function destroy() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const $el = swiper.pagination.$el;
            $el.removeClass(params.hiddenClass);
            $el.removeClass(params.modifierClass + params.type);
            $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);
            if (params.clickable) $el.off("click", classes_to_selector_classesToSelector(params.bulletClass));
        }
        on("init", (() => {
            if (false === swiper.params.pagination.enabled) disable(); else {
                init();
                render();
                update();
            }
        }));
        on("activeIndexChange", (() => {
            if (swiper.params.loop) update(); else if ("undefined" === typeof swiper.snapIndex) update();
        }));
        on("snapIndexChange", (() => {
            if (!swiper.params.loop) update();
        }));
        on("slidesLengthChange", (() => {
            if (swiper.params.loop) {
                render();
                update();
            }
        }));
        on("snapGridLengthChange", (() => {
            if (!swiper.params.loop) {
                render();
                update();
            }
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            const {$el} = swiper.pagination;
            if ($el) $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.pagination.lockClass);
        }));
        on("lock unlock", (() => {
            update();
        }));
        on("click", ((_s, e) => {
            const targetEl = e.target;
            const {$el} = swiper.pagination;
            if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el && $el.length > 0 && !dom(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
                if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);
                if (true === isHidden) emit("paginationShow"); else emit("paginationHide");
                $el.toggleClass(swiper.params.pagination.hiddenClass);
            }
        }));
        const enable = () => {
            swiper.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
            if (swiper.pagination.$el) swiper.pagination.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
            init();
            render();
            update();
        };
        const disable = () => {
            swiper.$el.addClass(swiper.params.pagination.paginationDisabledClass);
            if (swiper.pagination.$el) swiper.pagination.$el.addClass(swiper.params.pagination.paginationDisabledClass);
            destroy();
        };
        Object.assign(swiper.pagination, {
            enable,
            disable,
            render,
            update,
            init,
            destroy
        });
    }
    function Autoplay({swiper, extendParams, on, emit}) {
        let timeout;
        swiper.autoplay = {
            running: false,
            paused: false
        };
        extendParams({
            autoplay: {
                enabled: false,
                delay: 3e3,
                waitForTransition: true,
                disableOnInteraction: true,
                stopOnLastSlide: false,
                reverseDirection: false,
                pauseOnMouseEnter: false
            }
        });
        function run() {
            if (!swiper.size) {
                swiper.autoplay.running = false;
                swiper.autoplay.paused = false;
                return;
            }
            const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
            let delay = swiper.params.autoplay.delay;
            if ($activeSlideEl.attr("data-swiper-autoplay")) delay = $activeSlideEl.attr("data-swiper-autoplay") || swiper.params.autoplay.delay;
            clearTimeout(timeout);
            timeout = utils_nextTick((() => {
                let autoplayResult;
                if (swiper.params.autoplay.reverseDirection) if (swiper.params.loop) {
                    swiper.loopFix();
                    autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                    emit("autoplay");
                } else if (!swiper.isBeginning) {
                    autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                    emit("autoplay");
                } else if (!swiper.params.autoplay.stopOnLastSlide) {
                    autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
                    emit("autoplay");
                } else stop(); else if (swiper.params.loop) {
                    swiper.loopFix();
                    autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
                    emit("autoplay");
                } else if (!swiper.isEnd) {
                    autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
                    emit("autoplay");
                } else if (!swiper.params.autoplay.stopOnLastSlide) {
                    autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
                    emit("autoplay");
                } else stop();
                if (swiper.params.cssMode && swiper.autoplay.running) run(); else if (false === autoplayResult) run();
            }), delay);
        }
        function start() {
            if ("undefined" !== typeof timeout) return false;
            if (swiper.autoplay.running) return false;
            swiper.autoplay.running = true;
            emit("autoplayStart");
            run();
            return true;
        }
        function stop() {
            if (!swiper.autoplay.running) return false;
            if ("undefined" === typeof timeout) return false;
            if (timeout) {
                clearTimeout(timeout);
                timeout = void 0;
            }
            swiper.autoplay.running = false;
            emit("autoplayStop");
            return true;
        }
        function pause(speed) {
            if (!swiper.autoplay.running) return;
            if (swiper.autoplay.paused) return;
            if (timeout) clearTimeout(timeout);
            swiper.autoplay.paused = true;
            if (0 === speed || !swiper.params.autoplay.waitForTransition) {
                swiper.autoplay.paused = false;
                run();
            } else [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
            }));
        }
        function onVisibilityChange() {
            const document = ssr_window_esm_getDocument();
            if ("hidden" === document.visibilityState && swiper.autoplay.running) pause();
            if ("visible" === document.visibilityState && swiper.autoplay.paused) {
                run();
                swiper.autoplay.paused = false;
            }
        }
        function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
            if (e.target !== swiper.$wrapperEl[0]) return;
            [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
            }));
            swiper.autoplay.paused = false;
            if (!swiper.autoplay.running) stop(); else run();
        }
        function onMouseEnter() {
            if (swiper.params.autoplay.disableOnInteraction) stop(); else {
                emit("autoplayPause");
                pause();
            }
            [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
            }));
        }
        function onMouseLeave() {
            if (swiper.params.autoplay.disableOnInteraction) return;
            swiper.autoplay.paused = false;
            emit("autoplayResume");
            run();
        }
        function attachMouseEvents() {
            if (swiper.params.autoplay.pauseOnMouseEnter) {
                swiper.$el.on("mouseenter", onMouseEnter);
                swiper.$el.on("mouseleave", onMouseLeave);
            }
        }
        function detachMouseEvents() {
            swiper.$el.off("mouseenter", onMouseEnter);
            swiper.$el.off("mouseleave", onMouseLeave);
        }
        on("init", (() => {
            if (swiper.params.autoplay.enabled) {
                start();
                const document = ssr_window_esm_getDocument();
                document.addEventListener("visibilitychange", onVisibilityChange);
                attachMouseEvents();
            }
        }));
        on("beforeTransitionStart", ((_s, speed, internal) => {
            if (swiper.autoplay.running) if (internal || !swiper.params.autoplay.disableOnInteraction) swiper.autoplay.pause(speed); else stop();
        }));
        on("sliderFirstMove", (() => {
            if (swiper.autoplay.running) if (swiper.params.autoplay.disableOnInteraction) stop(); else pause();
        }));
        on("touchEnd", (() => {
            if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) run();
        }));
        on("destroy", (() => {
            detachMouseEvents();
            if (swiper.autoplay.running) stop();
            const document = ssr_window_esm_getDocument();
            document.removeEventListener("visibilitychange", onVisibilityChange);
        }));
        Object.assign(swiper.autoplay, {
            pause,
            run,
            start,
            stop
        });
    }
    function initSliders() {
        if (document.querySelector(".swiper")) new core(".swiper", {
            modules: [ Navigation, Pagination, Autoplay ],
            observer: true,
            observeParents: true,
            slidesPerView: 6,
            spaceBetween: 30,
            autoHeight: true,
            speed: 800,
            loop: true,
            autoplay: {
                delay: 1500
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next"
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.5,
                    spaceBetween: 30,
                    autoHeight: true,
                    loop: false
                },
                400: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    autoHeight: true
                },
                600: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    autoHeight: true
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20
                },
                992: {
                    slidesPerView: 5,
                    spaceBetween: 20
                },
                1330: {
                    slidesPerView: 6,
                    spaceBetween: 30
                }
            },
            on: {}
        });
        if (document.querySelector(".swiper-tranding")) new core(".swiper-tranding", {
            modules: [ Navigation, Pagination, Autoplay ],
            observer: true,
            observeParents: true,
            slidesPerView: 4,
            spaceBetween: 30,
            autoHeight: true,
            speed: 800,
            autoplay: {
                delay: 1500
            },
            pagination: {
                el: ".swiper-pagination-trading",
                clickable: true
            },
            navigation: {
                prevEl: ".swiper-button-prev-tranding",
                nextEl: ".swiper-button-next-tranding"
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    autoHeight: true
                },
                700: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    autoHeight: true
                },
                890: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    autoHeight: true
                },
                1150: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    autoHeight: true
                }
            },
            on: {}
        });
    }
    window.addEventListener("load", (function(e) {
        initSliders();
    }));
    class ScrollWatcher {
        constructor(props) {
            let defaultConfig = {
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.observer;
            !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun();
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher");
            this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
        }
        scrollWatcherConstructor(items) {
            if (items.length) {
                this.scrollWatcherLogging(`Проснулся, слежу за объектами (${items.length})...`);
                let uniqParams = uniqArray(Array.from(items).map((function(item) {
                    return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                })));
                uniqParams.forEach((uniqParam => {
                    let uniqParamArray = uniqParam.split("|");
                    let paramsWatch = {
                        root: uniqParamArray[0],
                        margin: uniqParamArray[1],
                        threshold: uniqParamArray[2]
                    };
                    let groupItems = Array.from(items).filter((function(item) {
                        let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                        let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                        let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                        if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                    }));
                    let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                    this.scrollWatcherInit(groupItems, configWatcher);
                }));
            } else this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
        }
        getScrollWatcherConfig(paramsWatch) {
            let configWatcher = {};
            if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if ("null" !== paramsWatch.root) this.scrollWatcherLogging(`Эмм... родительского объекта ${paramsWatch.root} нет на странице`);
            configWatcher.rootMargin = paramsWatch.margin;
            if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                this.scrollWatcherLogging(`Ой ой, настройку data-watch-margin нужно задавать в PX или %`);
                return;
            }
            if ("prx" === paramsWatch.threshold) {
                paramsWatch.threshold = [];
                for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
            } else paramsWatch.threshold = paramsWatch.threshold.split(",");
            configWatcher.threshold = paramsWatch.threshold;
            return configWatcher;
        }
        scrollWatcherCreate(configWatcher) {
            this.observer = new IntersectionObserver(((entries, observer) => {
                entries.forEach((entry => {
                    this.scrollWatcherCallback(entry, observer);
                }));
            }), configWatcher);
        }
        scrollWatcherInit(items, configWatcher) {
            this.scrollWatcherCreate(configWatcher);
            items.forEach((item => this.observer.observe(item)));
        }
        scrollWatcherIntersecting(entry, targetElement) {
            if (entry.isIntersecting) {
                !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                this.scrollWatcherLogging(`Я вижу ${targetElement.classList}, добавил класс _watcher-view`);
            } else {
                targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                this.scrollWatcherLogging(`Я не вижу ${targetElement.classList}, убрал класс _watcher-view`);
            }
        }
        scrollWatcherOff(targetElement, observer) {
            observer.unobserve(targetElement);
            this.scrollWatcherLogging(`Я перестал следить за ${targetElement.classList}`);
        }
        scrollWatcherLogging(message) {
            this.config.logging ? functions_FLS(`[Наблюдатель]: ${message}`) : null;
        }
        scrollWatcherCallback(entry, observer) {
            const targetElement = entry.target;
            this.scrollWatcherIntersecting(entry, targetElement);
            targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
            document.dispatchEvent(new CustomEvent("watcherCallback", {
                detail: {
                    entry
                }
            }));
        }
    }
    modules_flsModules.watcher = new ScrollWatcher({});
    let addWindowScrollEvent = false;
    function digitsCounter() {
        if (document.querySelectorAll("[data-digits-counter]").length) document.querySelectorAll("[data-digits-counter]").forEach((element => {
            element.dataset.digitsCounter = element.innerHTML;
            element.innerHTML = `0`;
        }));
        function digitsCountersInit(digitsCountersItems) {
            let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
            if (digitsCounters.length) digitsCounters.forEach((digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            }));
        }
        function digitsCountersAnimate(digitsCounter) {
            let startTimestamp = null;
            const duration = parseInt(digitsCounter.dataset.digitsCounterSpeed) ? parseInt(digitsCounter.dataset.digitsCounterSpeed) : 1e3;
            const startValue = parseInt(digitsCounter.dataset.digitsCounter);
            const startPosition = 0;
            const step = timestamp => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
                if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
        }
        function digitsCounterAction(e) {
            const entry = e.detail.entry;
            const targetElement = entry.target;
            if (targetElement.querySelectorAll("[data-digits-counter]").length) digitsCountersInit(targetElement.querySelectorAll("[data-digits-counter]"));
        }
        document.addEventListener("watcherCallback", digitsCounterAction);
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if ("last" === place || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if ("first" === place) {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (void 0 !== parent.children[index]) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if ("min" === this.type) arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return -1;
                    if ("last" === a.place || "first" === b.place) return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if ("first" === a.place || "last" === b.place) return 1;
                        if ("last" === a.place || "first" === b.place) return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    /**!
 * MixItUp v3.3.1
 * A high-performance, dependency-free library for animated filtering, sorting and more
 * Build 94e0fbf6-cd0b-4987-b3c0-14b59b67b8a0
 *
 * @copyright Copyright 2014-2018 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://www.kunkalabs.com/mixitup/
 *
 * @license   Commercial use requires a commercial license.
 *            https://www.kunkalabs.com/mixitup/licenses/
 *
 *            Non-commercial use permitted under same terms as CC BY-NC 3.0 license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */
    !function(t) {
        "use strict";
        var e = null, n = null;
        !function() {
            var e = [ "webkit", "moz", "o", "ms" ], n = t.document.createElement("div"), a = -1;
            for (a = 0; a < e.length && !t.requestAnimationFrame; a++) t.requestAnimationFrame = t[e[a] + "RequestAnimationFrame"];
            "undefined" == typeof n.nextElementSibling && Object.defineProperty(t.Element.prototype, "nextElementSibling", {
                get: function() {
                    for (var t = this.nextSibling; t; ) {
                        if (1 === t.nodeType) return t;
                        t = t.nextSibling;
                    }
                    return null;
                }
            }), function(t) {
                t.matches = t.matches || t.machesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector || function(t) {
                    return Array.prototype.indexOf.call(this.parentElement.querySelectorAll(t), this) > -1;
                };
            }(t.Element.prototype), Object.keys || (Object.keys = function() {
                var t = Object.prototype.hasOwnProperty, e = !1, n = [], a = -1;
                return e = !{
                    toString: null
                }.propertyIsEnumerable("toString"), n = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], 
                a = n.length, function(i) {
                    var o = [], r = "", s = -1;
                    if ("object" != typeof i && ("function" != typeof i || null === i)) throw new TypeError("Object.keys called on non-object");
                    for (r in i) t.call(i, r) && o.push(r);
                    if (e) for (s = 0; s < a; s++) t.call(i, n[s]) && o.push(n[s]);
                    return o;
                };
            }()), Array.isArray || (Array.isArray = function(t) {
                return "[object Array]" === Object.prototype.toString.call(t);
            }), "function" != typeof Object.create && (Object.create = function(t) {
                var e = function() {};
                return function(n, a) {
                    if (n !== Object(n) && null !== n) throw TypeError("Argument must be an object, or null");
                    e.prototype = n || {};
                    var i = new e;
                    return e.prototype = null, a !== t && Object.defineProperties(i, a), null === n && (i.__proto__ = null), 
                    i;
                };
            }()), String.prototype.trim || (String.prototype.trim = function() {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            }), Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
                var e, n, a, i;
                if (null === this) throw new TypeError;
                if (a = Object(this), i = a.length >>> 0, 0 === i) return -1;
                if (e = 0, arguments.length > 1 && (e = Number(arguments[1]), e !== e ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -1 / 0 && (e = (e > 0 || -1) * Math.floor(Math.abs(e)))), 
                e >= i) return -1;
                for (n = e >= 0 ? e : Math.max(i - Math.abs(e), 0); n < i; n++) if (n in a && a[n] === t) return n;
                return -1;
            }), Function.prototype.bind || (Function.prototype.bind = function(t) {
                var e, n, a, i;
                if ("function" != typeof this) throw new TypeError;
                return e = Array.prototype.slice.call(arguments, 1), n = this, a = function() {}, 
                i = function() {
                    return n.apply(this instanceof a ? this : t, e.concat(Array.prototype.slice.call(arguments)));
                }, this.prototype && (a.prototype = this.prototype), i.prototype = new a, i;
            }), t.Element.prototype.dispatchEvent || (t.Element.prototype.dispatchEvent = function(t) {
                try {
                    return this.fireEvent("on" + t.type, t);
                } catch (e) {}
            });
        }(), e = function(a, i, o) {
            var r = null, s = !1, l = null, c = null, u = null, h = [], d = "", m = [], g = -1;
            if (u = o || t.document, (s = arguments[3]) && (s = "boolean" == typeof s), "string" == typeof a) m = u.querySelectorAll(a); else if (a && "object" == typeof a && n.isElement(a, u)) m = [ a ]; else {
                if (!a || "object" != typeof a || !a.length) throw new Error(e.messages.errorFactoryInvalidContainer());
                m = a;
            }
            if (m.length < 1) throw new Error(e.messages.errorFactoryContainerNotFound());
            for (g = 0; (r = m[g]) && (!(g > 0) || s); g++) r.id ? d = r.id : (d = "MixItUp" + n.randomHex(), 
            r.id = d), e.instances[d] instanceof e.Mixer ? (l = e.instances[d], (!i || i && i.debug && !1 !== i.debug.showWarnings) && console.warn(e.messages.warningFactoryPreexistingInstance())) : (l = new e.Mixer, 
            l.attach(r, u, d, i), e.instances[d] = l), c = new e.Facade(l), i && i.debug && i.debug.enable ? h.push(l) : h.push(c);
            return s ? new e.Collection(h) : h[0];
        }, e.use = function(t) {
            e.Base.prototype.callActions.call(e, "beforeUse", arguments), "function" == typeof t && "mixitup-extension" === t.TYPE ? "undefined" == typeof e.extensions[t.NAME] && (t(e), 
            e.extensions[t.NAME] = t) : t.fn && t.fn.jquery && (e.libraries.$ = t), e.Base.prototype.callActions.call(e, "afterUse", arguments);
        }, e.instances = {}, e.extensions = {}, e.libraries = {}, n = {
            hasClass: function(t, e) {
                return !!t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"));
            },
            addClass: function(t, e) {
                this.hasClass(t, e) || (t.className += t.className ? " " + e : e);
            },
            removeClass: function(t, e) {
                if (this.hasClass(t, e)) {
                    var n = new RegExp("(\\s|^)" + e + "(\\s|$)");
                    t.className = t.className.replace(n, " ").trim();
                }
            },
            extend: function(t, e, n, a) {
                var i = [], o = "", r = -1;
                n = n || !1, a = a || !1;
                try {
                    if (Array.isArray(e)) for (r = 0; r < e.length; r++) i.push(r); else e && (i = Object.keys(e));
                    for (r = 0; r < i.length; r++) o = i[r], !n || "object" != typeof e[o] || this.isElement(e[o]) ? t[o] = e[o] : Array.isArray(e[o]) ? (t[o] || (t[o] = []), 
                    this.extend(t[o], e[o], n, a)) : (t[o] || (t[o] = {}), this.extend(t[o], e[o], n, a));
                } catch (s) {
                    if (!a) throw s;
                    this.handleExtendError(s, t);
                }
                return t;
            },
            handleExtendError: function(t, n) {
                var a = /property "?(\w*)"?[,:] object/i, i = null, o = "", r = "", s = "", l = "", c = "", u = -1, f = -1;
                if (t instanceof TypeError && (i = a.exec(t.message))) {
                    o = i[1];
                    for (c in n) {
                        for (f = 0; f < o.length && o.charAt(f) === c.charAt(f); ) f++;
                        f > u && (u = f, l = c);
                    }
                    throw u > 1 && (s = e.messages.errorConfigInvalidPropertySuggestion({
                        probableMatch: l
                    })), r = e.messages.errorConfigInvalidProperty({
                        erroneous: o,
                        suggestion: s
                    }), new TypeError(r);
                }
                throw t;
            },
            template: function(t) {
                for (var e = /\${([\w]*)}/g, n = {}, a = null; a = e.exec(t); ) n[a[1]] = new RegExp("\\${" + a[1] + "}", "g");
                return function(e) {
                    var a = "", i = t;
                    e = e || {};
                    for (a in n) i = i.replace(n[a], "undefined" != typeof e[a] ? e[a] : "");
                    return i;
                };
            },
            on: function(e, n, a, i) {
                e && (e.addEventListener ? e.addEventListener(n, a, i) : e.attachEvent && (e["e" + n + a] = a, 
                e[n + a] = function() {
                    e["e" + n + a](t.event);
                }, e.attachEvent("on" + n, e[n + a])));
            },
            off: function(t, e, n) {
                t && (t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent && (t.detachEvent("on" + e, t[e + n]), 
                t[e + n] = null));
            },
            getCustomEvent: function(e, n, a) {
                var i = null;
                return a = a || t.document, "function" == typeof t.CustomEvent ? i = new t.CustomEvent(e, {
                    detail: n,
                    bubbles: !0,
                    cancelable: !0
                }) : "function" == typeof a.createEvent ? (i = a.createEvent("CustomEvent"), i.initCustomEvent(e, !0, !0, n)) : (i = a.createEventObject(), 
                i.type = e, i.returnValue = !1, i.cancelBubble = !1, i.detail = n), i;
            },
            getOriginalEvent: function(t) {
                return t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t;
            },
            index: function(t, e) {
                for (var n = 0; null !== (t = t.previousElementSibling); ) e && !t.matches(e) || ++n;
                return n;
            },
            camelCase: function(t) {
                return t.toLowerCase().replace(/([_-][a-z])/g, (function(t) {
                    return t.toUpperCase().replace(/[_-]/, "");
                }));
            },
            pascalCase: function(t) {
                return (t = this.camelCase(t)).charAt(0).toUpperCase() + t.slice(1);
            },
            dashCase: function(t) {
                return t.replace(/([A-Z])/g, "-$1").replace(/^-/, "").toLowerCase();
            },
            isElement: function(e, n) {
                return n = n || t.document, !!(t.HTMLElement && e instanceof t.HTMLElement) || !!(n.defaultView && n.defaultView.HTMLElement && e instanceof n.defaultView.HTMLElement) || null !== e && 1 === e.nodeType && "string" == typeof e.nodeName;
            },
            createElement: function(e, n) {
                var a = null, i = null;
                for (n = n || t.document, a = n.createDocumentFragment(), i = n.createElement("div"), 
                i.innerHTML = e.trim(); i.firstChild; ) a.appendChild(i.firstChild);
                return a;
            },
            removeWhitespace: function(t) {
                for (var e; t && "#text" === t.nodeName; ) e = t, t = t.previousSibling, e.parentElement && e.parentElement.removeChild(e);
            },
            isEqualArray: function(t, e) {
                var n = t.length;
                if (n !== e.length) return !1;
                for (;n--; ) if (t[n] !== e[n]) return !1;
                return !0;
            },
            deepEquals: function(t, e) {
                var n;
                if ("object" == typeof t && t && "object" == typeof e && e) {
                    if (Object.keys(t).length !== Object.keys(e).length) return !1;
                    for (n in t) if (!e.hasOwnProperty(n) || !this.deepEquals(t[n], e[n])) return !1;
                } else if (t !== e) return !1;
                return !0;
            },
            arrayShuffle: function(t) {
                for (var e = t.slice(), n = e.length, a = n, i = -1, o = []; a--; ) i = ~~(Math.random() * n), 
                o = e[a], e[a] = e[i], e[i] = o;
                return e;
            },
            arrayFromList: function(t) {
                var e, n;
                try {
                    return Array.prototype.slice.call(t);
                } catch (a) {
                    for (e = [], n = 0; n < t.length; n++) e.push(t[n]);
                    return e;
                }
            },
            debounce: function(t, e, n) {
                var a;
                return function() {
                    var i = this, o = arguments, r = n && !a, s = null;
                    s = function() {
                        a = null, n || t.apply(i, o);
                    }, clearTimeout(a), a = setTimeout(s, e), r && t.apply(i, o);
                };
            },
            position: function(t) {
                for (var e = 0, n = 0, a = t; t; ) e -= t.scrollLeft, n -= t.scrollTop, t === a && (e += t.offsetLeft, 
                n += t.offsetTop, a = t.offsetParent), t = t.parentElement;
                return {
                    x: e,
                    y: n
                };
            },
            getHypotenuse: function(t, e) {
                var n = t.x - e.x, a = t.y - e.y;
                return n = n < 0 ? -1 * n : n, a = a < 0 ? -1 * a : a, Math.sqrt(Math.pow(n, 2) + Math.pow(a, 2));
            },
            getIntersectionRatio: function(t, e) {
                var n = t.width * t.height, a = -1, i = -1, o = -1;
                return a = Math.max(0, Math.min(t.left + t.width, e.left + e.width) - Math.max(t.left, e.left)), 
                i = Math.max(0, Math.min(t.top + t.height, e.top + e.height) - Math.max(t.top, e.top)), 
                o = i * a, o / n;
            },
            closestParent: function(e, n, a, i) {
                var o = e.parentNode;
                if (i = i || t.document, a && e.matches(n)) return e;
                for (;o && o != i.body; ) {
                    if (o.matches && o.matches(n)) return o;
                    if (!o.parentNode) return null;
                    o = o.parentNode;
                }
                return null;
            },
            children: function(e, n, a) {
                var i = [], o = "";
                return a = a || t.doc, e && (e.id || (o = "Temp" + this.randomHexKey(), e.id = o), 
                i = a.querySelectorAll("#" + e.id + " > " + n), o && e.removeAttribute("id")), i;
            },
            clean: function(t) {
                var e = [], n = -1;
                for (n = 0; n < t.length; n++) "" !== t[n] && e.push(t[n]);
                return e;
            },
            defer: function(n) {
                var a = null, i = null, o = null;
                return i = new this.Deferred, e.features.has.promises ? i.promise = new Promise((function(t, e) {
                    i.resolve = t, i.reject = e;
                })) : (o = t.jQuery || n.$) && "function" == typeof o.Deferred ? (a = o.Deferred(), 
                i.promise = a.promise(), i.resolve = a.resolve, i.reject = a.reject) : t.console && console.warn(e.messages.warningNoPromiseImplementation()), 
                i;
            },
            all: function(n, a) {
                var i = null;
                return e.features.has.promises ? Promise.all(n) : (i = t.jQuery || a.$) && "function" == typeof i.when ? i.when.apply(i, n).done((function() {
                    return arguments;
                })) : (t.console && console.warn(e.messages.warningNoPromiseImplementation()), []);
            },
            getPrefix: function(t, e, a) {
                var i = -1, o = "";
                if (n.dashCase(e) in t.style) return "";
                for (i = 0; o = a[i]; i++) if (o + e in t.style) return o.toLowerCase();
                return "unsupported";
            },
            randomHex: function() {
                return ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6).toUpperCase();
            },
            getDocumentState: function(e) {
                return e = "object" == typeof e.body ? e : t.document, {
                    scrollTop: t.pageYOffset,
                    scrollLeft: t.pageXOffset,
                    docHeight: e.documentElement.scrollHeight,
                    docWidth: e.documentElement.scrollWidth,
                    viewportHeight: e.documentElement.clientHeight,
                    viewportWidth: e.documentElement.clientWidth
                };
            },
            bind: function(t, e) {
                return function() {
                    return e.apply(t, arguments);
                };
            },
            isVisible: function(e) {
                var n = null;
                return !!e.offsetParent || (n = t.getComputedStyle(e), "fixed" === n.position && "hidden" !== n.visibility && "0" !== n.opacity);
            },
            seal: function(t) {
                "function" == typeof Object.seal && Object.seal(t);
            },
            freeze: function(t) {
                "function" == typeof Object.freeze && Object.freeze(t);
            },
            compareVersions: function(t, e) {
                var n = t.split("."), a = e.split("."), i = -1, o = -1, r = -1;
                for (r = 0; r < n.length; r++) {
                    if (i = parseInt(n[r].replace(/[^\d.]/g, "")), o = parseInt(a[r].replace(/[^\d.]/g, "") || 0), 
                    o < i) return !1;
                    if (o > i) return !0;
                }
                return !0;
            },
            Deferred: function() {
                this.promise = null, this.resolve = null, this.reject = null, this.id = n.randomHex();
            },
            isEmptyObject: function(t) {
                var e = "";
                if ("function" == typeof Object.keys) return 0 === Object.keys(t).length;
                for (e in t) if (t.hasOwnProperty(e)) return !1;
                return !0;
            },
            getClassname: function(t, e, n) {
                var a = "";
                return a += t.block, a.length && (a += t.delineatorElement), a += t["element" + this.pascalCase(e)], 
                n ? (a.length && (a += t.delineatorModifier), a += n) : a;
            },
            getProperty: function(t, e) {
                var n = e.split("."), a = null, i = "", o = 0;
                if (!e) return t;
                for (a = function(t) {
                    return t ? t[i] : null;
                }; o < n.length; ) i = n[o], t = a(t), o++;
                return "undefined" != typeof t ? t : null;
            }
        }, e.h = n, e.Base = function() {}, e.Base.prototype = {
            constructor: e.Base,
            callActions: function(t, e) {
                var a = this, i = a.constructor.actions[t], o = "";
                if (i && !n.isEmptyObject(i)) for (o in i) i[o].apply(a, e);
            },
            callFilters: function(t, e, a) {
                var i = this, o = i.constructor.filters[t], r = e, s = "";
                if (!o || n.isEmptyObject(o)) return r;
                a = a || [];
                for (s in o) a = n.arrayFromList(a), a.unshift(r), r = o[s].apply(i, a);
                return r;
            }
        }, e.BaseStatic = function() {
            this.actions = {}, this.filters = {}, this.extend = function(t) {
                n.extend(this.prototype, t);
            }, this.registerAction = function(t, e, n) {
                (this.actions[t] = this.actions[t] || {})[e] = n;
            }, this.registerFilter = function(t, e, n) {
                (this.filters[t] = this.filters[t] || {})[e] = n;
            };
        }, e.Features = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.boxSizingPrefix = "", 
            this.transformPrefix = "", this.transitionPrefix = "", this.boxSizingPrefix = "", 
            this.transformProp = "", this.transformRule = "", this.transitionProp = "", this.perspectiveProp = "", 
            this.perspectiveOriginProp = "", this.has = new e.Has, this.canary = null, this.BOX_SIZING_PROP = "boxSizing", 
            this.TRANSITION_PROP = "transition", this.TRANSFORM_PROP = "transform", this.PERSPECTIVE_PROP = "perspective", 
            this.PERSPECTIVE_ORIGIN_PROP = "perspectiveOrigin", this.VENDORS = [ "Webkit", "moz", "O", "ms" ], 
            this.TWEENABLE = [ "opacity", "width", "height", "marginRight", "marginBottom", "x", "y", "scale", "translateX", "translateY", "translateZ", "rotateX", "rotateY", "rotateZ" ], 
            this.callActions("afterConstruct");
        }, e.BaseStatic.call(e.Features), e.Features.prototype = Object.create(e.Base.prototype), 
        n.extend(e.Features.prototype, {
            constructor: e.Features,
            init: function() {
                var t = this;
                t.callActions("beforeInit", arguments), t.canary = document.createElement("div"), 
                t.setPrefixes(), t.runTests(), t.callActions("beforeInit", arguments);
            },
            runTests: function() {
                var e = this;
                e.callActions("beforeRunTests", arguments), e.has.promises = "function" == typeof t.Promise, 
                e.has.transitions = "unsupported" !== e.transitionPrefix, e.callActions("afterRunTests", arguments), 
                n.freeze(e.has);
            },
            setPrefixes: function() {
                var t = this;
                t.callActions("beforeSetPrefixes", arguments), t.transitionPrefix = n.getPrefix(t.canary, "Transition", t.VENDORS), 
                t.transformPrefix = n.getPrefix(t.canary, "Transform", t.VENDORS), t.boxSizingPrefix = n.getPrefix(t.canary, "BoxSizing", t.VENDORS), 
                t.boxSizingProp = t.boxSizingPrefix ? t.boxSizingPrefix + n.pascalCase(t.BOX_SIZING_PROP) : t.BOX_SIZING_PROP, 
                t.transitionProp = t.transitionPrefix ? t.transitionPrefix + n.pascalCase(t.TRANSITION_PROP) : t.TRANSITION_PROP, 
                t.transformProp = t.transformPrefix ? t.transformPrefix + n.pascalCase(t.TRANSFORM_PROP) : t.TRANSFORM_PROP, 
                t.transformRule = t.transformPrefix ? "-" + t.transformPrefix + "-" + t.TRANSFORM_PROP : t.TRANSFORM_PROP, 
                t.perspectiveProp = t.transformPrefix ? t.transformPrefix + n.pascalCase(t.PERSPECTIVE_PROP) : t.PERSPECTIVE_PROP, 
                t.perspectiveOriginProp = t.transformPrefix ? t.transformPrefix + n.pascalCase(t.PERSPECTIVE_ORIGIN_PROP) : t.PERSPECTIVE_ORIGIN_PROP, 
                t.callActions("afterSetPrefixes", arguments);
            }
        }), e.Has = function() {
            this.transitions = !1, this.promises = !1, n.seal(this);
        }, e.features = new e.Features, e.features.init(), e.ConfigAnimation = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.enable = !0, this.effects = "fade scale", 
            this.effectsIn = "", this.effectsOut = "", this.duration = 600, this.easing = "ease", 
            this.applyPerspective = !0, this.perspectiveDistance = "3000px", this.perspectiveOrigin = "50% 50%", 
            this.queue = !0, this.queueLimit = 3, this.animateResizeContainer = !0, this.animateResizeTargets = !1, 
            this.staggerSequence = null, this.reverseOut = !1, this.nudge = !0, this.clampHeight = !0, 
            this.clampWidth = !0, this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.ConfigAnimation), e.ConfigAnimation.prototype = Object.create(e.Base.prototype), 
        e.ConfigAnimation.prototype.constructor = e.ConfigAnimation, e.ConfigBehavior = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.liveSort = !1, this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.ConfigBehavior), e.ConfigBehavior.prototype = Object.create(e.Base.prototype), 
        e.ConfigBehavior.prototype.constructor = e.ConfigBehavior, e.ConfigCallbacks = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.onMixStart = null, 
            this.onMixBusy = null, this.onMixEnd = null, this.onMixFail = null, this.onMixClick = null, 
            this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.ConfigCallbacks), e.ConfigCallbacks.prototype = Object.create(e.Base.prototype), 
        e.ConfigCallbacks.prototype.constructor = e.ConfigCallbacks, e.ConfigControls = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.enable = !0, this.live = !1, 
            this.scope = "global", this.toggleLogic = "or", this.toggleDefault = "all", this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.ConfigControls), e.ConfigControls.prototype = Object.create(e.Base.prototype), 
        e.ConfigControls.prototype.constructor = e.ConfigControls, e.ConfigClassNames = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.block = "mixitup", 
            this.elementContainer = "container", this.elementFilter = "control", this.elementSort = "control", 
            this.elementMultimix = "control", this.elementToggle = "control", this.modifierActive = "active", 
            this.modifierDisabled = "disabled", this.modifierFailed = "failed", this.delineatorElement = "-", 
            this.delineatorModifier = "-", this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.ConfigClassNames), e.ConfigClassNames.prototype = Object.create(e.Base.prototype), 
        e.ConfigClassNames.prototype.constructor = e.ConfigClassNames, e.ConfigData = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.uidKey = "", this.dirtyCheck = !1, 
            this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.ConfigData), e.ConfigData.prototype = Object.create(e.Base.prototype), 
        e.ConfigData.prototype.constructor = e.ConfigData, e.ConfigDebug = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.enable = !1, this.showWarnings = !0, 
            this.fauxAsync = !1, this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.ConfigDebug), e.ConfigDebug.prototype = Object.create(e.Base.prototype), 
        e.ConfigDebug.prototype.constructor = e.ConfigDebug, e.ConfigLayout = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.allowNestedTargets = !0, 
            this.containerClassName = "", this.siblingBefore = null, this.siblingAfter = null, 
            this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.ConfigLayout), e.ConfigLayout.prototype = Object.create(e.Base.prototype), 
        e.ConfigLayout.prototype.constructor = e.ConfigLayout, e.ConfigLoad = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.filter = "all", this.sort = "default:asc", 
            this.dataset = null, this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.ConfigLoad), e.ConfigLoad.prototype = Object.create(e.Base.prototype), 
        e.ConfigLoad.prototype.constructor = e.ConfigLoad, e.ConfigSelectors = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.target = ".mix", this.control = "", 
            this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.ConfigSelectors), e.ConfigSelectors.prototype = Object.create(e.Base.prototype), 
        e.ConfigSelectors.prototype.constructor = e.ConfigSelectors, e.ConfigRender = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.target = null, this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.ConfigRender), e.ConfigRender.prototype = Object.create(e.Base.prototype), 
        e.ConfigRender.prototype.constructor = e.ConfigRender, e.ConfigTemplates = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.ConfigTemplates), e.ConfigTemplates.prototype = Object.create(e.Base.prototype), 
        e.ConfigTemplates.prototype.constructor = e.ConfigTemplates, e.Config = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.animation = new e.ConfigAnimation, 
            this.behavior = new e.ConfigBehavior, this.callbacks = new e.ConfigCallbacks, this.controls = new e.ConfigControls, 
            this.classNames = new e.ConfigClassNames, this.data = new e.ConfigData, this.debug = new e.ConfigDebug, 
            this.layout = new e.ConfigLayout, this.load = new e.ConfigLoad, this.selectors = new e.ConfigSelectors, 
            this.render = new e.ConfigRender, this.templates = new e.ConfigTemplates, this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.Config), e.Config.prototype = Object.create(e.Base.prototype), 
        e.Config.prototype.constructor = e.Config, e.MixerDom = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.document = null, this.body = null, 
            this.container = null, this.parent = null, this.targets = [], this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.MixerDom), e.MixerDom.prototype = Object.create(e.Base.prototype), 
        e.MixerDom.prototype.constructor = e.MixerDom, e.UiClassNames = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.base = "", this.active = "", 
            this.disabled = "", this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.UiClassNames), e.UiClassNames.prototype = Object.create(e.Base.prototype), 
        e.UiClassNames.prototype.constructor = e.UiClassNames, e.CommandDataset = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.dataset = null, this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.CommandDataset), e.CommandDataset.prototype = Object.create(e.Base.prototype), 
        e.CommandDataset.prototype.constructor = e.CommandDataset, e.CommandMultimix = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.filter = null, this.sort = null, 
            this.insert = null, this.remove = null, this.changeLayout = null, this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.CommandMultimix), e.CommandMultimix.prototype = Object.create(e.Base.prototype), 
        e.CommandMultimix.prototype.constructor = e.CommandMultimix, e.CommandFilter = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.selector = "", this.collection = null, 
            this.action = "show", this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.CommandFilter), e.CommandFilter.prototype = Object.create(e.Base.prototype), 
        e.CommandFilter.prototype.constructor = e.CommandFilter, e.CommandSort = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.sortString = "", this.attribute = "", 
            this.order = "asc", this.collection = null, this.next = null, this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.CommandSort), e.CommandSort.prototype = Object.create(e.Base.prototype), 
        e.CommandSort.prototype.constructor = e.CommandSort, e.CommandInsert = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.index = 0, this.collection = [], 
            this.position = "before", this.sibling = null, this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.CommandInsert), e.CommandInsert.prototype = Object.create(e.Base.prototype), 
        e.CommandInsert.prototype.constructor = e.CommandInsert, e.CommandRemove = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.targets = [], this.collection = [], 
            this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.CommandRemove), e.CommandRemove.prototype = Object.create(e.Base.prototype), 
        e.CommandRemove.prototype.constructor = e.CommandRemove, e.CommandChangeLayout = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.containerClassName = "", 
            this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.CommandChangeLayout), e.CommandChangeLayout.prototype = Object.create(e.Base.prototype), 
        e.CommandChangeLayout.prototype.constructor = e.CommandChangeLayout, e.ControlDefinition = function(t, a, i, o) {
            e.Base.call(this), this.callActions("beforeConstruct"), this.type = t, this.selector = a, 
            this.live = i || !1, this.parent = o || "", this.callActions("afterConstruct"), 
            n.freeze(this), n.seal(this);
        }, e.BaseStatic.call(e.ControlDefinition), e.ControlDefinition.prototype = Object.create(e.Base.prototype), 
        e.ControlDefinition.prototype.constructor = e.ControlDefinition, e.controlDefinitions = [], 
        e.controlDefinitions.push(new e.ControlDefinition("multimix", "[data-filter][data-sort]")), 
        e.controlDefinitions.push(new e.ControlDefinition("filter", "[data-filter]")), e.controlDefinitions.push(new e.ControlDefinition("sort", "[data-sort]")), 
        e.controlDefinitions.push(new e.ControlDefinition("toggle", "[data-toggle]")), e.Control = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.el = null, this.selector = "", 
            this.bound = [], this.pending = -1, this.type = "", this.status = "inactive", this.filter = "", 
            this.sort = "", this.canDisable = !1, this.handler = null, this.classNames = new e.UiClassNames, 
            this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.Control), e.Control.prototype = Object.create(e.Base.prototype), 
        n.extend(e.Control.prototype, {
            constructor: e.Control,
            init: function(t, n, a) {
                var i = this;
                if (this.callActions("beforeInit", arguments), i.el = t, i.type = n, i.selector = a, 
                i.selector) i.status = "live"; else switch (i.canDisable = "boolean" == typeof i.el.disable, 
                i.type) {
                  case "filter":
                    i.filter = i.el.getAttribute("data-filter");
                    break;

                  case "toggle":
                    i.filter = i.el.getAttribute("data-toggle");
                    break;

                  case "sort":
                    i.sort = i.el.getAttribute("data-sort");
                    break;

                  case "multimix":
                    i.filter = i.el.getAttribute("data-filter"), i.sort = i.el.getAttribute("data-sort");
                }
                i.bindClick(), e.controls.push(i), this.callActions("afterInit", arguments);
            },
            isBound: function(t) {
                var e = this, n = !1;
                return this.callActions("beforeIsBound", arguments), n = e.bound.indexOf(t) > -1, 
                e.callFilters("afterIsBound", n, arguments);
            },
            addBinding: function(t) {
                var e = this;
                this.callActions("beforeAddBinding", arguments), e.isBound() || e.bound.push(t), 
                this.callActions("afterAddBinding", arguments);
            },
            removeBinding: function(t) {
                var n = this, a = -1;
                this.callActions("beforeRemoveBinding", arguments), (a = n.bound.indexOf(t)) > -1 && n.bound.splice(a, 1), 
                n.bound.length < 1 && (n.unbindClick(), a = e.controls.indexOf(n), e.controls.splice(a, 1), 
                "active" === n.status && n.renderStatus(n.el, "inactive")), this.callActions("afterRemoveBinding", arguments);
            },
            bindClick: function() {
                var t = this;
                this.callActions("beforeBindClick", arguments), t.handler = function(e) {
                    t.handleClick(e);
                }, n.on(t.el, "click", t.handler), this.callActions("afterBindClick", arguments);
            },
            unbindClick: function() {
                var t = this;
                this.callActions("beforeUnbindClick", arguments), n.off(t.el, "click", t.handler), 
                t.handler = null, this.callActions("afterUnbindClick", arguments);
            },
            handleClick: function(t) {
                var a = this, i = null, o = null, r = !1, s = void 0, l = {}, c = null, u = [], f = -1;
                if (this.callActions("beforeHandleClick", arguments), this.pending = 0, o = a.bound[0], 
                i = a.selector ? n.closestParent(t.target, o.config.selectors.control + a.selector, !0, o.dom.document) : a.el, 
                !i) return void a.callActions("afterHandleClick", arguments);
                switch (a.type) {
                  case "filter":
                    l.filter = a.filter || i.getAttribute("data-filter");
                    break;

                  case "sort":
                    l.sort = a.sort || i.getAttribute("data-sort");
                    break;

                  case "multimix":
                    l.filter = a.filter || i.getAttribute("data-filter"), l.sort = a.sort || i.getAttribute("data-sort");
                    break;

                  case "toggle":
                    l.filter = a.filter || i.getAttribute("data-toggle"), r = "live" === a.status ? n.hasClass(i, a.classNames.active) : "active" === a.status;
                }
                for (f = 0; f < a.bound.length; f++) c = new e.CommandMultimix, n.extend(c, l), 
                u.push(c);
                for (u = a.callFilters("commandsHandleClick", u, arguments), a.pending = a.bound.length, 
                f = 0; o = a.bound[f]; f++) l = u[f], l && (o.lastClicked || (o.lastClicked = i), 
                e.events.fire("mixClick", o.dom.container, {
                    state: o.state,
                    instance: o,
                    originalEvent: t,
                    control: o.lastClicked
                }, o.dom.document), "function" == typeof o.config.callbacks.onMixClick && (s = o.config.callbacks.onMixClick.call(o.lastClicked, o.state, t, o), 
                !1 === s) || ("toggle" === a.type ? r ? o.toggleOff(l.filter) : o.toggleOn(l.filter) : o.multimix(l)));
                this.callActions("afterHandleClick", arguments);
            },
            update: function(t, n) {
                var a = this, i = new e.CommandMultimix;
                a.callActions("beforeUpdate", arguments), a.pending--, a.pending = Math.max(0, a.pending), 
                a.pending > 0 || ("live" === a.status ? a.updateLive(t, n) : (i.sort = a.sort, i.filter = a.filter, 
                a.callFilters("actionsUpdate", i, arguments), a.parseStatusChange(a.el, t, i, n)), 
                a.callActions("afterUpdate", arguments));
            },
            updateLive: function(t, n) {
                var a = this, i = null, o = null, r = null, s = -1;
                if (a.callActions("beforeUpdateLive", arguments), a.el) {
                    for (i = a.el.querySelectorAll(a.selector), s = 0; r = i[s]; s++) {
                        switch (o = new e.CommandMultimix, a.type) {
                          case "filter":
                            o.filter = r.getAttribute("data-filter");
                            break;

                          case "sort":
                            o.sort = r.getAttribute("data-sort");
                            break;

                          case "multimix":
                            o.filter = r.getAttribute("data-filter"), o.sort = r.getAttribute("data-sort");
                            break;

                          case "toggle":
                            o.filter = r.getAttribute("data-toggle");
                        }
                        o = a.callFilters("actionsUpdateLive", o, arguments), a.parseStatusChange(r, t, o, n);
                    }
                    a.callActions("afterUpdateLive", arguments);
                }
            },
            parseStatusChange: function(t, e, n, a) {
                var i = this, o = "", r = "", s = -1;
                switch (i.callActions("beforeParseStatusChange", arguments), i.type) {
                  case "filter":
                    e.filter === n.filter ? i.renderStatus(t, "active") : i.renderStatus(t, "inactive");
                    break;

                  case "multimix":
                    e.sort === n.sort && e.filter === n.filter ? i.renderStatus(t, "active") : i.renderStatus(t, "inactive");
                    break;

                  case "sort":
                    e.sort.match(/:asc/g) && (o = e.sort.replace(/:asc/g, "")), e.sort === n.sort || o === n.sort ? i.renderStatus(t, "active") : i.renderStatus(t, "inactive");
                    break;

                  case "toggle":
                    for (a.length < 1 && i.renderStatus(t, "inactive"), e.filter === n.filter && i.renderStatus(t, "active"), 
                    s = 0; s < a.length; s++) {
                        if (r = a[s], r === n.filter) {
                            i.renderStatus(t, "active");
                            break;
                        }
                        i.renderStatus(t, "inactive");
                    }
                }
                i.callActions("afterParseStatusChange", arguments);
            },
            renderStatus: function(t, e) {
                var a = this;
                switch (a.callActions("beforeRenderStatus", arguments), e) {
                  case "active":
                    n.addClass(t, a.classNames.active), n.removeClass(t, a.classNames.disabled), a.canDisable && (a.el.disabled = !1);
                    break;

                  case "inactive":
                    n.removeClass(t, a.classNames.active), n.removeClass(t, a.classNames.disabled), 
                    a.canDisable && (a.el.disabled = !1);
                    break;

                  case "disabled":
                    a.canDisable && (a.el.disabled = !0), n.addClass(t, a.classNames.disabled), n.removeClass(t, a.classNames.active);
                }
                "live" !== a.status && (a.status = e), a.callActions("afterRenderStatus", arguments);
            }
        }), e.controls = [], e.StyleData = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.x = 0, this.y = 0, 
            this.top = 0, this.right = 0, this.bottom = 0, this.left = 0, this.width = 0, this.height = 0, 
            this.marginRight = 0, this.marginBottom = 0, this.opacity = 0, this.scale = new e.TransformData, 
            this.translateX = new e.TransformData, this.translateY = new e.TransformData, this.translateZ = new e.TransformData, 
            this.rotateX = new e.TransformData, this.rotateY = new e.TransformData, this.rotateZ = new e.TransformData, 
            this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.StyleData), e.StyleData.prototype = Object.create(e.Base.prototype), 
        e.StyleData.prototype.constructor = e.StyleData, e.TransformData = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.value = 0, this.unit = "", 
            this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.TransformData), e.TransformData.prototype = Object.create(e.Base.prototype), 
        e.TransformData.prototype.constructor = e.TransformData, e.TransformDefaults = function() {
            e.StyleData.apply(this), this.callActions("beforeConstruct"), this.scale.value = .01, 
            this.scale.unit = "", this.translateX.value = 20, this.translateX.unit = "px", this.translateY.value = 20, 
            this.translateY.unit = "px", this.translateZ.value = 20, this.translateZ.unit = "px", 
            this.rotateX.value = 90, this.rotateX.unit = "deg", this.rotateY.value = 90, this.rotateY.unit = "deg", 
            this.rotateX.value = 90, this.rotateX.unit = "deg", this.rotateZ.value = 180, this.rotateZ.unit = "deg", 
            this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.TransformDefaults), e.TransformDefaults.prototype = Object.create(e.StyleData.prototype), 
        e.TransformDefaults.prototype.constructor = e.TransformDefaults, e.transformDefaults = new e.TransformDefaults, 
        e.EventDetail = function() {
            this.state = null, this.futureState = null, this.instance = null, this.originalEvent = null;
        }, e.Events = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.mixStart = null, this.mixBusy = null, 
            this.mixEnd = null, this.mixFail = null, this.mixClick = null, this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.Events), e.Events.prototype = Object.create(e.Base.prototype), 
        e.Events.prototype.constructor = e.Events, e.Events.prototype.fire = function(t, a, i, o) {
            var r = this, s = null, l = new e.EventDetail;
            if (r.callActions("beforeFire", arguments), "undefined" == typeof r[t]) throw new Error('Event type "' + t + '" not found.');
            l.state = new e.State, n.extend(l.state, i.state), i.futureState && (l.futureState = new e.State, 
            n.extend(l.futureState, i.futureState)), l.instance = i.instance, i.originalEvent && (l.originalEvent = i.originalEvent), 
            s = n.getCustomEvent(t, l, o), r.callFilters("eventFire", s, arguments), a.dispatchEvent(s);
        }, e.events = new e.Events, e.QueueItem = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.args = [], this.instruction = null, 
            this.triggerElement = null, this.deferred = null, this.isToggling = !1, this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.QueueItem), e.QueueItem.prototype = Object.create(e.Base.prototype), 
        e.QueueItem.prototype.constructor = e.QueueItem, e.Mixer = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.config = new e.Config, 
            this.id = "", this.isBusy = !1, this.isToggling = !1, this.incPadding = !0, this.controls = [], 
            this.targets = [], this.origOrder = [], this.cache = {}, this.toggleArray = [], 
            this.targetsMoved = 0, this.targetsImmovable = 0, this.targetsBound = 0, this.targetsDone = 0, 
            this.staggerDuration = 0, this.effectsIn = null, this.effectsOut = null, this.transformIn = [], 
            this.transformOut = [], this.queue = [], this.state = null, this.lastOperation = null, 
            this.lastClicked = null, this.userCallback = null, this.userDeferred = null, this.dom = new e.MixerDom, 
            this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.Mixer), e.Mixer.prototype = Object.create(e.Base.prototype), 
        n.extend(e.Mixer.prototype, {
            constructor: e.Mixer,
            attach: function(a, i, o, r) {
                var s = this, l = null, c = -1;
                for (s.callActions("beforeAttach", arguments), s.id = o, r && n.extend(s.config, r, !0, !0), 
                s.sanitizeConfig(), s.cacheDom(a, i), s.config.layout.containerClassName && n.addClass(s.dom.container, s.config.layout.containerClassName), 
                e.features.has.transitions || (s.config.animation.enable = !1), "undefined" == typeof t.console && (s.config.debug.showWarnings = !1), 
                s.config.data.uidKey && (s.config.controls.enable = !1), s.indexTargets(), s.state = s.getInitialState(), 
                c = 0; l = s.lastOperation.toHide[c]; c++) l.hide();
                s.config.controls.enable && (s.initControls(), s.buildToggleArray(null, s.state), 
                s.updateControls({
                    filter: s.state.activeFilter,
                    sort: s.state.activeSort
                })), s.parseEffects(), s.callActions("afterAttach", arguments);
            },
            sanitizeConfig: function() {
                var t = this;
                t.callActions("beforeSanitizeConfig", arguments), t.config.controls.scope = t.config.controls.scope.toLowerCase().trim(), 
                t.config.controls.toggleLogic = t.config.controls.toggleLogic.toLowerCase().trim(), 
                t.config.controls.toggleDefault = t.config.controls.toggleDefault.toLowerCase().trim(), 
                t.config.animation.effects = t.config.animation.effects.trim(), t.callActions("afterSanitizeConfig", arguments);
            },
            getInitialState: function() {
                var t = this, n = new e.State, a = new e.Operation;
                if (t.callActions("beforeGetInitialState", arguments), n.activeContainerClassName = t.config.layout.containerClassName, 
                t.config.load.dataset) {
                    if (!t.config.data.uidKey || "string" != typeof t.config.data.uidKey) throw new TypeError(e.messages.errorConfigDataUidKeyNotSet());
                    a.startDataset = a.newDataset = n.activeDataset = t.config.load.dataset.slice(), 
                    a.startContainerClassName = a.newContainerClassName = n.activeContainerClassName, 
                    a.show = t.targets.slice(), n = t.callFilters("stateGetInitialState", n, arguments);
                } else n.activeFilter = t.parseFilterArgs([ t.config.load.filter ]).command, n.activeSort = t.parseSortArgs([ t.config.load.sort ]).command, 
                n.totalTargets = t.targets.length, n = t.callFilters("stateGetInitialState", n, arguments), 
                n.activeSort.collection || n.activeSort.attribute || "random" === n.activeSort.order || "desc" === n.activeSort.order ? (a.newSort = n.activeSort, 
                t.sortOperation(a), t.printSort(!1, a), t.targets = a.newOrder) : a.startOrder = a.newOrder = t.targets, 
                a.startFilter = a.newFilter = n.activeFilter, a.startSort = a.newSort = n.activeSort, 
                a.startContainerClassName = a.newContainerClassName = n.activeContainerClassName, 
                "all" === a.newFilter.selector ? a.newFilter.selector = t.config.selectors.target : "none" === a.newFilter.selector && (a.newFilter.selector = "");
                return a = t.callFilters("operationGetInitialState", a, [ n ]), t.lastOperation = a, 
                a.newFilter && t.filterOperation(a), n = t.buildState(a);
            },
            cacheDom: function(t, e) {
                var n = this;
                n.callActions("beforeCacheDom", arguments), n.dom.document = e, n.dom.body = n.dom.document.querySelector("body"), 
                n.dom.container = t, n.dom.parent = t, n.callActions("afterCacheDom", arguments);
            },
            indexTargets: function() {
                var t = this, a = null, i = null, o = null, r = -1;
                if (t.callActions("beforeIndexTargets", arguments), t.dom.targets = t.config.layout.allowNestedTargets ? t.dom.container.querySelectorAll(t.config.selectors.target) : n.children(t.dom.container, t.config.selectors.target, t.dom.document), 
                t.dom.targets = n.arrayFromList(t.dom.targets), t.targets = [], (o = t.config.load.dataset) && o.length !== t.dom.targets.length) throw new Error(e.messages.errorDatasetPrerenderedMismatch());
                if (t.dom.targets.length) {
                    for (r = 0; i = t.dom.targets[r]; r++) a = new e.Target, a.init(i, t, o ? o[r] : void 0), 
                    a.isInDom = !0, t.targets.push(a);
                    t.dom.parent = t.dom.targets[0].parentElement === t.dom.container ? t.dom.container : t.dom.targets[0].parentElement;
                }
                t.origOrder = t.targets, t.callActions("afterIndexTargets", arguments);
            },
            initControls: function() {
                var t = this, n = "", a = null, i = null, o = null, r = null, s = null, l = -1, c = -1;
                switch (t.callActions("beforeInitControls", arguments), t.config.controls.scope) {
                  case "local":
                    o = t.dom.container;
                    break;

                  case "global":
                    o = t.dom.document;
                    break;

                  default:
                    throw new Error(e.messages.errorConfigInvalidControlsScope());
                }
                for (l = 0; n = e.controlDefinitions[l]; l++) if (t.config.controls.live || n.live) {
                    if (n.parent) {
                        if (r = t.dom[n.parent], !r || r.length < 0) continue;
                        "number" != typeof r.length && (r = [ r ]);
                    } else r = [ o ];
                    for (c = 0; i = r[c]; c++) s = t.getControl(i, n.type, n.selector), t.controls.push(s);
                } else for (a = o.querySelectorAll(t.config.selectors.control + n.selector), c = 0; i = a[c]; c++) s = t.getControl(i, n.type, ""), 
                s && t.controls.push(s);
                t.callActions("afterInitControls", arguments);
            },
            getControl: function(t, a, i) {
                var o = this, r = null, s = -1;
                if (o.callActions("beforeGetControl", arguments), !i) for (s = 0; r = e.controls[s]; s++) {
                    if (r.el === t && r.isBound(o)) return o.callFilters("controlGetControl", null, arguments);
                    if (r.el === t && r.type === a && r.selector === i) return r.addBinding(o), o.callFilters("controlGetControl", r, arguments);
                }
                return r = new e.Control, r.init(t, a, i), r.classNames.base = n.getClassname(o.config.classNames, a), 
                r.classNames.active = n.getClassname(o.config.classNames, a, o.config.classNames.modifierActive), 
                r.classNames.disabled = n.getClassname(o.config.classNames, a, o.config.classNames.modifierDisabled), 
                r.addBinding(o), o.callFilters("controlGetControl", r, arguments);
            },
            getToggleSelector: function() {
                var t = this, e = "or" === t.config.controls.toggleLogic ? ", " : "", a = "";
                return t.callActions("beforeGetToggleSelector", arguments), t.toggleArray = n.clean(t.toggleArray), 
                a = t.toggleArray.join(e), "" === a && (a = t.config.controls.toggleDefault), t.callFilters("selectorGetToggleSelector", a, arguments);
            },
            buildToggleArray: function(t, e) {
                var a = this, i = "";
                if (a.callActions("beforeBuildToggleArray", arguments), t && t.filter) i = t.filter.selector.replace(/\s/g, ""); else {
                    if (!e) return;
                    i = e.activeFilter.selector.replace(/\s/g, "");
                }
                i !== a.config.selectors.target && "all" !== i || (i = ""), "or" === a.config.controls.toggleLogic ? a.toggleArray = i.split(",") : a.toggleArray = a.splitCompoundSelector(i), 
                a.toggleArray = n.clean(a.toggleArray), a.callActions("afterBuildToggleArray", arguments);
            },
            splitCompoundSelector: function(t) {
                var e = t.split(/([\.\[])/g), n = [], a = "", i = -1;
                for ("" === e[0] && e.shift(), i = 0; i < e.length; i++) i % 2 === 0 && (a = ""), 
                a += e[i], i % 2 !== 0 && n.push(a);
                return n;
            },
            updateControls: function(t) {
                var a = this, i = null, o = new e.CommandMultimix, r = -1;
                for (a.callActions("beforeUpdateControls", arguments), t.filter ? o.filter = t.filter.selector : o.filter = a.state.activeFilter.selector, 
                t.sort ? o.sort = a.buildSortString(t.sort) : o.sort = a.buildSortString(a.state.activeSort), 
                o.filter === a.config.selectors.target && (o.filter = "all"), "" === o.filter && (o.filter = "none"), 
                n.freeze(o), r = 0; i = a.controls[r]; r++) i.update(o, a.toggleArray);
                a.callActions("afterUpdateControls", arguments);
            },
            buildSortString: function(t) {
                var e = this, n = "";
                return n += t.sortString, t.next && (n += " " + e.buildSortString(t.next)), n;
            },
            insertTargets: function(t, a) {
                var i = this, o = null, r = -1, s = null, l = null, c = null, u = -1;
                if (i.callActions("beforeInsertTargets", arguments), "undefined" == typeof t.index && (t.index = 0), 
                o = i.getNextSibling(t.index, t.sibling, t.position), s = i.dom.document.createDocumentFragment(), 
                r = o ? n.index(o, i.config.selectors.target) : i.targets.length, t.collection) {
                    for (u = 0; c = t.collection[u]; u++) {
                        if (i.dom.targets.indexOf(c) > -1) throw new Error(e.messages.errorInsertPreexistingElement());
                        c.style.display = "none", s.appendChild(c), s.appendChild(i.dom.document.createTextNode(" ")), 
                        n.isElement(c, i.dom.document) && c.matches(i.config.selectors.target) && (l = new e.Target, 
                        l.init(c, i), l.isInDom = !0, i.targets.splice(r, 0, l), r++);
                    }
                    i.dom.parent.insertBefore(s, o);
                }
                a.startOrder = i.origOrder = i.targets, i.callActions("afterInsertTargets", arguments);
            },
            getNextSibling: function(t, e, n) {
                var a = this, i = null;
                return t = Math.max(t, 0), e && "before" === n ? i = e : e && "after" === n ? i = e.nextElementSibling || null : a.targets.length > 0 && "undefined" != typeof t ? i = t < a.targets.length || !a.targets.length ? a.targets[t].dom.el : a.targets[a.targets.length - 1].dom.el.nextElementSibling : 0 === a.targets.length && a.dom.parent.children.length > 0 && (a.config.layout.siblingAfter ? i = a.config.layout.siblingAfter : a.config.layout.siblingBefore ? i = a.config.layout.siblingBefore.nextElementSibling : a.dom.parent.children[0]), 
                a.callFilters("elementGetNextSibling", i, arguments);
            },
            filterOperation: function(t) {
                var e = this, n = !1, a = -1, i = "", o = null, r = -1;
                for (e.callActions("beforeFilterOperation", arguments), i = t.newFilter.action, 
                r = 0; o = t.newOrder[r]; r++) n = t.newFilter.collection ? t.newFilter.collection.indexOf(o.dom.el) > -1 : "" !== t.newFilter.selector && o.dom.el.matches(t.newFilter.selector), 
                e.evaluateHideShow(n, o, i, t);
                if (t.toRemove.length) for (r = 0; o = t.show[r]; r++) t.toRemove.indexOf(o) > -1 && (t.show.splice(r, 1), 
                (a = t.toShow.indexOf(o)) > -1 && t.toShow.splice(a, 1), t.toHide.push(o), t.hide.push(o), 
                r--);
                t.matching = t.show.slice(), 0 === t.show.length && "" !== t.newFilter.selector && 0 !== e.targets.length && (t.hasFailed = !0), 
                e.callActions("afterFilterOperation", arguments);
            },
            evaluateHideShow: function(t, e, n, a) {
                var i = this, o = !1, r = Array.prototype.slice.call(arguments, 1);
                o = i.callFilters("testResultEvaluateHideShow", t, r), i.callActions("beforeEvaluateHideShow", arguments), 
                !0 === o && "show" === n || !1 === o && "hide" === n ? (a.show.push(e), !e.isShown && a.toShow.push(e)) : (a.hide.push(e), 
                e.isShown && a.toHide.push(e)), i.callActions("afterEvaluateHideShow", arguments);
            },
            sortOperation: function(t) {
                var a = this, i = [], o = null, r = null, s = -1;
                if (a.callActions("beforeSortOperation", arguments), t.startOrder = a.targets, t.newSort.collection) {
                    for (i = [], s = 0; r = t.newSort.collection[s]; s++) {
                        if (a.dom.targets.indexOf(r) < 0) throw new Error(e.messages.errorSortNonExistentElement());
                        o = new e.Target, o.init(r, a), o.isInDom = !0, i.push(o);
                    }
                    t.newOrder = i;
                } else "random" === t.newSort.order ? t.newOrder = n.arrayShuffle(t.startOrder) : "" === t.newSort.attribute ? (t.newOrder = a.origOrder.slice(), 
                "desc" === t.newSort.order && t.newOrder.reverse()) : (t.newOrder = t.startOrder.slice(), 
                t.newOrder.sort((function(e, n) {
                    return a.compare(e, n, t.newSort);
                })));
                n.isEqualArray(t.newOrder, t.startOrder) && (t.willSort = !1), a.callActions("afterSortOperation", arguments);
            },
            compare: function(t, e, n) {
                var a = this, i = n.order, o = a.getAttributeValue(t, n.attribute), r = a.getAttributeValue(e, n.attribute);
                return isNaN(1 * o) || isNaN(1 * r) ? (o = o.toLowerCase(), r = r.toLowerCase()) : (o *= 1, 
                r *= 1), o < r ? "asc" === i ? -1 : 1 : o > r ? "asc" === i ? 1 : -1 : o === r && n.next ? a.compare(t, e, n.next) : 0;
            },
            getAttributeValue: function(t, n) {
                var a = this, i = "";
                return i = t.dom.el.getAttribute("data-" + n), null === i && a.config.debug.showWarnings && console.warn(e.messages.warningInconsistentSortingAttributes({
                    attribute: "data-" + n
                })), a.callFilters("valueGetAttributeValue", i || 0, arguments);
            },
            printSort: function(e, a) {
                var i = this, o = e ? a.newOrder : a.startOrder, r = e ? a.startOrder : a.newOrder, s = o.length ? o[o.length - 1].dom.el.nextElementSibling : null, l = t.document.createDocumentFragment(), c = null, u = null, f = null, h = -1;
                for (i.callActions("beforePrintSort", arguments), h = 0; u = o[h]; h++) f = u.dom.el, 
                "absolute" !== f.style.position && (n.removeWhitespace(f.previousSibling), f.parentElement.removeChild(f));
                for (c = s ? s.previousSibling : i.dom.parent.lastChild, c && "#text" === c.nodeName && n.removeWhitespace(c), 
                h = 0; u = r[h]; h++) f = u.dom.el, n.isElement(l.lastChild) && l.appendChild(t.document.createTextNode(" ")), 
                l.appendChild(f);
                i.dom.parent.firstChild && i.dom.parent.firstChild !== s && l.insertBefore(t.document.createTextNode(" "), l.childNodes[0]), 
                s ? (l.appendChild(t.document.createTextNode(" ")), i.dom.parent.insertBefore(l, s)) : i.dom.parent.appendChild(l), 
                i.callActions("afterPrintSort", arguments);
            },
            parseSortString: function(t, a) {
                var i = this, o = t.split(" "), r = a, s = [], l = -1;
                for (l = 0; l < o.length; l++) {
                    switch (s = o[l].split(":"), r.sortString = o[l], r.attribute = n.dashCase(s[0]), 
                    r.order = s[1] || "asc", r.attribute) {
                      case "default":
                        r.attribute = "";
                        break;

                      case "random":
                        r.attribute = "", r.order = "random";
                    }
                    if (!r.attribute || "random" === r.order) break;
                    l < o.length - 1 && (r.next = new e.CommandSort, n.freeze(r), r = r.next);
                }
                return i.callFilters("commandsParseSort", a, arguments);
            },
            parseEffects: function() {
                var t = this, n = "", a = t.config.animation.effectsIn || t.config.animation.effects, i = t.config.animation.effectsOut || t.config.animation.effects;
                t.callActions("beforeParseEffects", arguments), t.effectsIn = new e.StyleData, t.effectsOut = new e.StyleData, 
                t.transformIn = [], t.transformOut = [], t.effectsIn.opacity = t.effectsOut.opacity = 1, 
                t.parseEffect("fade", a, t.effectsIn, t.transformIn), t.parseEffect("fade", i, t.effectsOut, t.transformOut, !0);
                for (n in e.transformDefaults) e.transformDefaults[n] instanceof e.TransformData && (t.parseEffect(n, a, t.effectsIn, t.transformIn), 
                t.parseEffect(n, i, t.effectsOut, t.transformOut, !0));
                t.parseEffect("stagger", a, t.effectsIn, t.transformIn), t.parseEffect("stagger", i, t.effectsOut, t.transformOut, !0), 
                t.callActions("afterParseEffects", arguments);
            },
            parseEffect: function(t, n, a, i, o) {
                var r = this, s = /\(([^)]+)\)/, l = -1, c = "", u = [], f = "", h = [ "%", "px", "em", "rem", "vh", "vw", "deg" ], d = "", m = -1;
                if (r.callActions("beforeParseEffect", arguments), "string" != typeof n) throw new TypeError(e.messages.errorConfigInvalidAnimationEffects());
                if (n.indexOf(t) < 0) return void ("stagger" === t && (r.staggerDuration = 0));
                switch (l = n.indexOf(t + "("), l > -1 && (c = n.substring(l), u = s.exec(c), f = u[1]), 
                t) {
                  case "fade":
                    a.opacity = f ? parseFloat(f) : 0;
                    break;

                  case "stagger":
                    r.staggerDuration = f ? parseFloat(f) : 100;
                    break;

                  default:
                    if (o && r.config.animation.reverseOut && "scale" !== t ? a[t].value = -1 * (f ? parseFloat(f) : e.transformDefaults[t].value) : a[t].value = f ? parseFloat(f) : e.transformDefaults[t].value, 
                    f) {
                        for (m = 0; d = h[m]; m++) if (f.indexOf(d) > -1) {
                            a[t].unit = d;
                            break;
                        }
                    } else a[t].unit = e.transformDefaults[t].unit;
                    i.push(t + "(" + a[t].value + a[t].unit + ")");
                }
                r.callActions("afterParseEffect", arguments);
            },
            buildState: function(t) {
                var n = this, a = new e.State, i = null, o = -1;
                for (n.callActions("beforeBuildState", arguments), o = 0; i = n.targets[o]; o++) (!t.toRemove.length || t.toRemove.indexOf(i) < 0) && a.targets.push(i.dom.el);
                for (o = 0; i = t.matching[o]; o++) a.matching.push(i.dom.el);
                for (o = 0; i = t.show[o]; o++) a.show.push(i.dom.el);
                for (o = 0; i = t.hide[o]; o++) (!t.toRemove.length || t.toRemove.indexOf(i) < 0) && a.hide.push(i.dom.el);
                return a.id = n.id, a.container = n.dom.container, a.activeFilter = t.newFilter, 
                a.activeSort = t.newSort, a.activeDataset = t.newDataset, a.activeContainerClassName = t.newContainerClassName, 
                a.hasFailed = t.hasFailed, a.totalTargets = n.targets.length, a.totalShow = t.show.length, 
                a.totalHide = t.hide.length, a.totalMatching = t.matching.length, a.triggerElement = t.triggerElement, 
                n.callFilters("stateBuildState", a, arguments);
            },
            goMix: function(a, i) {
                var o = this, r = null;
                return o.callActions("beforeGoMix", arguments), o.config.animation.duration && o.config.animation.effects && n.isVisible(o.dom.container) || (a = !1), 
                i.toShow.length || i.toHide.length || i.willSort || i.willChangeLayout || (a = !1), 
                i.startState.show.length || i.show.length || (a = !1), e.events.fire("mixStart", o.dom.container, {
                    state: i.startState,
                    futureState: i.newState,
                    instance: o
                }, o.dom.document), "function" == typeof o.config.callbacks.onMixStart && o.config.callbacks.onMixStart.call(o.dom.container, i.startState, i.newState, o), 
                n.removeClass(o.dom.container, n.getClassname(o.config.classNames, "container", o.config.classNames.modifierFailed)), 
                r = o.userDeferred ? o.userDeferred : o.userDeferred = n.defer(e.libraries), o.isBusy = !0, 
                a && e.features.has.transitions ? (t.pageYOffset !== i.docState.scrollTop && t.scrollTo(i.docState.scrollLeft, i.docState.scrollTop), 
                o.config.animation.applyPerspective && (o.dom.parent.style[e.features.perspectiveProp] = o.config.animation.perspectiveDistance, 
                o.dom.parent.style[e.features.perspectiveOriginProp] = o.config.animation.perspectiveOrigin), 
                o.config.animation.animateResizeContainer && i.startHeight !== i.newHeight && i.viewportDeltaY !== i.startHeight - i.newHeight && (o.dom.parent.style.height = i.startHeight + "px"), 
                o.config.animation.animateResizeContainer && i.startWidth !== i.newWidth && i.viewportDeltaX !== i.startWidth - i.newWidth && (o.dom.parent.style.width = i.startWidth + "px"), 
                i.startHeight === i.newHeight && (o.dom.parent.style.height = i.startHeight + "px"), 
                i.startWidth === i.newWidth && (o.dom.parent.style.width = i.startWidth + "px"), 
                i.startHeight === i.newHeight && i.startWidth === i.newWidth && (o.dom.parent.style.overflow = "hidden"), 
                requestAnimationFrame((function() {
                    o.moveTargets(i);
                })), o.callFilters("promiseGoMix", r.promise, arguments)) : (o.config.debug.fauxAsync ? setTimeout((function() {
                    o.cleanUp(i);
                }), o.config.animation.duration) : o.cleanUp(i), o.callFilters("promiseGoMix", r.promise, arguments));
            },
            getStartMixData: function(n) {
                var a = this, i = t.getComputedStyle(a.dom.parent), o = a.dom.parent.getBoundingClientRect(), r = null, s = {}, l = -1, c = i[e.features.boxSizingProp];
                for (a.incPadding = "border-box" === c, a.callActions("beforeGetStartMixData", arguments), 
                l = 0; r = n.show[l]; l++) s = r.getPosData(), n.showPosData[l] = {
                    startPosData: s
                };
                for (l = 0; r = n.toHide[l]; l++) s = r.getPosData(), n.toHidePosData[l] = {
                    startPosData: s
                };
                n.startX = o.left, n.startY = o.top, n.startHeight = a.incPadding ? o.height : o.height - parseFloat(i.paddingTop) - parseFloat(i.paddingBottom) - parseFloat(i.borderTop) - parseFloat(i.borderBottom), 
                n.startWidth = a.incPadding ? o.width : o.width - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight) - parseFloat(i.borderLeft) - parseFloat(i.borderRight), 
                a.callActions("afterGetStartMixData", arguments);
            },
            setInter: function(t) {
                var e = this, a = null, i = -1;
                for (e.callActions("beforeSetInter", arguments), e.config.animation.clampHeight && (e.dom.parent.style.height = t.startHeight + "px", 
                e.dom.parent.style.overflow = "hidden"), e.config.animation.clampWidth && (e.dom.parent.style.width = t.startWidth + "px", 
                e.dom.parent.style.overflow = "hidden"), i = 0; a = t.toShow[i]; i++) a.show();
                t.willChangeLayout && (n.removeClass(e.dom.container, t.startContainerClassName), 
                n.addClass(e.dom.container, t.newContainerClassName)), e.callActions("afterSetInter", arguments);
            },
            getInterMixData: function(t) {
                var e = this, n = null, a = -1;
                for (e.callActions("beforeGetInterMixData", arguments), a = 0; n = t.show[a]; a++) t.showPosData[a].interPosData = n.getPosData();
                for (a = 0; n = t.toHide[a]; a++) t.toHidePosData[a].interPosData = n.getPosData();
                e.callActions("afterGetInterMixData", arguments);
            },
            setFinal: function(t) {
                var e = this, n = null, a = -1;
                for (e.callActions("beforeSetFinal", arguments), t.willSort && e.printSort(!1, t), 
                a = 0; n = t.toHide[a]; a++) n.hide();
                e.callActions("afterSetFinal", arguments);
            },
            getFinalMixData: function(e) {
                var a = this, i = null, o = null, r = null, s = -1;
                for (a.callActions("beforeGetFinalMixData", arguments), s = 0; r = e.show[s]; s++) e.showPosData[s].finalPosData = r.getPosData();
                for (s = 0; r = e.toHide[s]; s++) e.toHidePosData[s].finalPosData = r.getPosData();
                for ((a.config.animation.clampHeight || a.config.animation.clampWidth) && (a.dom.parent.style.height = a.dom.parent.style.width = a.dom.parent.style.overflow = ""), 
                a.incPadding || (i = t.getComputedStyle(a.dom.parent)), o = a.dom.parent.getBoundingClientRect(), 
                e.newX = o.left, e.newY = o.top, e.newHeight = a.incPadding ? o.height : o.height - parseFloat(i.paddingTop) - parseFloat(i.paddingBottom) - parseFloat(i.borderTop) - parseFloat(i.borderBottom), 
                e.newWidth = a.incPadding ? o.width : o.width - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight) - parseFloat(i.borderLeft) - parseFloat(i.borderRight), 
                e.viewportDeltaX = e.docState.viewportWidth - this.dom.document.documentElement.clientWidth, 
                e.viewportDeltaY = e.docState.viewportHeight - this.dom.document.documentElement.clientHeight, 
                e.willSort && a.printSort(!0, e), s = 0; r = e.toShow[s]; s++) r.hide();
                for (s = 0; r = e.toHide[s]; s++) r.show();
                e.willChangeLayout && (n.removeClass(a.dom.container, e.newContainerClassName), 
                n.addClass(a.dom.container, a.config.layout.containerClassName)), a.callActions("afterGetFinalMixData", arguments);
            },
            getTweenData: function(t) {
                var n = this, a = null, i = null, o = Object.getOwnPropertyNames(n.effectsIn), r = "", s = null, l = -1, c = -1, u = -1, f = -1;
                for (n.callActions("beforeGetTweenData", arguments), u = 0; a = t.show[u]; u++) for (i = t.showPosData[u], 
                i.posIn = new e.StyleData, i.posOut = new e.StyleData, i.tweenData = new e.StyleData, 
                a.isShown ? (i.posIn.x = i.startPosData.x - i.interPosData.x, i.posIn.y = i.startPosData.y - i.interPosData.y) : i.posIn.x = i.posIn.y = 0, 
                i.posOut.x = i.finalPosData.x - i.interPosData.x, i.posOut.y = i.finalPosData.y - i.interPosData.y, 
                i.posIn.opacity = a.isShown ? 1 : n.effectsIn.opacity, i.posOut.opacity = 1, i.tweenData.opacity = i.posOut.opacity - i.posIn.opacity, 
                a.isShown || n.config.animation.nudge || (i.posIn.x = i.posOut.x, i.posIn.y = i.posOut.y), 
                i.tweenData.x = i.posOut.x - i.posIn.x, i.tweenData.y = i.posOut.y - i.posIn.y, 
                n.config.animation.animateResizeTargets && (i.posIn.width = i.startPosData.width, 
                i.posIn.height = i.startPosData.height, l = (i.startPosData.width || i.finalPosData.width) - i.interPosData.width, 
                i.posIn.marginRight = i.startPosData.marginRight - l, c = (i.startPosData.height || i.finalPosData.height) - i.interPosData.height, 
                i.posIn.marginBottom = i.startPosData.marginBottom - c, i.posOut.width = i.finalPosData.width, 
                i.posOut.height = i.finalPosData.height, l = (i.finalPosData.width || i.startPosData.width) - i.interPosData.width, 
                i.posOut.marginRight = i.finalPosData.marginRight - l, c = (i.finalPosData.height || i.startPosData.height) - i.interPosData.height, 
                i.posOut.marginBottom = i.finalPosData.marginBottom - c, i.tweenData.width = i.posOut.width - i.posIn.width, 
                i.tweenData.height = i.posOut.height - i.posIn.height, i.tweenData.marginRight = i.posOut.marginRight - i.posIn.marginRight, 
                i.tweenData.marginBottom = i.posOut.marginBottom - i.posIn.marginBottom), f = 0; r = o[f]; f++) s = n.effectsIn[r], 
                s instanceof e.TransformData && s.value && (i.posIn[r].value = s.value, i.posOut[r].value = 0, 
                i.tweenData[r].value = i.posOut[r].value - i.posIn[r].value, i.posIn[r].unit = i.posOut[r].unit = i.tweenData[r].unit = s.unit);
                for (u = 0; a = t.toHide[u]; u++) for (i = t.toHidePosData[u], i.posIn = new e.StyleData, 
                i.posOut = new e.StyleData, i.tweenData = new e.StyleData, i.posIn.x = a.isShown ? i.startPosData.x - i.interPosData.x : 0, 
                i.posIn.y = a.isShown ? i.startPosData.y - i.interPosData.y : 0, i.posOut.x = n.config.animation.nudge ? 0 : i.posIn.x, 
                i.posOut.y = n.config.animation.nudge ? 0 : i.posIn.y, i.tweenData.x = i.posOut.x - i.posIn.x, 
                i.tweenData.y = i.posOut.y - i.posIn.y, n.config.animation.animateResizeTargets && (i.posIn.width = i.startPosData.width, 
                i.posIn.height = i.startPosData.height, l = i.startPosData.width - i.interPosData.width, 
                i.posIn.marginRight = i.startPosData.marginRight - l, c = i.startPosData.height - i.interPosData.height, 
                i.posIn.marginBottom = i.startPosData.marginBottom - c), i.posIn.opacity = 1, i.posOut.opacity = n.effectsOut.opacity, 
                i.tweenData.opacity = i.posOut.opacity - i.posIn.opacity, f = 0; r = o[f]; f++) s = n.effectsOut[r], 
                s instanceof e.TransformData && s.value && (i.posIn[r].value = 0, i.posOut[r].value = s.value, 
                i.tweenData[r].value = i.posOut[r].value - i.posIn[r].value, i.posIn[r].unit = i.posOut[r].unit = i.tweenData[r].unit = s.unit);
                n.callActions("afterGetTweenData", arguments);
            },
            moveTargets: function(t) {
                var a = this, i = null, o = null, r = null, s = "", l = !1, c = -1, u = -1, f = a.checkProgress.bind(a);
                for (a.callActions("beforeMoveTargets", arguments), u = 0; i = t.show[u]; u++) o = new e.IMoveData, 
                r = t.showPosData[u], s = i.isShown ? "none" : "show", l = a.willTransition(s, t.hasEffect, r.posIn, r.posOut), 
                l && c++, i.show(), o.posIn = r.posIn, o.posOut = r.posOut, o.statusChange = s, 
                o.staggerIndex = c, o.operation = t, o.callback = l ? f : null, i.move(o);
                for (u = 0; i = t.toHide[u]; u++) r = t.toHidePosData[u], o = new e.IMoveData, s = "hide", 
                l = a.willTransition(s, r.posIn, r.posOut), o.posIn = r.posIn, o.posOut = r.posOut, 
                o.statusChange = s, o.staggerIndex = u, o.operation = t, o.callback = l ? f : null, 
                i.move(o);
                a.config.animation.animateResizeContainer && (a.dom.parent.style[e.features.transitionProp] = "height " + a.config.animation.duration + "ms ease, width " + a.config.animation.duration + "ms ease ", 
                requestAnimationFrame((function() {
                    t.startHeight !== t.newHeight && t.viewportDeltaY !== t.startHeight - t.newHeight && (a.dom.parent.style.height = t.newHeight + "px"), 
                    t.startWidth !== t.newWidth && t.viewportDeltaX !== t.startWidth - t.newWidth && (a.dom.parent.style.width = t.newWidth + "px");
                }))), t.willChangeLayout && (n.removeClass(a.dom.container, a.config.layout.ContainerClassName), 
                n.addClass(a.dom.container, t.newContainerClassName)), a.callActions("afterMoveTargets", arguments);
            },
            hasEffect: function() {
                var t = this, e = [ "scale", "translateX", "translateY", "translateZ", "rotateX", "rotateY", "rotateZ" ], n = "", a = null, i = !1, o = -1, r = -1;
                if (1 !== t.effectsIn.opacity) return t.callFilters("resultHasEffect", !0, arguments);
                for (r = 0; n = e[r]; r++) if (a = t.effectsIn[n], o = "undefined" !== a.value ? a.value : a, 
                0 !== o) {
                    i = !0;
                    break;
                }
                return t.callFilters("resultHasEffect", i, arguments);
            },
            willTransition: function(t, e, a, i) {
                var o = this, r = !1;
                return r = !!n.isVisible(o.dom.container) && (!!("none" !== t && e || a.x !== i.x || a.y !== i.y) || !!o.config.animation.animateResizeTargets && (a.width !== i.width || a.height !== i.height || a.marginRight !== i.marginRight || a.marginTop !== i.marginTop)), 
                o.callFilters("resultWillTransition", r, arguments);
            },
            checkProgress: function(t) {
                var e = this;
                e.targetsDone++, e.targetsBound === e.targetsDone && e.cleanUp(t);
            },
            cleanUp: function(t) {
                var a = this, i = null, o = null, r = null, s = null, l = -1;
                for (a.callActions("beforeCleanUp", arguments), a.targetsMoved = a.targetsImmovable = a.targetsBound = a.targetsDone = 0, 
                l = 0; i = t.show[l]; l++) i.cleanUp(), i.show();
                for (l = 0; i = t.toHide[l]; l++) i.cleanUp(), i.hide();
                if (t.willSort && a.printSort(!1, t), a.dom.parent.style[e.features.transitionProp] = a.dom.parent.style.height = a.dom.parent.style.width = a.dom.parent.style.overflow = a.dom.parent.style[e.features.perspectiveProp] = a.dom.parent.style[e.features.perspectiveOriginProp] = "", 
                t.willChangeLayout && (n.removeClass(a.dom.container, t.startContainerClassName), 
                n.addClass(a.dom.container, t.newContainerClassName)), t.toRemove.length) {
                    for (l = 0; i = a.targets[l]; l++) t.toRemove.indexOf(i) > -1 && ((o = i.dom.el.previousSibling) && "#text" === o.nodeName && (r = i.dom.el.nextSibling) && "#text" === r.nodeName && n.removeWhitespace(o), 
                    t.willSort || a.dom.parent.removeChild(i.dom.el), a.targets.splice(l, 1), i.isInDom = !1, 
                    l--);
                    a.origOrder = a.targets;
                }
                t.willSort && (a.targets = t.newOrder), a.state = t.newState, a.lastOperation = t, 
                a.dom.targets = a.state.targets, e.events.fire("mixEnd", a.dom.container, {
                    state: a.state,
                    instance: a
                }, a.dom.document), "function" == typeof a.config.callbacks.onMixEnd && a.config.callbacks.onMixEnd.call(a.dom.container, a.state, a), 
                t.hasFailed && (e.events.fire("mixFail", a.dom.container, {
                    state: a.state,
                    instance: a
                }, a.dom.document), "function" == typeof a.config.callbacks.onMixFail && a.config.callbacks.onMixFail.call(a.dom.container, a.state, a), 
                n.addClass(a.dom.container, n.getClassname(a.config.classNames, "container", a.config.classNames.modifierFailed))), 
                "function" == typeof a.userCallback && a.userCallback.call(a.dom.container, a.state, a), 
                "function" == typeof a.userDeferred.resolve && a.userDeferred.resolve(a.state), 
                a.userCallback = null, a.userDeferred = null, a.lastClicked = null, a.isToggling = !1, 
                a.isBusy = !1, a.queue.length && (a.callActions("beforeReadQueueCleanUp", arguments), 
                s = a.queue.shift(), a.userDeferred = s.deferred, a.isToggling = s.isToggling, a.lastClicked = s.triggerElement, 
                s.instruction.command instanceof e.CommandMultimix ? a.multimix.apply(a, s.args) : a.dataset.apply(a, s.args)), 
                a.callActions("afterCleanUp", arguments);
            },
            parseMultimixArgs: function(t) {
                var a = this, i = new e.UserInstruction, o = null, r = -1;
                for (i.animate = a.config.animation.enable, i.command = new e.CommandMultimix, r = 0; r < t.length; r++) o = t[r], 
                null !== o && ("object" == typeof o ? n.extend(i.command, o) : "boolean" == typeof o ? i.animate = o : "function" == typeof o && (i.callback = o));
                return !i.command.insert || i.command.insert instanceof e.CommandInsert || (i.command.insert = a.parseInsertArgs([ i.command.insert ]).command), 
                !i.command.remove || i.command.remove instanceof e.CommandRemove || (i.command.remove = a.parseRemoveArgs([ i.command.remove ]).command), 
                !i.command.filter || i.command.filter instanceof e.CommandFilter || (i.command.filter = a.parseFilterArgs([ i.command.filter ]).command), 
                !i.command.sort || i.command.sort instanceof e.CommandSort || (i.command.sort = a.parseSortArgs([ i.command.sort ]).command), 
                !i.command.changeLayout || i.command.changeLayout instanceof e.CommandChangeLayout || (i.command.changeLayout = a.parseChangeLayoutArgs([ i.command.changeLayout ]).command), 
                i = a.callFilters("instructionParseMultimixArgs", i, arguments), n.freeze(i), i;
            },
            parseFilterArgs: function(t) {
                var a = this, i = new e.UserInstruction, o = null, r = -1;
                for (i.animate = a.config.animation.enable, i.command = new e.CommandFilter, r = 0; r < t.length; r++) o = t[r], 
                "string" == typeof o ? i.command.selector = o : null === o ? i.command.collection = [] : "object" == typeof o && n.isElement(o, a.dom.document) ? i.command.collection = [ o ] : "object" == typeof o && "undefined" != typeof o.length ? i.command.collection = n.arrayFromList(o) : "object" == typeof o ? n.extend(i.command, o) : "boolean" == typeof o ? i.animate = o : "function" == typeof o && (i.callback = o);
                if (i.command.selector && i.command.collection) throw new Error(e.messages.errorFilterInvalidArguments());
                return i = a.callFilters("instructionParseFilterArgs", i, arguments), n.freeze(i), 
                i;
            },
            parseSortArgs: function(t) {
                var a = this, i = new e.UserInstruction, o = null, r = "", s = -1;
                for (i.animate = a.config.animation.enable, i.command = new e.CommandSort, s = 0; s < t.length; s++) if (o = t[s], 
                null !== o) switch (typeof o) {
                  case "string":
                    r = o;
                    break;

                  case "object":
                    o.length && (i.command.collection = n.arrayFromList(o));
                    break;

                  case "boolean":
                    i.animate = o;
                    break;

                  case "function":
                    i.callback = o;
                }
                return r && (i.command = a.parseSortString(r, i.command)), i = a.callFilters("instructionParseSortArgs", i, arguments), 
                n.freeze(i), i;
            },
            parseInsertArgs: function(t) {
                var a = this, i = new e.UserInstruction, o = null, r = -1;
                for (i.animate = a.config.animation.enable, i.command = new e.CommandInsert, r = 0; r < t.length; r++) o = t[r], 
                null !== o && ("number" == typeof o ? i.command.index = o : "string" == typeof o && [ "before", "after" ].indexOf(o) > -1 ? i.command.position = o : "string" == typeof o ? i.command.collection = n.arrayFromList(n.createElement(o).childNodes) : "object" == typeof o && n.isElement(o, a.dom.document) ? i.command.collection.length ? i.command.sibling = o : i.command.collection = [ o ] : "object" == typeof o && o.length ? i.command.collection.length ? i.command.sibling = o[0] : i.command.collection = o : "object" == typeof o && o.childNodes && o.childNodes.length ? i.command.collection.length ? i.command.sibling = o.childNodes[0] : i.command.collection = n.arrayFromList(o.childNodes) : "object" == typeof o ? n.extend(i.command, o) : "boolean" == typeof o ? i.animate = o : "function" == typeof o && (i.callback = o));
                if (i.command.index && i.command.sibling) throw new Error(e.messages.errorInsertInvalidArguments());
                return !i.command.collection.length && a.config.debug.showWarnings && console.warn(e.messages.warningInsertNoElements()), 
                i = a.callFilters("instructionParseInsertArgs", i, arguments), n.freeze(i), i;
            },
            parseRemoveArgs: function(t) {
                var a = this, i = new e.UserInstruction, o = null, r = null, s = -1;
                for (i.animate = a.config.animation.enable, i.command = new e.CommandRemove, s = 0; s < t.length; s++) if (r = t[s], 
                null !== r) switch (typeof r) {
                  case "number":
                    a.targets[r] && (i.command.targets[0] = a.targets[r]);
                    break;

                  case "string":
                    i.command.collection = n.arrayFromList(a.dom.parent.querySelectorAll(r));
                    break;

                  case "object":
                    r && r.length ? i.command.collection = r : n.isElement(r, a.dom.document) ? i.command.collection = [ r ] : n.extend(i.command, r);
                    break;

                  case "boolean":
                    i.animate = r;
                    break;

                  case "function":
                    i.callback = r;
                }
                if (i.command.collection.length) for (s = 0; o = a.targets[s]; s++) i.command.collection.indexOf(o.dom.el) > -1 && i.command.targets.push(o);
                return !i.command.targets.length && a.config.debug.showWarnings && console.warn(e.messages.warningRemoveNoElements()), 
                n.freeze(i), i;
            },
            parseDatasetArgs: function(t) {
                var a = this, i = new e.UserInstruction, o = null, r = -1;
                for (i.animate = a.config.animation.enable, i.command = new e.CommandDataset, r = 0; r < t.length; r++) if (o = t[r], 
                null !== o) switch (typeof o) {
                  case "object":
                    Array.isArray(o) || "number" == typeof o.length ? i.command.dataset = o : n.extend(i.command, o);
                    break;

                  case "boolean":
                    i.animate = o;
                    break;

                  case "function":
                    i.callback = o;
                }
                return n.freeze(i), i;
            },
            parseChangeLayoutArgs: function(t) {
                var a = this, i = new e.UserInstruction, o = null, r = -1;
                for (i.animate = a.config.animation.enable, i.command = new e.CommandChangeLayout, 
                r = 0; r < t.length; r++) if (o = t[r], null !== o) switch (typeof o) {
                  case "string":
                    i.command.containerClassName = o;
                    break;

                  case "object":
                    n.extend(i.command, o);
                    break;

                  case "boolean":
                    i.animate = o;
                    break;

                  case "function":
                    i.callback = o;
                }
                return n.freeze(i), i;
            },
            queueMix: function(t) {
                var a = this, i = null, o = "";
                return a.callActions("beforeQueueMix", arguments), i = n.defer(e.libraries), a.config.animation.queue && a.queue.length < a.config.animation.queueLimit ? (t.deferred = i, 
                a.queue.push(t), a.config.controls.enable && (a.isToggling ? (a.buildToggleArray(t.instruction.command), 
                o = a.getToggleSelector(), a.updateControls({
                    filter: {
                        selector: o
                    }
                })) : a.updateControls(t.instruction.command))) : (a.config.debug.showWarnings && console.warn(e.messages.warningMultimixInstanceQueueFull()), 
                i.resolve(a.state), e.events.fire("mixBusy", a.dom.container, {
                    state: a.state,
                    instance: a
                }, a.dom.document), "function" == typeof a.config.callbacks.onMixBusy && a.config.callbacks.onMixBusy.call(a.dom.container, a.state, a)), 
                a.callFilters("promiseQueueMix", i.promise, arguments);
            },
            getDataOperation: function(t) {
                var a = this, i = new e.Operation, o = [];
                if (i = a.callFilters("operationUnmappedGetDataOperation", i, arguments), a.dom.targets.length && !(o = a.state.activeDataset || []).length) throw new Error(e.messages.errorDatasetNotSet());
                return i.id = n.randomHex(), i.startState = a.state, i.startDataset = o, i.newDataset = t.slice(), 
                a.diffDatasets(i), i.startOrder = a.targets, i.newOrder = i.show, a.config.animation.enable && (a.getStartMixData(i), 
                a.setInter(i), i.docState = n.getDocumentState(a.dom.document), a.getInterMixData(i), 
                a.setFinal(i), a.getFinalMixData(i), a.parseEffects(), i.hasEffect = a.hasEffect(), 
                a.getTweenData(i)), a.targets = i.show.slice(), i.newState = a.buildState(i), Array.prototype.push.apply(a.targets, i.toRemove), 
                i = a.callFilters("operationMappedGetDataOperation", i, arguments);
            },
            diffDatasets: function(t) {
                var a = this, i = [], o = [], r = [], s = null, l = null, c = null, u = null, f = null, h = {}, d = "", m = -1;
                for (a.callActions("beforeDiffDatasets", arguments), m = 0; s = t.newDataset[m]; m++) {
                    if ("undefined" == typeof (d = s[a.config.data.uidKey]) || d.toString().length < 1) throw new TypeError(e.messages.errorDatasetInvalidUidKey({
                        uidKey: a.config.data.uidKey
                    }));
                    if (h[d]) throw new Error(e.messages.errorDatasetDuplicateUid({
                        uid: d
                    }));
                    h[d] = !0, (l = a.cache[d]) instanceof e.Target ? (a.config.data.dirtyCheck && !n.deepEquals(s, l.data) && (c = l.render(s), 
                    l.data = s, c !== l.dom.el && (l.isInDom && (l.unbindEvents(), a.dom.parent.replaceChild(c, l.dom.el)), 
                    l.isShown || (c.style.display = "none"), l.dom.el = c, l.isInDom && l.bindEvents())), 
                    c = l.dom.el) : (l = new e.Target, l.init(null, a, s), l.hide()), l.isInDom ? (f = l.dom.el.nextElementSibling, 
                    o.push(d), u && (u.lastElementChild && u.appendChild(a.dom.document.createTextNode(" ")), 
                    a.insertDatasetFrag(u, l.dom.el, r), u = null)) : (u || (u = a.dom.document.createDocumentFragment()), 
                    u.lastElementChild && u.appendChild(a.dom.document.createTextNode(" ")), u.appendChild(l.dom.el), 
                    l.isInDom = !0, l.unbindEvents(), l.bindEvents(), l.hide(), t.toShow.push(l), r.push(l)), 
                    t.show.push(l);
                }
                for (u && (f = f || a.config.layout.siblingAfter, f && u.appendChild(a.dom.document.createTextNode(" ")), 
                a.insertDatasetFrag(u, f, r)), m = 0; s = t.startDataset[m]; m++) d = s[a.config.data.uidKey], 
                l = a.cache[d], t.show.indexOf(l) < 0 ? (t.hide.push(l), t.toHide.push(l), t.toRemove.push(l)) : i.push(d);
                n.isEqualArray(i, o) || (t.willSort = !0), a.callActions("afterDiffDatasets", arguments);
            },
            insertDatasetFrag: function(t, e, a) {
                var i = this, o = e ? n.arrayFromList(i.dom.parent.children).indexOf(e) : i.targets.length;
                for (i.dom.parent.insertBefore(t, e); a.length; ) i.targets.splice(o, 0, a.shift()), 
                o++;
            },
            willSort: function(t, e) {
                var n = this, a = !1;
                return a = !!(n.config.behavior.liveSort || "random" === t.order || t.attribute !== e.attribute || t.order !== e.order || t.collection !== e.collection || null === t.next && e.next || t.next && null === e.next) || !(!t.next || !e.next) && n.willSort(t.next, e.next), 
                n.callFilters("resultWillSort", a, arguments);
            },
            show: function() {
                var t = this;
                return t.filter("all");
            },
            hide: function() {
                var t = this;
                return t.filter("none");
            },
            isMixing: function() {
                var t = this;
                return t.isBusy;
            },
            filter: function() {
                var t = this, e = t.parseFilterArgs(arguments);
                return t.multimix({
                    filter: e.command
                }, e.animate, e.callback);
            },
            toggleOn: function() {
                var t = this, e = t.parseFilterArgs(arguments), n = e.command.selector, a = "";
                return t.isToggling = !0, t.toggleArray.indexOf(n) < 0 && t.toggleArray.push(n), 
                a = t.getToggleSelector(), t.multimix({
                    filter: a
                }, e.animate, e.callback);
            },
            toggleOff: function() {
                var t = this, e = t.parseFilterArgs(arguments), n = e.command.selector, a = t.toggleArray.indexOf(n), i = "";
                return t.isToggling = !0, a > -1 && t.toggleArray.splice(a, 1), i = t.getToggleSelector(), 
                t.multimix({
                    filter: i
                }, e.animate, e.callback);
            },
            sort: function() {
                var t = this, e = t.parseSortArgs(arguments);
                return t.multimix({
                    sort: e.command
                }, e.animate, e.callback);
            },
            changeLayout: function() {
                var t = this, e = t.parseChangeLayoutArgs(arguments);
                return t.multimix({
                    changeLayout: e.command
                }, e.animate, e.callback);
            },
            dataset: function() {
                var t = this, n = t.parseDatasetArgs(arguments), a = null, i = null, o = !1;
                return t.callActions("beforeDataset", arguments), t.isBusy ? (i = new e.QueueItem, 
                i.args = arguments, i.instruction = n, t.queueMix(i)) : (n.callback && (t.userCallback = n.callback), 
                o = n.animate ^ t.config.animation.enable ? n.animate : t.config.animation.enable, 
                a = t.getDataOperation(n.command.dataset), t.goMix(o, a));
            },
            multimix: function() {
                var t = this, n = null, a = !1, i = null, o = t.parseMultimixArgs(arguments);
                return t.callActions("beforeMultimix", arguments), t.isBusy ? (i = new e.QueueItem, 
                i.args = arguments, i.instruction = o, i.triggerElement = t.lastClicked, i.isToggling = t.isToggling, 
                t.queueMix(i)) : (n = t.getOperation(o.command), t.config.controls.enable && (o.command.filter && !t.isToggling && (t.toggleArray.length = 0, 
                t.buildToggleArray(n.command)), t.queue.length < 1 && t.updateControls(n.command)), 
                o.callback && (t.userCallback = o.callback), a = o.animate ^ t.config.animation.enable ? o.animate : t.config.animation.enable, 
                t.callFilters("operationMultimix", n, arguments), t.goMix(a, n));
            },
            getOperation: function(t) {
                var a = this, i = t.sort, o = t.filter, r = t.changeLayout, s = t.remove, l = t.insert, c = new e.Operation;
                return c = a.callFilters("operationUnmappedGetOperation", c, arguments), c.id = n.randomHex(), 
                c.command = t, c.startState = a.state, c.triggerElement = a.lastClicked, a.isBusy ? (a.config.debug.showWarnings && console.warn(e.messages.warningGetOperationInstanceBusy()), 
                null) : (l && a.insertTargets(l, c), s && (c.toRemove = s.targets), c.startSort = c.newSort = c.startState.activeSort, 
                c.startOrder = c.newOrder = a.targets, i && (c.startSort = c.startState.activeSort, 
                c.newSort = i, c.willSort = a.willSort(i, c.startState.activeSort), c.willSort && a.sortOperation(c)), 
                c.startFilter = c.startState.activeFilter, o ? c.newFilter = o : c.newFilter = n.extend(new e.CommandFilter, c.startFilter), 
                "all" === c.newFilter.selector ? c.newFilter.selector = a.config.selectors.target : "none" === c.newFilter.selector && (c.newFilter.selector = ""), 
                a.filterOperation(c), c.startContainerClassName = c.startState.activeContainerClassName, 
                r ? (c.newContainerClassName = r.containerClassName, c.newContainerClassName !== c.startContainerClassName && (c.willChangeLayout = !0)) : c.newContainerClassName = c.startContainerClassName, 
                a.config.animation.enable && (a.getStartMixData(c), a.setInter(c), c.docState = n.getDocumentState(a.dom.document), 
                a.getInterMixData(c), a.setFinal(c), a.getFinalMixData(c), a.parseEffects(), c.hasEffect = a.hasEffect(), 
                a.getTweenData(c)), c.willSort && (a.targets = c.newOrder), c.newState = a.buildState(c), 
                a.callFilters("operationMappedGetOperation", c, arguments));
            },
            tween: function(t, e) {
                var n = null, a = null, i = -1, o = -1;
                for (e = Math.min(e, 1), e = Math.max(e, 0), o = 0; n = t.show[o]; o++) a = t.showPosData[o], 
                n.applyTween(a, e);
                for (o = 0; n = t.hide[o]; o++) n.isShown && n.hide(), (i = t.toHide.indexOf(n)) > -1 && (a = t.toHidePosData[i], 
                n.isShown || n.show(), n.applyTween(a, e));
            },
            insert: function() {
                var t = this, e = t.parseInsertArgs(arguments);
                return t.multimix({
                    insert: e.command
                }, e.animate, e.callback);
            },
            insertBefore: function() {
                var t = this, e = t.parseInsertArgs(arguments);
                return t.insert(e.command.collection, "before", e.command.sibling, e.animate, e.callback);
            },
            insertAfter: function() {
                var t = this, e = t.parseInsertArgs(arguments);
                return t.insert(e.command.collection, "after", e.command.sibling, e.animate, e.callback);
            },
            prepend: function() {
                var t = this, e = t.parseInsertArgs(arguments);
                return t.insert(0, e.command.collection, e.animate, e.callback);
            },
            append: function() {
                var t = this, e = t.parseInsertArgs(arguments);
                return t.insert(t.state.totalTargets, e.command.collection, e.animate, e.callback);
            },
            remove: function() {
                var t = this, e = t.parseRemoveArgs(arguments);
                return t.multimix({
                    remove: e.command
                }, e.animate, e.callback);
            },
            getConfig: function(t) {
                var e = this, a = null;
                return a = t ? n.getProperty(e.config, t) : e.config, e.callFilters("valueGetConfig", a, arguments);
            },
            configure: function(t) {
                var e = this;
                e.callActions("beforeConfigure", arguments), n.extend(e.config, t, !0, !0), e.callActions("afterConfigure", arguments);
            },
            getState: function() {
                var t = this, a = null;
                return a = new e.State, n.extend(a, t.state), n.freeze(a), t.callFilters("stateGetState", a, arguments);
            },
            forceRefresh: function() {
                var t = this;
                t.indexTargets();
            },
            forceRender: function() {
                var t = this, e = null, n = null, a = "";
                for (a in t.cache) e = t.cache[a], n = e.render(e.data), n !== e.dom.el && (e.isInDom && (e.unbindEvents(), 
                t.dom.parent.replaceChild(n, e.dom.el)), e.isShown || (n.style.display = "none"), 
                e.dom.el = n, e.isInDom && e.bindEvents());
                t.state = t.buildState(t.lastOperation);
            },
            destroy: function(t) {
                var n = this, a = null, i = null, o = 0;
                for (n.callActions("beforeDestroy", arguments), o = 0; a = n.controls[o]; o++) a.removeBinding(n);
                for (o = 0; i = n.targets[o]; o++) t && i.show(), i.unbindEvents();
                n.dom.container.id.match(/^MixItUp/) && n.dom.container.removeAttribute("id"), delete e.instances[n.id], 
                n.callActions("afterDestroy", arguments);
            }
        }), e.IMoveData = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.posIn = null, this.posOut = null, 
            this.operation = null, this.callback = null, this.statusChange = "", this.duration = -1, 
            this.staggerIndex = -1, this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.IMoveData), e.IMoveData.prototype = Object.create(e.Base.prototype), 
        e.IMoveData.prototype.constructor = e.IMoveData, e.TargetDom = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.el = null, this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.TargetDom), e.TargetDom.prototype = Object.create(e.Base.prototype), 
        e.TargetDom.prototype.constructor = e.TargetDom, e.Target = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.id = "", this.sortString = "", 
            this.mixer = null, this.callback = null, this.isShown = !1, this.isBound = !1, this.isExcluded = !1, 
            this.isInDom = !1, this.handler = null, this.operation = null, this.data = null, 
            this.dom = new e.TargetDom, this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.Target), e.Target.prototype = Object.create(e.Base.prototype), 
        n.extend(e.Target.prototype, {
            constructor: e.Target,
            init: function(t, n, a) {
                var i = this, o = "";
                if (i.callActions("beforeInit", arguments), i.mixer = n, t || (t = i.render(a)), 
                i.cacheDom(t), i.bindEvents(), "none" !== i.dom.el.style.display && (i.isShown = !0), 
                a && n.config.data.uidKey) {
                    if ("undefined" == typeof (o = a[n.config.data.uidKey]) || o.toString().length < 1) throw new TypeError(e.messages.errorDatasetInvalidUidKey({
                        uidKey: n.config.data.uidKey
                    }));
                    i.id = o, i.data = a, n.cache[o] = i;
                }
                i.callActions("afterInit", arguments);
            },
            render: function(t) {
                var a = this, i = null, o = null, r = null, s = "";
                if (a.callActions("beforeRender", arguments), i = a.callFilters("renderRender", a.mixer.config.render.target, arguments), 
                "function" != typeof i) throw new TypeError(e.messages.errorDatasetRendererNotSet());
                return s = i(t), s && "object" == typeof s && n.isElement(s) ? o = s : "string" == typeof s && (r = document.createElement("div"), 
                r.innerHTML = s, o = r.firstElementChild), a.callFilters("elRender", o, arguments);
            },
            cacheDom: function(t) {
                var e = this;
                e.callActions("beforeCacheDom", arguments), e.dom.el = t, e.callActions("afterCacheDom", arguments);
            },
            getSortString: function(t) {
                var e = this, n = e.dom.el.getAttribute("data-" + t) || "";
                e.callActions("beforeGetSortString", arguments), n = isNaN(1 * n) ? n.toLowerCase() : 1 * n, 
                e.sortString = n, e.callActions("afterGetSortString", arguments);
            },
            show: function() {
                var t = this;
                t.callActions("beforeShow", arguments), t.isShown || (t.dom.el.style.display = "", 
                t.isShown = !0), t.callActions("afterShow", arguments);
            },
            hide: function() {
                var t = this;
                t.callActions("beforeHide", arguments), t.isShown && (t.dom.el.style.display = "none", 
                t.isShown = !1), t.callActions("afterHide", arguments);
            },
            move: function(t) {
                var e = this;
                e.callActions("beforeMove", arguments), e.isExcluded || e.mixer.targetsMoved++, 
                e.applyStylesIn(t), requestAnimationFrame((function() {
                    e.applyStylesOut(t);
                })), e.callActions("afterMove", arguments);
            },
            applyTween: function(t, n) {
                var a = this, i = "", o = null, r = t.posIn, s = [], l = new e.StyleData, c = -1;
                for (a.callActions("beforeApplyTween", arguments), l.x = r.x, l.y = r.y, 0 === n ? a.hide() : a.isShown || a.show(), 
                c = 0; i = e.features.TWEENABLE[c]; c++) if (o = t.tweenData[i], "x" === i) {
                    if (!o) continue;
                    l.x = r.x + o * n;
                } else if ("y" === i) {
                    if (!o) continue;
                    l.y = r.y + o * n;
                } else if (o instanceof e.TransformData) {
                    if (!o.value) continue;
                    l[i].value = r[i].value + o.value * n, l[i].unit = o.unit, s.push(i + "(" + l[i].value + o.unit + ")");
                } else {
                    if (!o) continue;
                    l[i] = r[i] + o * n, a.dom.el.style[i] = l[i];
                }
                (l.x || l.y) && s.unshift("translate(" + l.x + "px, " + l.y + "px)"), s.length && (a.dom.el.style[e.features.transformProp] = s.join(" ")), 
                a.callActions("afterApplyTween", arguments);
            },
            applyStylesIn: function(t) {
                var n = this, a = t.posIn, i = 1 !== n.mixer.effectsIn.opacity, o = [];
                n.callActions("beforeApplyStylesIn", arguments), o.push("translate(" + a.x + "px, " + a.y + "px)"), 
                n.mixer.config.animation.animateResizeTargets && ("show" !== t.statusChange && (n.dom.el.style.width = a.width + "px", 
                n.dom.el.style.height = a.height + "px"), n.dom.el.style.marginRight = a.marginRight + "px", 
                n.dom.el.style.marginBottom = a.marginBottom + "px"), i && (n.dom.el.style.opacity = a.opacity), 
                "show" === t.statusChange && (o = o.concat(n.mixer.transformIn)), n.dom.el.style[e.features.transformProp] = o.join(" "), 
                n.callActions("afterApplyStylesIn", arguments);
            },
            applyStylesOut: function(t) {
                var n = this, a = [], i = [], o = n.mixer.config.animation.animateResizeTargets, r = "undefined" != typeof n.mixer.effectsIn.opacity;
                if (n.callActions("beforeApplyStylesOut", arguments), a.push(n.writeTransitionRule(e.features.transformRule, t.staggerIndex)), 
                "none" !== t.statusChange && a.push(n.writeTransitionRule("opacity", t.staggerIndex, t.duration)), 
                o && (a.push(n.writeTransitionRule("width", t.staggerIndex, t.duration)), a.push(n.writeTransitionRule("height", t.staggerIndex, t.duration)), 
                a.push(n.writeTransitionRule("margin", t.staggerIndex, t.duration))), !t.callback) return n.mixer.targetsImmovable++, 
                void (n.mixer.targetsMoved === n.mixer.targetsImmovable && n.mixer.cleanUp(t.operation));
                switch (n.operation = t.operation, n.callback = t.callback, !n.isExcluded && n.mixer.targetsBound++, 
                n.isBound = !0, n.applyTransition(a), o && t.posOut.width > 0 && t.posOut.height > 0 && (n.dom.el.style.width = t.posOut.width + "px", 
                n.dom.el.style.height = t.posOut.height + "px", n.dom.el.style.marginRight = t.posOut.marginRight + "px", 
                n.dom.el.style.marginBottom = t.posOut.marginBottom + "px"), n.mixer.config.animation.nudge || "hide" !== t.statusChange || i.push("translate(" + t.posOut.x + "px, " + t.posOut.y + "px)"), 
                t.statusChange) {
                  case "hide":
                    r && (n.dom.el.style.opacity = n.mixer.effectsOut.opacity), i = i.concat(n.mixer.transformOut);
                    break;

                  case "show":
                    r && (n.dom.el.style.opacity = 1);
                }
                (n.mixer.config.animation.nudge || !n.mixer.config.animation.nudge && "hide" !== t.statusChange) && i.push("translate(" + t.posOut.x + "px, " + t.posOut.y + "px)"), 
                n.dom.el.style[e.features.transformProp] = i.join(" "), n.callActions("afterApplyStylesOut", arguments);
            },
            writeTransitionRule: function(t, e, n) {
                var a = this, i = a.getDelay(e), o = "";
                return o = t + " " + (n > 0 ? n : a.mixer.config.animation.duration) + "ms " + i + "ms " + ("opacity" === t ? "linear" : a.mixer.config.animation.easing), 
                a.callFilters("ruleWriteTransitionRule", o, arguments);
            },
            getDelay: function(t) {
                var e = this, n = -1;
                return "function" == typeof e.mixer.config.animation.staggerSequence && (t = e.mixer.config.animation.staggerSequence.call(e, t, e.state)), 
                n = e.mixer.staggerDuration ? t * e.mixer.staggerDuration : 0, e.callFilters("delayGetDelay", n, arguments);
            },
            applyTransition: function(t) {
                var n = this, a = t.join(", ");
                n.callActions("beforeApplyTransition", arguments), n.dom.el.style[e.features.transitionProp] = a, 
                n.callActions("afterApplyTransition", arguments);
            },
            handleTransitionEnd: function(t) {
                var e = this, n = t.propertyName, a = e.mixer.config.animation.animateResizeTargets;
                e.callActions("beforeHandleTransitionEnd", arguments), e.isBound && t.target.matches(e.mixer.config.selectors.target) && (n.indexOf("transform") > -1 || n.indexOf("opacity") > -1 || a && n.indexOf("height") > -1 || a && n.indexOf("width") > -1 || a && n.indexOf("margin") > -1) && (e.callback.call(e, e.operation), 
                e.isBound = !1, e.callback = null, e.operation = null), e.callActions("afterHandleTransitionEnd", arguments);
            },
            eventBus: function(t) {
                var e = this;
                switch (e.callActions("beforeEventBus", arguments), t.type) {
                  case "webkitTransitionEnd":
                  case "transitionend":
                    e.handleTransitionEnd(t);
                }
                e.callActions("afterEventBus", arguments);
            },
            unbindEvents: function() {
                var t = this;
                t.callActions("beforeUnbindEvents", arguments), n.off(t.dom.el, "webkitTransitionEnd", t.handler), 
                n.off(t.dom.el, "transitionend", t.handler), t.callActions("afterUnbindEvents", arguments);
            },
            bindEvents: function() {
                var t = this, a = "";
                t.callActions("beforeBindEvents", arguments), a = "webkit" === e.features.transitionPrefix ? "webkitTransitionEnd" : "transitionend", 
                t.handler = function(e) {
                    return t.eventBus(e);
                }, n.on(t.dom.el, a, t.handler), t.callActions("afterBindEvents", arguments);
            },
            getPosData: function(n) {
                var a = this, i = {}, o = null, r = new e.StyleData;
                return a.callActions("beforeGetPosData", arguments), r.x = a.dom.el.offsetLeft, 
                r.y = a.dom.el.offsetTop, (a.mixer.config.animation.animateResizeTargets || n) && (o = a.dom.el.getBoundingClientRect(), 
                r.top = o.top, r.right = o.right, r.bottom = o.bottom, r.left = o.left, r.width = o.width, 
                r.height = o.height), a.mixer.config.animation.animateResizeTargets && (i = t.getComputedStyle(a.dom.el), 
                r.marginBottom = parseFloat(i.marginBottom), r.marginRight = parseFloat(i.marginRight)), 
                a.callFilters("posDataGetPosData", r, arguments);
            },
            cleanUp: function() {
                var t = this;
                t.callActions("beforeCleanUp", arguments), t.dom.el.style[e.features.transformProp] = "", 
                t.dom.el.style[e.features.transitionProp] = "", t.dom.el.style.opacity = "", t.mixer.config.animation.animateResizeTargets && (t.dom.el.style.width = "", 
                t.dom.el.style.height = "", t.dom.el.style.marginRight = "", t.dom.el.style.marginBottom = ""), 
                t.callActions("afterCleanUp", arguments);
            }
        }), e.Collection = function(t) {
            var e = null, a = -1;
            for (this.callActions("beforeConstruct"), a = 0; e = t[a]; a++) this[a] = e;
            this.length = t.length, this.callActions("afterConstruct"), n.freeze(this);
        }, e.BaseStatic.call(e.Collection), e.Collection.prototype = Object.create(e.Base.prototype), 
        n.extend(e.Collection.prototype, {
            constructor: e.Collection,
            mixitup: function(t) {
                var a = this, i = null, o = Array.prototype.slice.call(arguments), r = [], s = -1;
                for (this.callActions("beforeMixitup"), o.shift(), s = 0; i = a[s]; s++) r.push(i[t].apply(i, o));
                return a.callFilters("promiseMixitup", n.all(r, e.libraries), arguments);
            }
        }), e.Operation = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.id = "", this.args = [], 
            this.command = null, this.showPosData = [], this.toHidePosData = [], this.startState = null, 
            this.newState = null, this.docState = null, this.willSort = !1, this.willChangeLayout = !1, 
            this.hasEffect = !1, this.hasFailed = !1, this.triggerElement = null, this.show = [], 
            this.hide = [], this.matching = [], this.toShow = [], this.toHide = [], this.toMove = [], 
            this.toRemove = [], this.startOrder = [], this.newOrder = [], this.startSort = null, 
            this.newSort = null, this.startFilter = null, this.newFilter = null, this.startDataset = null, 
            this.newDataset = null, this.viewportDeltaX = 0, this.viewportDeltaY = 0, this.startX = 0, 
            this.startY = 0, this.startHeight = 0, this.startWidth = 0, this.newX = 0, this.newY = 0, 
            this.newHeight = 0, this.newWidth = 0, this.startContainerClassName = "", this.startDisplay = "", 
            this.newContainerClassName = "", this.newDisplay = "", this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.Operation), e.Operation.prototype = Object.create(e.Base.prototype), 
        e.Operation.prototype.constructor = e.Operation, e.State = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.id = "", this.activeFilter = null, 
            this.activeSort = null, this.activeContainerClassName = "", this.container = null, 
            this.targets = [], this.hide = [], this.show = [], this.matching = [], this.totalTargets = -1, 
            this.totalShow = -1, this.totalHide = -1, this.totalMatching = -1, this.hasFailed = !1, 
            this.triggerElement = null, this.activeDataset = null, this.callActions("afterConstruct"), 
            n.seal(this);
        }, e.BaseStatic.call(e.State), e.State.prototype = Object.create(e.Base.prototype), 
        e.State.prototype.constructor = e.State, e.UserInstruction = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.command = {}, this.animate = !1, 
            this.callback = null, this.callActions("afterConstruct"), n.seal(this);
        }, e.BaseStatic.call(e.UserInstruction), e.UserInstruction.prototype = Object.create(e.Base.prototype), 
        e.UserInstruction.prototype.constructor = e.UserInstruction, e.Messages = function() {
            e.Base.call(this), this.callActions("beforeConstruct"), this.ERROR_FACTORY_INVALID_CONTAINER = "[MixItUp] An invalid selector or element reference was passed to the mixitup factory function", 
            this.ERROR_FACTORY_CONTAINER_NOT_FOUND = "[MixItUp] The provided selector yielded no container element", 
            this.ERROR_CONFIG_INVALID_ANIMATION_EFFECTS = "[MixItUp] Invalid value for `animation.effects`", 
            this.ERROR_CONFIG_INVALID_CONTROLS_SCOPE = "[MixItUp] Invalid value for `controls.scope`", 
            this.ERROR_CONFIG_INVALID_PROPERTY = '[MixitUp] Invalid configuration object property "${erroneous}"${suggestion}', 
            this.ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION = '. Did you mean "${probableMatch}"?', 
            this.ERROR_CONFIG_DATA_UID_KEY_NOT_SET = "[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`", 
            this.ERROR_DATASET_INVALID_UID_KEY = '[MixItUp] The specified UID key "${uidKey}" is not present on one or more dataset items', 
            this.ERROR_DATASET_DUPLICATE_UID = '[MixItUp] The UID "${uid}" was found on two or more dataset items. UIDs must be unique.', 
            this.ERROR_INSERT_INVALID_ARGUMENTS = "[MixItUp] Please provider either an index or a sibling and position to insert, not both", 
            this.ERROR_INSERT_PREEXISTING_ELEMENT = "[MixItUp] An element to be inserted already exists in the container", 
            this.ERROR_FILTER_INVALID_ARGUMENTS = "[MixItUp] Please provide either a selector or collection `.filter()`, not both", 
            this.ERROR_DATASET_NOT_SET = "[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`", 
            this.ERROR_DATASET_PRERENDERED_MISMATCH = "[MixItUp] `load.dataset` does not match pre-rendered targets", 
            this.ERROR_DATASET_RENDERER_NOT_SET = "[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`", 
            this.ERROR_SORT_NON_EXISTENT_ELEMENT = "[MixItUp] An element to be sorted does not already exist in the container", 
            this.WARNING_FACTORY_PREEXISTING_INSTANCE = "[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored. If you wish to perform additional methods on this instance, please create a reference.", 
            this.WARNING_INSERT_NO_ELEMENTS = "[MixItUp] WARNING: No valid elements were passed to `.insert()`", 
            this.WARNING_REMOVE_NO_ELEMENTS = "[MixItUp] WARNING: No valid elements were passed to `.remove()`", 
            this.WARNING_MULTIMIX_INSTANCE_QUEUE_FULL = "[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the queue is full or queuing is disabled.", 
            this.WARNING_GET_OPERATION_INSTANCE_BUSY = "[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy.", 
            this.WARNING_NO_PROMISE_IMPLEMENTATION = "[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install an ES6 Promise polyfill.", 
            this.WARNING_INCONSISTENT_SORTING_ATTRIBUTES = '[MixItUp] WARNING: The requested sorting data attribute "${attribute}" was not present on one or more target elements which may product unexpected sort output', 
            this.callActions("afterConstruct"), this.compileTemplates(), n.seal(this);
        }, e.BaseStatic.call(e.Messages), e.Messages.prototype = Object.create(e.Base.prototype), 
        e.Messages.prototype.constructor = e.Messages, e.Messages.prototype.compileTemplates = function() {
            var t = "", e = "";
            for (t in this) "string" == typeof (e = this[t]) && (this[n.camelCase(t)] = n.template(e));
        }, e.messages = new e.Messages, e.Facade = function(t) {
            e.Base.call(this), this.callActions("beforeConstruct", arguments), this.configure = t.configure.bind(t), 
            this.show = t.show.bind(t), this.hide = t.hide.bind(t), this.filter = t.filter.bind(t), 
            this.toggleOn = t.toggleOn.bind(t), this.toggleOff = t.toggleOff.bind(t), this.sort = t.sort.bind(t), 
            this.changeLayout = t.changeLayout.bind(t), this.multimix = t.multimix.bind(t), 
            this.dataset = t.dataset.bind(t), this.tween = t.tween.bind(t), this.insert = t.insert.bind(t), 
            this.insertBefore = t.insertBefore.bind(t), this.insertAfter = t.insertAfter.bind(t), 
            this.prepend = t.prepend.bind(t), this.append = t.append.bind(t), this.remove = t.remove.bind(t), 
            this.destroy = t.destroy.bind(t), this.forceRefresh = t.forceRefresh.bind(t), this.forceRender = t.forceRender.bind(t), 
            this.isMixing = t.isMixing.bind(t), this.getOperation = t.getOperation.bind(t), 
            this.getConfig = t.getConfig.bind(t), this.getState = t.getState.bind(t), this.callActions("afterConstruct", arguments), 
            n.freeze(this), n.seal(this);
        }, e.BaseStatic.call(e.Facade), e.Facade.prototype = Object.create(e.Base.prototype), 
        e.Facade.prototype.constructor = e.Facade, "object" == typeof exports && "object" == typeof module ? module.exports = e : "function" == typeof define && define.amd ? define((function() {
            return e;
        })) : "undefined" != typeof t.mixitup && "function" == typeof t.mixitup || (t.mixitup = e), 
        e.BaseStatic.call(e.constructor), e.NAME = "mixitup", e.CORE_VERSION = "3.3.1";
    }(window);
    const appHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", appHeight);
    appHeight();
    window.onscroll = function() {
        let header = document.querySelector(".header");
        let height = window.pageYOffset;
        if (height > 1) header.classList.add("active"); else header.classList.remove("active");
    };
    document.addEventListener("click", (function(e) {
        const targetItem = e.target;
        if (targetItem.closest("[data-ripple]")) {
            const button = e.target.closest("[data-ripple]");
            const ripple = document.createElement("span");
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${e.pageX - (button.getBoundingClientRect().left + scrollX) - radius}px`;
            ripple.style.top = `${e.pageY - (button.getBoundingClientRect().top + scrollY) - radius}px`;
            ripple.classList.add("ripple");
            "once" === button.dataset.ripple && button.querySelector(".ripple") ? button.querySelector(".ripple").remove : null;
            button.appendChild(ripple);
            const timeOut = getAnimationDuration(ripple);
            setTimeout((() => {
                ripple ? ripple.remove() : null;
            }), timeOut);
            function getAnimationDuration() {
                const aDuration = window.getComputedStyle(ripple).animationDuration;
                return aDuration.includes("ms") ? aDuration.replace("ms", ``) : 1e3 * aDuration.replace("s", "");
            }
        }
    }));
    mixitup(".collections__body");
    let button1 = document.querySelector(".collections__button_7-days");
    let button2 = document.querySelector(".collections__button_30-days");
    document.addEventListener("click", (function(e) {
        if (e.target.closest(".collections__button_7-days")) {
            button1.classList.add("_active");
            button2.classList.remove("_active");
        }
        if (e.target.closest(".collections__button_30-days")) {
            button2.classList.add("_active");
            button1.classList.remove("_active");
        }
    }));
    window["FLS"] = true;
    isWebp();
    addTouchClass();
    addLoadedClass();
    menuInit();
    fullVHfix();
    spollers();
    digitsCounter();
})();