import{i as c,S as f}from"./assets/vendor-8c59ed88.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const m=document.querySelector(".form"),l=document.querySelector(".gallery"),a=document.querySelector(".loader");m.addEventListener("submit",function(i){i.preventDefault();const o=i.target.querySelector("input").value.trim();if(!o){c.error({position:"topRight",message:"Please complete the form"});return}a.style.display="block",l.innerHTML="",d(o).then(t=>{if(t.totalHits===0){c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),a.style.display="none";return}y(t.hits),a.style.display="none",new f(".gallery a").refresh()}).catch(t=>{c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),a.style.display="none",console.error(t)})});function d(i){const t=`https://pixabay.com/api/?key=44961445-711bc8a23588390ccc23a177e&q=${i}&image_type=photo&pretty=true`;return fetch(t).then(s=>{if(!s.ok)throw new Error("Network response was not ok");return s.json()})}function y(i){const o=i.map(({webformatURL:t,largeImageURL:s,tags:e,likes:r,views:n,comments:p,downloads:u})=>`
      <li class="gallery-item">
        <a href="${s}">
          <img src="${t}" alt="${e}" loading="lazy"/>
        </a>
        <div class="image-info">
        <div class ="info-part"><p class="info-name">Likes</p><p class="info-num">${r}</p></div>
        <div class ="info-part"><p class="info-name">Views</p><p class="info-num">${n}</p></div>
        <div class ="info-part"><p class="info-name">Comments</p><p class="info-num">${p}</p></div>
        <div class ="info-part"><p class="info-name">Downloads</p><p class="info-num">${u}</p></div>
        </div>
      </li>
    `).join("");l.innerHTML=o}
//# sourceMappingURL=commonHelpers.js.map
