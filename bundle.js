(()=>{"use strict";(()=>{const e=document.querySelector(".map__pin--main"),t=document.querySelector("#address");window.utils={setAddressValue:()=>{let o=Math.round(parseInt(getComputedStyle(e).left,10)+31),r=Math.round(parseInt(getComputedStyle(e).top,10)+84);t.value=`${o}, ${r}`},setStartAddressValue:()=>{let o=Math.round(parseInt(getComputedStyle(e).left,10)+31),r=Math.round(parseInt(getComputedStyle(e).top,10)+32.5);t.value=`${o}, ${r}`},switchForm:(e,t)=>{for(let o of e)o.disabled=t}}})(),(()=>{let e=[];window.data={save:t=>{e=t},get:()=>e}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=document.querySelector(".map");window.pin={create:o=>{let r=e.cloneNode(!0);r.style.left=o.location.x-25+"px",r.style.top=o.location.y-70+"px";let n=r.querySelector("img");n.src=o.author.avatar,n.alt=o.offer.title;const a=e=>{t.querySelector(".map__pin--active")&&t.querySelector(".map__pin--active").classList.remove("map__pin--active"),e.target.closest(".map__pin").classList.add("map__pin--active"),window.card.render(o)};return r.addEventListener("click",(e=>{e.target.closest(".map__pin")&&!e.target.closest(".map__pin--main")&&a(e)})),r.addEventListener("keydown",(e=>{"Enter"===e.key&&e.target.closest(".map__pin")&&!e.target.closest(".map__pin--main")&&a(e)})),r}}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector(".map__pins"),o=()=>{if(e.querySelector(".map__pin:not(.map__pin--main)")){const t=e.querySelectorAll(".map__pin:not(.map__pin--main)");for(let e of t)e.remove()}};window.pins={render:e=>{o();const r=document.createDocumentFragment();for(let t=0;t<Math.min(5,e.length);t++){const o=window.pin.create(e[t]);r.appendChild(o)}t.appendChild(r)},remove:o}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t=document.querySelector(".map__filters-container"),o=document.querySelector(".map"),r=t=>{let o=e.cloneNode(!0);o.querySelector(".popup__avatar").src=t.author.avatar,o.querySelector(".popup__title").textContent=t.offer.title,o.querySelector(".popup__text--address").textContent=t.offer.address,o.querySelector(".popup__text--price").textContent=t.offer.price+"₽/ночь",o.querySelector(".popup__text--capacity").textContent=`${t.offer.rooms} комнаты для ${t.offer.guests}`,o.querySelector(".popup__text--time").textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,o.querySelector(".popup__description").textContent=t.offer.description,o.querySelector(".popup__type").textContent=(e=>{let t;switch(e){case"flat":t="Квартира";break;case"bungalow":t="Бунгало";break;case"house":t="Дом";break;case"palace":t="Дворец"}return t})(t.offer.type);let r=o.querySelector(".popup__features"),n=o.querySelectorAll(".popup__feature"),a=o.querySelector(".popup__feature--wifi").cloneNode(!0);a.classList.remove("popup__feature--wifi");for(let e=0;e<n.length;e++)n[e].remove();for(let e=0;e<t.offer.features.length;e++){let o=a.cloneNode(!0);o.classList.add("popup__feature--"+t.offer.features[e]),r.appendChild(o)}let s=o.querySelector(".popup__photos"),i=s.querySelector(".popup__photo").cloneNode(!0);s.querySelector(".popup__photo").remove();for(let e=0;e<t.offer.photos.length;e++){let o=i.cloneNode(!0);o.src=t.offer.photos[e],s.appendChild(o)}return o},n=e=>{e.preventDefault(),s()},a=e=>{"Escape"===e.key&&(e.preventDefault(),s())},s=()=>{o.querySelector(".map__card")&&(o.querySelector(".map__card").remove(),o.removeEventListener("keydown",a)),o.querySelector(".map__pin--active")&&o.querySelector(".map__pin--active").classList.remove("map__pin--active")};window.card={render:e=>{if(o.querySelector(".map__card")){o.querySelector(".map__card").remove();const n=r(e);o.insertBefore(n,t)}else{const n=r(e);o.insertBefore(n,t)}o.querySelector(".popup__close").addEventListener("click",n),o.addEventListener("keydown",a)},remove:s}})(),(()=>{const e=document.querySelector("#error").content.querySelector(".error"),t=document.querySelector("main");window.error={show:o=>{let r=e.cloneNode(!0);r.querySelector(".error__message").textContent=o,t.appendChild(r);const n=r.querySelector(".error__button"),a=e=>{e.preventDefault(),"Escape"===e.key&&s()};n.addEventListener("click",(e=>{e.preventDefault(),s()})),document.addEventListener("keydown",a);const s=()=>{document.querySelector(".error").remove(),document.removeEventListener("keydown",a)}}}})(),(()=>{const e=document.querySelector("#success").content.querySelector(".success"),t=document.querySelector("main");window.success={show:()=>{window.page.deactivate();let o=e.cloneNode(!0);t.appendChild(o);const r=()=>{document.querySelector(".success").remove(),document.removeEventListener("click",n),document.removeEventListener("keydown",a)},n=e=>{e.preventDefault(),r()},a=e=>{"Escape"===e.key&&(e.preventDefault(),r())};document.addEventListener("click",n),document.addEventListener("keydown",a)}}})(),window.server={request:(e,t,o,r,n)=>{const a=new XMLHttpRequest;a.responseType="json",a.addEventListener("load",(()=>{let e;switch(a.status){case 200:r(a.response);break;case 400:e="Неверный запрос";break;case 401:e="Пользователь не авторизован";break;case 404:e="Ничего не найдено";break;case 500:e="Внутренняя ошибка сервера";break;default:e=`Статус ответа: ${a.status} ${a.statusText}`}e&&n(e)})),a.addEventListener("error",(()=>{n("Произошла ошибка соединения")})),a.addEventListener("timeout",(()=>{n("Запрос не успел выполниться за "+a.timeout+"мс")})),a.timeout=1e4,a.open(t,o),a.send(e)}},(()=>{const e=["gif","jpg","jpeg","png"];window.image={showPreview:(t,o)=>{const r=t.files[0],n=r.name.toLowerCase();if(e.some((e=>n.endsWith(e)))){const e=new FileReader,t=()=>{o.querySelector("img")?o.querySelector("img").src=""+e.result:(o.style.backgroundImage=`url(${e.result})`,o.style.backgroundSize="100% 100%",o.style.backgroundRepeat="no-repeat")};e.addEventListener("load",t),e.readAsDataURL(r)}}}})(),(()=>{const e=1e3,t=5e3,o=1e4,r=1e5,n=document.querySelector("#room_number"),a=document.querySelector("#capacity"),s=document.querySelector("#title"),i=document.querySelector("#price"),d=document.querySelector("#type"),c=document.querySelector("#timein"),u=document.querySelector("#timeout");window.validators={validateGuests:()=>{const e=parseInt(a.value,10);switch(parseInt(n.value,10)){case 1:1!==e?a.setCustomValidity("Одна комната только для одного гостя"):a.setCustomValidity("");break;case 2:e<1||e>2?a.setCustomValidity("Две комнаты только для одного или двух гостей"):a.setCustomValidity("");break;case 3:e<1||e>3?a.setCustomValidity("Три комнаты только для 1-3 гостей"):a.setCustomValidity("");break;case 100:0!==e?a.setCustomValidity("100 комнат не для гостей"):a.setCustomValidity("")}a.reportValidity()},validateTitle:()=>{const e=s.value.length;e<30?s.setCustomValidity(`Ещё ${30-e} симв.`):e>100?s.setCustomValidity(`Удалите лишние ${e-100} симв.`):s.setCustomValidity(""),s.reportValidity()},validatePrice:()=>{const n=parseInt(i.value,10);switch(d.value){case"bungalow":i.placeholder=0,i.min=0,n>r?i.setCustomValidity("Цена не может быть больше 100000 за ночь"):i.setCustomValidity("");break;case"flat":i.placeholder=e,i.min=e,n>r||n<e?i.setCustomValidity("Цена за квартиру не может быть меньше 1000 и больше 100000 за ночь"):i.setCustomValidity("");break;case"house":i.placeholder=t,i.min=t,n>r||n<t?i.setCustomValidity("Цена за дом не может быть меньше 5000 и больше 100000 за ночь"):i.setCustomValidity("");break;case"palace":i.placeholder=o,i.min=o,n>r||n<o?i.setCustomValidity("Цена за дворец не может быть меньше 10000 и больше 100000 за ночь"):i.setCustomValidity("")}i.reportValidity()},tuneTimeOut:()=>{u.value=c.value},tuneTimeIn:()=>{c.value=u.value}}})(),(()=>{const e=document.querySelector(".ad-form"),t=document.querySelector(".ad-form__reset"),o=document.querySelector("#room_number"),r=document.querySelector("#capacity"),n=document.querySelector("#title"),a=document.querySelector("#price"),s=document.querySelector("#type"),i=document.querySelector("#timein"),d=document.querySelector("#timeout"),c=document.querySelector(".ad-form-header__input"),u=document.querySelector(".ad-form-header__preview"),l=document.querySelector(".ad-form__upload .ad-form__input"),p=document.querySelector(".ad-form__photo");r.addEventListener("change",window.validators.validateGuests),o.addEventListener("change",window.validators.validateGuests),n.addEventListener("input",window.validators.validateTitle),a.addEventListener("input",window.validators.validatePrice),s.addEventListener("change",window.validators.validatePrice),i.addEventListener("change",window.validators.tuneTimeOut),d.addEventListener("change",window.validators.tuneTimeIn),e.addEventListener("submit",(t=>{window.server.request(new FormData(e),"POST","https://21.javascript.pages.academy/keksobooking",window.success.show,window.error.show),t.preventDefault()})),t.addEventListener("click",(e=>{e.preventDefault(),window.page.deactivate()})),c.addEventListener("change",(()=>window.image.showPreview(c,u))),l.addEventListener("change",(()=>window.image.showPreview(l,p)))})(),(()=>{const e=document.querySelector(".map__pin--main");e.addEventListener("mousedown",(e=>{0===e.button&&window.utils.setAddressValue()})),e.addEventListener("mousedown",(t=>{if(t.preventDefault(),0===t.button){let o={x:t.clientX,y:t.clientY},r=!1;const n=t=>{t.preventDefault(),r=!0;const n=o.x-t.clientX,a=o.y-t.clientY;o={x:t.clientX,y:t.clientY};let s=e.offsetTop-a,i=e.offsetLeft-n;i<-31&&(i="-31px"),i>1169&&(i="1169px"),s<46&&(s="46px"),s>546&&(s="546px"),e.style.top=s+"px",e.style.left=i+"px",window.utils.setAddressValue()},a=t=>{if(t.preventDefault(),r){const t=o=>{o.preventDefault(),e.removeEventListener("click",t)};e.addEventListener("click",t)}window.utils.setAddressValue(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",a)}}))})(),(()=>{const e=document.querySelector(".map__filters"),t=document.querySelector("#housing-type"),o=document.querySelector("#housing-price"),r=document.querySelector("#housing-rooms"),n=document.querySelector("#housing-guests"),a=e=>(e=>"any"===t.value||e.offer.type===t.value)(e)&&(e=>"any"===r.value||e.offer.rooms===parseInt(r.value,10))(e)&&(e=>"any"===n.value||e.offer.guests===parseInt(n.value,10))(e)&&(e=>{if("any"!==o.value){if("low"===o.value&&e.offer.price>=1e4)return!1;if("middle"===o.value&&e.offer.price<1e4&&e.offer.price>5e4)return!1;if("high"===o.value&&e.offer.price<5e4)return!1}return!0})(e)&&(e=>{const t=document.querySelectorAll(".map__checkbox:checked");for(let o of t)if(!e.offer.features.includes(o.value))return!1;return!0})(e),s=window.debounce((()=>{window.card.remove();const e=window.data.get().filter(a);window.pins.render(e)}));e.addEventListener("change",s)})(),(()=>{const e="375px",t="570px",o=document.querySelector(".map"),r=document.querySelector(".map__pin--main"),n=document.querySelector(".ad-form"),a=n.querySelectorAll("fieldset"),s=document.querySelector(".map__filters"),i=s.children,d=document.querySelector(".ad-form-header__preview img"),c=document.querySelector(".ad-form__photo"),u=()=>{o.classList.remove("map--faded"),n.classList.remove("ad-form--disabled"),window.utils.switchForm(a,!1),window.server.request("","GET","https://21.javascript.pages.academy/keksobooking/data",l,window.error.show),r.removeEventListener("mousedown",p),r.removeEventListener("keydown",m)},l=e=>{window.data.save(e),window.pins.render(window.data.get()),window.utils.switchForm(i,!1)},p=e=>{0===e.button&&u()},m=e=>{"Enter"===e.key&&u()};window.page={deactivate:()=>{o.classList.contains("map--faded")||o.classList.add("map--faded"),n.classList.contains("ad-form--disabled")||n.classList.add("ad-form--disabled"),window.pins.remove(),window.card.remove(),n.reset(),s.reset(),d.src="img/muffin-grey.svg",c.style.backgroundImage="none",r.style.top=e,r.style.left=t,window.utils.switchForm(a,!0),window.utils.switchForm(i,!0),window.utils.setStartAddressValue(),r.addEventListener("mousedown",p),r.addEventListener("keydown",m)}}})(),window.page.deactivate()})();