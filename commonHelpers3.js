import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as n}from"./assets/vendor-77e16229.js";const m=document.querySelector(".form");m.addEventListener("submit",i);function i(o){o.preventDefault();let e=+m.elements.delay.value;const t=+m.elements.step.value,s=+m.elements.amount.value;let r=1;for(;r!==s+1;)l(r,e),e=e+t,r+=1}function l(o,e){u(o,e).then(({position:t,delay:s})=>{n.success({title:"Success",message:`✅ Fulfilled promise ${t} in ${s}ms`})}).catch(({position:t,delay:s})=>{n.error({title:"Error",message:`❌ Rejected promise ${t} in ${s}ms`})})}function u(o,e){const t=Math.random()>.3;return new Promise((s,r)=>{setTimeout(()=>{t?s({position:o,delay:e}):r({position:o,delay:e})},e)})}
//# sourceMappingURL=commonHelpers3.js.map
