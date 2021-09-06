"use strict";function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}var APP={cache:{},initBefore:function(){svg4everybody(),APP.polyfills(),document.documentElement.className=document.documentElement.className.replace("no-js","js")},init:function(){APP.detectIE(),APP.lazyload(),APP.buttons(),APP.modalCloseBtn(),APP.closeOnFocusLost(),APP.initCoordsForm(),APP.setMapMarkerFromUrl(),APP.initMapOptions(),APP.initFixedCoordsForm(),APP.tooltipsInit(),APP.mouseOverMap(),APP.ctrlVInit(),APP.rssParser(),APP.tableSort(),APP.gameModSwitcher(),APP.tableVerticalHighlight(),APP.modalGallery()},getClipboardText:function(e){navigator.clipboard.readText().then(function(t){e(t)}).catch(function(t){console.warn("Failed to read clipboard contents: ",t)})},parseGameCoords:function(t){return t.replace(/(?:\r\n|\r|\n)/g," ").match(/Lat\: (-?\d+).+Long\: (-?\d+)/i)},buttons:function(){Array.prototype.forEach.call(document.querySelectorAll(".menu-trigger"),function(t){t.addEventListener("click",function(){document.body.classList.toggle("nav-showed")})})},rssParser:function(){var t=function(){(new RSSParser).parseURL("https://cors.bridged.cc/https://store.steampowered.com/feeds/news/app/376210?url=https%3A%2F%2Fstore.steampowered.com%2Ffeeds%2Fnews%2Fapp%2F376210",function(t,e){t?document.querySelector(".news-feed__loader").innerHTML='\n\t\t\t\t\t\t<div>Sorry, RSS does not want to work 😥</div>\n\t\t\t\t\t\t<div class="mb-3">'+t+'</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<a class="btn btn--blue" href="https://steamcommunity.com/app/376210/allnews/" target="_blank">Official news source</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t':(APP.cache.feedItems=e.items,e.items.forEach(function(t,e){e<4&&r(t)}),a())})},r=function(t){var e={creator:t.creator||"",title:t.title||"",link:t.link||"",pubDate:t.pubDate||"",author:t.author||"",content:t.content||"",contentSnippet:t.contentSnippet||"",guid:t.guid||"",isoDate:t.isoDate||""},n=i(t.isoDate),o=document.getElementById("feed-item").innerHTML,r=_.template(o)(e),a=document.getElementById("feed-list"),l=APP.createElementFromHTML(r);l.querySelector("[data-content]").innerHTML=t.content,l.querySelector("[data-date]").innerHTML=n,a.appendChild(l),c(l),setTimeout(function(){l.classList.add("animated")},10)},i=function(t){var e=new Date(t),n=e.getDate(),o=e.getMonth()+1;return(n<10?"0"+n:n)+"."+(o<10?"0"+o:o)+"."+e.getFullYear()},a=function(){APP.tooltipsInit(),e()},e=function(){document.querySelector(".news-feed").classList.add("news-feed--loaded")},c=function(t){t.querySelector(".item-feed__btn-more").addEventListener("click",function(t){var e=this.closest(".item-feed"),n="item-feed--full-view";e.hasClass(n)?(e.classList.remove(n),(new SmoothScroll).animateScroll(e,0,{speed:300})):e.classList.add(n)})},n=function(){var o=document.querySelector(".news-feed__btn-more");o.addEventListener("click",function(){var t=document.querySelectorAll(".news-feed__item").length,e=APP.cache.feedItems,n=_.drop(e,t);n.length&&(n.forEach(function(t,e){e<3&&r(t)}),a()),n.length<3&&(o.style.display="none")})};document.getElementById("feed-list")&&(t(),n())},createElementFromHTML:function(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.firstChild},ctrlVInit:function(){var t=document.querySelector(".js-ctrl-v");if(t){var n=document.getElementById("lat"),o=document.getElementById("lng"),r=function(){APP.customAlert('\n\t\t\t\t<form id="pasted-coords">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col form-group">\n\t\t\t\t\t\t\t<input type="text" class="form-control form-control--light-bg" name="in-game-coords" placeholder="Paste in-game coords" required="">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-auto form-group">\n\t\t\t\t\t\t\t<button class="btn btn--narrow btn--blue" type="submit">Set</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t\t<div class="content-style text-center">\n\t\t\t\t\t<p>Please grant access clipboard read permissions for faster setting points or just use the form.</p>\n\t\t\t\t</div>\n\t\t\t',function(t){var n=t.modal.querySelector("input[name=in-game-coords]");n.focus(),document.getElementById("pasted-coords").addEventListener("submit",function(t){t.preventDefault();var e=n.value;a(e)})})},a=function(t){var e=APP.parseGameCoords(t);e?(APP.cache.tingleModal&&APP.cache.tingleModal.close(),n.value=e[1],o.value=e[2],o.closest("form").querySelector("button[type=submit]").click()):APP.customAlert('\n\t\t\t\t\t<div class="content-style text-center">\n\t\t\t\t\t\t<div class="h1 mb-4">Invalid clypboard text</div>\n\t\t\t\t\t\t<p>Youre text is: <b>"'+t+'"</b></p>\n\t\t\t\t\t\t<p>Please copy in-game coordinates or use the form</p>\n\t\t\t\t\t</div>\n\t\t\t\t')};t.addEventListener("click",function(t){t.preventDefault(),function(e){navigator.permissions.query({name:"clipboard-read"}).then(function(t){"granted"==t.state||"prompt"==t.state?e():r()},function(t){r()})}(function(){APP.getClipboardText(a)})})}},customAlert:function(t,e,n){function o(t,e){t.setContent('<div class ="modal modal--alert">\n\t\t\t\t<span class="js-modal-close modal__close">×</span>\n\t\t\t\t'+e+"\n\t\t\t</div>")}var r;APP.cache.tingleModal?o(APP.cache.tingleModal,t):(APP.cache.tingleModal=r=new tingle.modal({closeMethods:["overlay","button","escape"],closeLabel:"Close",cssClass:["tingle-modal--alert"],beforeOpen:function(){document.body.style.marginRight=APP.getScrollbarSize()+"px"},onOpen:function(){document.activeElement.blur(),APP.modalCloseListener(this),e&&e(this)},beforeClose:function(){return document.body.removeAttribute("style"),!0},onClose:function(){r.destroy(),delete APP.cache.tingleModal,n&&n(this)}}),o(APP.cache.tingleModal,t),APP.cache.tingleModal.open())},closeOnFocusLost:function(){document.addEventListener("click",function(t){t.target.closest(".header")||document.body.classList.remove("nav-showed")})},tooltipsInit:function(){tippy("[data-tippy-content]",{animation:"fade",theme:"light-border",arrow:!0,arrowType:"round"});Array.prototype.forEach.call(document.querySelectorAll(".js-tooltip"),function(t){var e=t.querySelector(".js-tooltip-content");tippy(t,{content:e,theme:"light-border",interactive:!0,arrow:!0,trigger:"click",arrowType:"round"}),e.classList.remove("d-none")})},initMapOptions:function(){var t=document.querySelector(".map-settings form"),n=document.querySelector(".map"),o="map--hide-markers",r="map--invisible-markers";t&&Array.prototype.forEach.call(t.querySelectorAll("input"),function(e){e.addEventListener("change",function(t){switch(e.getAttribute("name")){case"hidden-markers":!function(t){t.checked?n.classList.add(o):n.classList.remove(o)}(e);break;case"invisible-markers":!function(t){t.checked?n.classList.remove(r):n.classList.add(r)}(e);break;default:console.log("options switched")}})})},getMapSize:function(t){switch(0<arguments.length&&void 0!==t?t:"thenyaw"){case"spiro":return{x:1000,y:-1000};case"thenyaw":return{x:745,y:675};case"v3":return{x:1600,y:1600};default:return{x:1e3,y:1e3}}},getMapCenter:function(t){switch(0<arguments.length&&void 0!==t?t:"thenyaw"){case"spiro":return{x:99.5,y:1};case"thenyaw":return{x:52.3,y:50};case"v3":return{x:52.8,y:45.3};default:return{x:50,y:50}}},pos2loc:function(t,e,n){var o=0<arguments.length&&void 0!==t?t:.01,r=1<arguments.length&&void 0!==e?e:.01,a=2<arguments.length&&void 0!==n?n:"thenyaw",l=this.getMapSize,i=this.getMapCenter,c=l(a),s=i(a);return{left:parseInt((o-s.x)*(c.x/100)),top:parseInt((r-s.y)*(c.y/100))}},loc2pos:function(t,e,n){var o=0<arguments.length&&void 0!==t?t:.01,r=1<arguments.length&&void 0!==e?e:.01,a=2<arguments.length&&void 0!==n?n:"thenyaw",l=this.getMapSize,i=this.getMapCenter,c=l(a),s=i(a);return{left:s.x+o*(100/c.x),top:s.y+r*(100/c.y)}},initCoordsForm:function(){var t=".js-coords-form",e="#lat",n="#lng",o="[data-map-name]",r=".js-player-marker",a=".js-coords-submit",l=".js-coords-share",i="d-none",c=this,s=c.copyCurrentUrl,d=document.querySelector(t),u=document.querySelector(e),m=document.querySelector(n),f=document.querySelector(r),p=document.querySelector(l),v=void 0;if(d&&u&&m){var y=document.querySelector(o).dataset.mapName,g=function(t){t.preventDefault();var e=+u.value,n=+m.value,o=c.loc2pos(e,n,y);if(100<o.left||100<o.top||o.top<0||o.left<0){c.customAlert('\n\t\t\t\t\t<div class="h2 mb-0 text-center">\n\t\t\t\t\t\t<p>Unfortunately, it is not possible to set a point as it is outside the map.</p>\n\t\t\t\t\t</div>\n\t\t\t\t'),f.classList.add(i),console.warn(o)}else{history.replaceState("","","?lat="+e+"&lng="+n);var r=new SmoothScroll;f.classList.remove(i),f.style.left=o.left+"%",f.style.top=o.top+"%",r.animateScroll(f,0,{speed:500,offset:function(){return window.innerHeight/2}}),P(!0)}},h=function(){P(!1)},b=function(){f.classList.add(i),history.replaceState("","",location.pathname),P(!1)},P=function(t){var e=0<arguments.length&&void 0!==t&&t,n=document.querySelector(a);e?(n.classList.add(i),p.classList.remove(i)):(n.classList.remove(i),p.classList.add(i))},A=function(){s()};d.addEventListener("submit",g),d.addEventListener("reset",b),u.addEventListener("change",h),m.addEventListener("change",h),p.addEventListener("click",A),tippy(p,{content:"🛎️ Point URL copied to clipboard.",theme:"light-border",placement:"bottom",trigger:"click",onShown:function(t){clearTimeout(v),v=setTimeout(function(){t.hide()},2e3)}})}},copyCurrentUrl:function(){var t=document.createElement("input"),e=window.location.href;document.body.appendChild(t),t.value=e,t.select(),document.execCommand("copy"),document.body.removeChild(t)},setMapMarkerFromUrl:function(){var t=new URLSearchParams(location.search),e=t.get("lat"),n=t.get("lng"),o=document.getElementById("lat"),r=document.getElementById("lng");e&&n&&r&&o&&(o.value=e,r.value=n,r.closest("form").querySelector("button[type=submit]").click())},initFixedCoordsForm:function(){var t=document.querySelector(".js-coords-form");if(t){var e=window.pageYOffset+t.getBoundingClientRect().top;new Headroom(t,{offset:e}).init()}},mouseOverMap:function(){var t=document.querySelector(".map__layout");if(t){var o=t.getAttribute("data-map-name"),r=document.getElementById("position");t.onmousemove=function(t){var e=function(t){var e=t.target.getBoundingClientRect(),n=t.clientX-e.left,o=t.clientY-e.top,r=t.target.offsetWidth,a=t.target.offsetHeight,l=parseInt(n/r*100*10)/10,i=parseInt(o/a*100*10)/10;return{x:l,y:i}}(t),n=APP.pos2loc(e.x,e.y,o);r.innerHTML="lat: "+n.left+", long: "+n.top,r.style.display="block",r.style.top=e.y+"%",r.style.left=e.x+"%"},t.onmouseleave=function(){r.style.top=0,r.style.left=0,r.style.display="none"}}},modalCloseBtn:function(){APP.documentOn("click",".js-modal-close",function(t){t.preventDefault(),APP.cache.tingleModal&&APP.cache.tingleModal.close()})},modalCloseListener:function(e){e.modalBoxContent.addEventListener("click",function(t){t.target==e.modalBoxContent&&e.close()})},modalGallery:function(){function o(t){function e(t){var e=t.el.querySelector(".swiper-slide-active img").getAttribute("data-title");t.el.closest(".modal-gallery").querySelector(".modal-gallery__title").innerHTML=e}var n=t.querySelectorAll(".swiper-slide").length,o=new Swiper(t,{loop:1<n,allowTouchMove:!1,lazy:{loadPrevNext:!0,loadOnTransitionStart:!0},effect:"fade",fadeEffect:{crossFade:!0},speed:200,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},keyboard:{enabled:!0},pagination:{el:".modal-gallery__paging",type:"fraction"},init:!1});return o.on("init",function(){var t=this;setTimeout(function(){e(t)},10)}),o.on("slideChange",function(){var t=this;setTimeout(function(){e(t)},10)}),o.on("lazyImageReady",function(t,e){var n=this.$el[0].querySelectorAll("[data-object-fit]");APP.objectFitFallback(n)}),o.init(),Array.prototype.forEach.call(t.querySelectorAll("img"),function(t){t.addEventListener("click",function(t){o.slideNext()})}),o}var n,r=function(t){t.closest(".tippy-popper")._tippy.hide()},a=function(t){var e=t.closest(".js-gallery"),n=[];return Array.prototype.forEach.call(e.querySelectorAll(".js-gallery-item"),function(t,e){t.closest(".swiper-slide-duplicate")||n.push(t)}),n},l=function(t){for(var e=[],n=0;n<t.length;n++){var o=t[n],r=o.getAttribute("data-title")?o.getAttribute("data-title"):"";e.push({src:o.getAttribute("href"),title:r})}return e},i=function(t,e){var n=new tingle.modal({closeMethods:["overlay","button","escape"],closeLabel:"Close",cssClass:["tingle-modal--gallery"],beforeOpen:function(){document.body.style.marginRight=APP.getScrollbarSize()+"px"},onOpen:function(){document.activeElement.blur(),APP.modalCloseListener(this);var t=this.modal.querySelector(".swiper-container");o(t).slideTo(e)},beforeClose:function(){return document.body.removeAttribute("style"),!0},onClose:function(){n.destroy(),delete APP.cache.tingleModal}});(APP.cache.tingleModal=n).setContent(t),n.open()},d=function(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.firstChild},u="outerHTML"in(n=document.createElement("div"))?function(t){return t.outerHTML}:function(t){var e=n.cloneNode();return e.appendChild(t.cloneNode(!0)),e.innerHTML};APP.documentOn("click",".js-gallery-item",function(t){t.preventDefault(),r(this);var e=a(this),n=e.indexOf(this)+1,o=function(t,e){var n=d(t),o=n.querySelector("[data-for]"),r=o.parentNode;o.removeAttribute("data-for"),r.removeChild(o);for(var a=0;a<e.length;a++){var l=e[a],i=u(o),c=d(i),s=c.querySelector("img");s.setAttribute("data-src",l.src),s.setAttribute("data-title",l.title),r.appendChild(c)}return n}('<div class="modal-gallery">\n\t\t\t<span class="js-modal-close modal__close modal__close--pos-gallery">×</span>\n\t\t\t<div class="swiper-container modal-gallery__slider">\n\t\t\t\t<div class="swiper-wrapper">\n\t\t\t\t\t<div class="modal-gallery__slide swiper-slide" data-for>\n\t\t\t\t\t\t<div class="responsive-img modal-gallery__img-wrap">\n\t\t\t\t\t\t\t<img class="swiper-lazy" alt="" data-object-fit="scale-down">\n\t\t\t\t\t\t\t<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="swiper-button-prev"></div>\n\t\t\t\t<div class="swiper-button-next"></div>\n\t\t\t</div>\n\t\t\t<div class="modal-gallery__footer">\n\t\t\t\t<div class="wrap modal-gallery__footer-inner">\n\t\t\t\t\t<div class="modal-gallery__title"></div>\n\t\t\t\t\t<div class="modal-gallery__paging"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>',l(e));i(o,n)})},gameModSwitcher:function(){function e(t){for(var e=t.target,n=e.getAttribute("name"),o=e.checked,r=document.querySelectorAll(i),a=0;a<r.length;a++){var l=r[a];l.dataset.gameMod===n&&(o?l.classList.remove(c):l.classList.add(c))}}var t=".js-game-mod-switcher",i=".stats-table tr[data-game-mod]",c="d-none";[].concat(_toConsumableArray(document.querySelectorAll(t))).forEach(function(t){t.addEventListener("change",e)})},tableSort:function(){for(var t=[].concat(_toConsumableArray(document.querySelectorAll(".js-table-sort"))),e=0;e<t.length;e++){var n=t[e];new Tablesort(n,{})}},tableVerticalHighlight:function(){for(var l="is-highlighted",t=function(){for(var t=this.closest("table"),e=[].concat(_toConsumableArray(t.querySelectorAll("tr"))),n=[].concat(_toConsumableArray(this.parentElement.querySelectorAll("td"))).indexOf(this),o=0;o<e.length;o++){var r=e[o],a=[].concat(_toConsumableArray(r.querySelectorAll("td")),_toConsumableArray(r.querySelectorAll("th")));a.length&&a[n].classList.add(l)}},e=function(){for(var t=this.closest("table"),e=[].concat(_toConsumableArray(t.querySelectorAll("td")),_toConsumableArray(t.querySelectorAll("th"))),n=0;n<e.length;n++){e[n].classList.remove(l)}},n=[].concat(_toConsumableArray(document.querySelectorAll(".js-vertical-highlight"))),o=0;o<n.length;o++){var r=n[o],a=[].concat(_toConsumableArray(r.querySelectorAll("td")));for(o=0;o<a.length;o++){var i=a[o];i.onmouseover=t,i.onmouseout=e}}},lazyload:function(){void 0===APP.myLazyLoad?APP.myLazyLoad=new LazyLoad({elements_selector:".lazyload",callback_error:function(t){t.parentElement.classList.add("lazyload-error")}}):APP.myLazyLoad.update(),APP.objectFitFallback(document.querySelectorAll("[data-object-fit]"))},objectFitFallback:function(t){if("objectFit"in document.documentElement.style==!1){console.log("objectFit Fallback");for(var e=0;e<t.length;e++){var n=t[e],o=n.getAttribute("src"),r=n.getAttribute("data-object-fit"),a=void 0;a="contain"===r?"contain":"cover"===r?"cover":"auto";var l=n.parentElement;o&&(l.style.backgroundImage="url("+o+")",l.style.backgroundSize=a,l.classList.add("fit-img"))}}},polyfills:function(){var t;(t=Element.prototype).matches=t.matches||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector||t.webkitMatchesSelector,t.closest=t.closest||function(t){return this?this.matches(t)?this:this.parentElement?this.parentElement.closest(t):null:null},Element.prototype.hasClass=function(t){return this.className&&new RegExp("(^|\\s)"+t+"(\\s|$)").test(this.className)}},documentOn:function(t,n,o){document.addEventListener(t,function(t){var e=function(t,e){var n=e.replace(".",""),o=t.closest(e);return t.hasClass(n)?t:o||!1}(t.target,n);e&&o.bind(e)(t,e)})},detectIE:function(){!function(){var t=window.navigator.userAgent,e=t.indexOf("MSIE ");if(0<e){parseInt(t.substring(e+5,t.indexOf(".",e)),10);document.querySelector("body").className+=" IE"}if(0<t.indexOf("Trident/")){var n=t.indexOf("rv:");parseInt(t.substring(n+3,t.indexOf(".",n)),10);document.querySelector("body").className+=" IE"}var o=t.indexOf("Edge/");if(0<o){parseInt(t.substring(o+5,t.indexOf(".",o)),10);document.querySelector("body").className+=" IE"}}()},getScrollbarSize:function(){var t=void 0;if(void 0===t){var e=document.createElement("div");e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),t=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return t},throttle:function(t,e){var n=!1;return function(){n||(t.call(),n=!0,setTimeout(function(){n=!1},e))}},getScreenSize:function(){var t=window.getComputedStyle(document.querySelector("body"),":after").getPropertyValue("content");return t=parseInt(t.match(/\d+/))}};APP.initBefore(),document.addEventListener("DOMContentLoaded",function(){APP.init()});
//# sourceMappingURL=main.js.map
