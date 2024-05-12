!function(){"use strict";function t(){return t=Object.assign?Object.assign.bind():function(t){for(var i=1;i<arguments.length;i++){var e=arguments[i];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},t.apply(this,arguments)}function i(t,i,e){return Math.max(t,Math.min(i,e))}class e{advance(t){var e;if(!this.isRunning)return;let s=!1;if(this.lerp)this.value=(o=this.value,n=this.to,(1-(r=1-Math.exp(-60*this.lerp*t)))*o+r*n),Math.round(this.value)===this.to&&(this.value=this.to,s=!0);else{this.currentTime+=t;const e=i(0,this.currentTime/this.duration,1);s=e>=1;const o=s?1:this.easing(e);this.value=this.from+(this.to-this.from)*o}var o,n,r;null==(e=this.onUpdate)||e.call(this,this.value,s),s&&this.stop()}stop(){this.isRunning=!1}fromTo(t,i,{lerp:e=.1,duration:s=1,easing:o=(t=>t),onStart:n,onUpdate:r}){this.from=this.value=t,this.to=i,this.lerp=e,this.duration=s,this.easing=o,this.currentTime=0,this.isRunning=!0,null==n||n(),this.onUpdate=r}}class s{constructor({wrapper:t,content:i,autoResize:e=!0}={}){if(this.resize=()=>{this.onWrapperResize(),this.onContentResize()},this.onWrapperResize=()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)},this.onContentResize=()=>{this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth},this.wrapper=t,this.content=i,e){const t=function(t,i){let e;return function(){let i=arguments,s=this;clearTimeout(e),e=setTimeout((function(){t.apply(s,i)}),250)}}(this.resize);this.wrapper!==window&&(this.wrapperResizeObserver=new ResizeObserver(t),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(t),this.contentResizeObserver.observe(this.content)}this.resize()}destroy(){var t,i;null==(t=this.wrapperResizeObserver)||t.disconnect(),null==(i=this.contentResizeObserver)||i.disconnect()}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class o{constructor(){this.events={}}emit(t,...i){let e=this.events[t]||[];for(let t=0,s=e.length;t<s;t++)e[t](...i)}on(t,i){var e;return(null==(e=this.events[t])?void 0:e.push(i))||(this.events[t]=[i]),()=>{var e;this.events[t]=null==(e=this.events[t])?void 0:e.filter((t=>i!==t))}}off(t,i){var e;this.events[t]=null==(e=this.events[t])?void 0:e.filter((t=>i!==t))}destroy(){this.events={}}}class n{constructor(t,{wheelMultiplier:e=1,touchMultiplier:s=2,normalizeWheel:n=!1}){this.onTouchStart=t=>{const{clientX:i,clientY:e}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=i,this.touchStart.y=e,this.lastDelta={x:0,y:0}},this.onTouchMove=t=>{const{clientX:i,clientY:e}=t.targetTouches?t.targetTouches[0]:t,s=-(i-this.touchStart.x)*this.touchMultiplier,o=-(e-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=i,this.touchStart.y=e,this.lastDelta={x:s,y:o},this.emitter.emit("scroll",{deltaX:s,deltaY:o,event:t})},this.onTouchEnd=t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})},this.onWheel=t=>{let{deltaX:e,deltaY:s}=t;this.normalizeWheel&&(e=i(-100,e,100),s=i(-100,s,100)),e*=this.wheelMultiplier,s*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:s,event:t})},this.element=t,this.wheelMultiplier=e,this.touchMultiplier=s,this.normalizeWheel=n,this.touchStart={x:null,y:null},this.emitter=new o,this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(t,i){return this.emitter.on(t,i)}destroy(){this.emitter.destroy(),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}}class r{constructor({wrapper:i=window,content:r=document.documentElement,wheelEventsTarget:l=i,eventsTarget:h=l,smoothWheel:a=!0,smoothTouch:c=!1,syncTouch:u=!1,syncTouchLerp:p=.1,__iosNoInertiaSyncTouchLerp:m=.4,touchInertiaMultiplier:d=35,duration:v,easing:g=(t=>Math.min(1,1.001-Math.pow(2,-10*t))),lerp:S=!v&&.1,infinite:f=!1,orientation:w="vertical",gestureOrientation:y="vertical",touchMultiplier:T=1,wheelMultiplier:z=1,normalizeWheel:M=!1,autoResize:b=!0}={}){this.onVirtualScroll=({deltaX:i,deltaY:e,event:s})=>{if(s.ctrlKey)return;const o=s.type.includes("touch"),n=s.type.includes("wheel");if("both"===this.options.gestureOrientation&&0===i&&0===e||"vertical"===this.options.gestureOrientation&&0===e||"horizontal"===this.options.gestureOrientation&&0===i||o&&"vertical"===this.options.gestureOrientation&&0===this.scroll&&!this.options.infinite&&e<=0)return;let r=s.composedPath();if(r=r.slice(0,r.indexOf(this.rootElement)),r.find((t=>{var i;return(null==t.hasAttribute?void 0:t.hasAttribute("data-lenis-prevent"))||o&&(null==t.hasAttribute?void 0:t.hasAttribute("data-lenis-prevent-touch"))||n&&(null==t.hasAttribute?void 0:t.hasAttribute("data-lenis-prevent-wheel"))||(null==(i=t.classList)?void 0:i.contains("lenis"))})))return;if(this.isStopped||this.isLocked)return void s.preventDefault();if(this.isSmooth=(this.options.smoothTouch||this.options.syncTouch)&&o||this.options.smoothWheel&&n,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();s.preventDefault();let l=e;"both"===this.options.gestureOrientation?l=Math.abs(e)>Math.abs(i)?e:i:"horizontal"===this.options.gestureOrientation&&(l=i);const h=o&&this.options.syncTouch,a=o&&"touchend"===s.type&&Math.abs(l)>1;a&&(l=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+l,t({programmatic:!1},h&&{lerp:a?this.syncTouchLerp:this.options.__iosNoInertiaSyncTouchLerp}))},this.onScroll=()=>{if(!this.isScrolling){const t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-t),this.emit()}},window.lenisVersion="1.0.26",i!==document.documentElement&&i!==document.body||(i=window),this.options={wrapper:i,content:r,wheelEventsTarget:l,eventsTarget:h,smoothWheel:a,smoothTouch:c,syncTouch:u,syncTouchLerp:p,__iosNoInertiaSyncTouchLerp:m,touchInertiaMultiplier:d,duration:v,easing:g,lerp:S,infinite:f,gestureOrientation:y,orientation:w,touchMultiplier:T,wheelMultiplier:z,normalizeWheel:M,autoResize:b},this.animate=new e,this.emitter=new o,this.dimensions=new s({wrapper:i,content:r,autoResize:b}),this.toggleClass("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=u||a||c,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onScroll,{passive:!1}),this.virtualScroll=new n(h,{touchMultiplier:T,wheelMultiplier:z,normalizeWheel:M}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onScroll,{passive:!1}),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClass("lenis",!1),this.toggleClass("lenis-smooth",!1),this.toggleClass("lenis-scrolling",!1),this.toggleClass("lenis-stopped",!1)}on(t,i){return this.emitter.on(t,i)}off(t,i){return this.emitter.off(t,i)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.velocity=0,this.animate.stop()}start(){this.isStopped=!1,this.reset()}stop(){this.isStopped=!0,this.animate.stop(),this.reset()}raf(t){const i=t-(this.time||t);this.time=t,this.animate.advance(.001*i)}scrollTo(t,{offset:e=0,immediate:s=!1,lock:o=!1,duration:n=this.options.duration,easing:r=this.options.easing,lerp:l=!n&&this.options.lerp,onComplete:h=null,force:a=!1,programmatic:c=!0}={}){if(!this.isStopped&&!this.isLocked||a){if(["top","left","start"].includes(t))t=0;else if(["bottom","right","end"].includes(t))t=this.limit;else{var u;let i;if("string"==typeof t?i=document.querySelector(t):null!=(u=t)&&u.nodeType&&(i=t),i){if(this.options.wrapper!==window){const t=this.options.wrapper.getBoundingClientRect();e-=this.isHorizontal?t.left:t.top}const s=i.getBoundingClientRect();t=(this.isHorizontal?s.left:s.top)+this.animatedScroll}}if("number"==typeof t){if(t+=e,t=Math.round(t),this.options.infinite?c&&(this.targetScroll=this.animatedScroll=this.scroll):t=i(0,t,this.limit),s)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),void(null==h||h(this));if(!c){if(t===this.targetScroll)return;this.targetScroll=t}this.animate.fromTo(this.animatedScroll,t,{duration:n,easing:r,lerp:l,onStart:()=>{o&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(t,i)=>{this.isScrolling=!0,this.velocity=t-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=t,this.setScroll(this.scroll),c&&(this.targetScroll=t),i||this.emit(),i&&requestAnimationFrame((()=>{this.reset(),this.emit(),null==h||h(this)}))}})}}}get rootElement(){return this.options.wrapper===window?this.options.content:this.options.wrapper}get limit(){return this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return"horizontal"===this.options.orientation}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(this.animatedScroll%(t=this.limit)+t)%t:this.animatedScroll;var t}get progress(){return 0===this.limit?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(t){this.__isSmooth!==t&&(this.__isSmooth=t,this.toggleClass("lenis-smooth",t))}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.toggleClass("lenis-scrolling",t))}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.__isStopped=t,this.toggleClass("lenis-stopped",t))}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isScrolling&&(t+=" lenis-scrolling"),this.isSmooth&&(t+=" lenis-smooth"),t}toggleClass(t,i){this.rootElement.classList.toggle(t,i),this.emitter.emit("className change",this)}}{const l=new r;function h(t){l.raf(t),requestAnimationFrame(h)}requestAnimationFrame(h)}}();