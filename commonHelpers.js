import{a as h}from"./assets/vendor-c8691bfe.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const y="45272340-7dc1a3d2f1c55d3a20037b43c",p="https://pixabay.com/api/";async function f(t,r=1,n=15){const o={key:y,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:n};try{const e=await h.get(p,{params:o});return console.log(e.data),e.data}catch(e){throw console.error("Ошибка при выполнении запроса:",e),e}}function m(t){const r=document.querySelector(".gallery"),n=t.map(o=>`
    <div class="photo-card">
      <a href="${o.largeImageURL}">
        <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">Likes: ${o.likes}</p>
        <p class="info-item">Views: ${o.views}</p>
        <p class="info-item">Comments: ${o.comments}</p>
        <p class="info-item">Downloads: ${o.downloads}</p>
      </div>
    </div>
  `).join("");r.insertAdjacentHTML("beforeend",n)}function g(){const t=document.querySelector(".gallery");t.innerHTML=""}const L=document.querySelector(".search-form"),i=document.querySelector("#load-more-btn"),u=document.querySelector("#message-box");let c="",a=1;L.addEventListener("submit",w);i.addEventListener("click",v);async function w(t){if(t.preventDefault(),c=t.currentTarget.elements.query.value.trim(),console.log(c),a=1,c!==""){g(),i.classList.add("hidden");try{const r=await f(c,a);if(console.log(r),r.totalHits===0){l("No images found. Please try another query.");return}console.log(r.hits),m(r.hits),i.classList.remove("hidden"),a++}catch{l("An error occurred while fetching images.")}}}async function v(){try{const t=await f(c,a);if(t.hits.length===0){i.classList.add("hidden"),l("We're sorry, but you've reached the end of search results.");return}m(t.hits),a++;const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}catch{l("An error occurred while fetching more images.")}}function l(t){u.textContent=t,u.classList.remove("hidden")}
//# sourceMappingURL=commonHelpers.js.map
