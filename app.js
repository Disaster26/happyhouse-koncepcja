(function(){
  /* na telefonie listy 'Co jest w cenie' zwiniete */
  if(window.matchMedia('(max-width:760px)').matches){document.querySelectorAll('.w-cenie').forEach(function(d){d.removeAttribute('open');});}
  var burger=document.getElementById('burger'), menu=document.getElementById('menu');
  function zamknij(){menu.classList.remove('otwarte');burger.classList.remove('x');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Otwórz menu');}
  burger.addEventListener('click',function(){
    var o=menu.classList.toggle('otwarte');burger.classList.toggle('x',o);
    burger.setAttribute('aria-expanded',o?'true':'false');burger.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');
  });
  menu.addEventListener('click',function(e){if(e.target.tagName==='A')zamknij();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij();});

  /* dolny pasek dopiero po przewinieciu za przycisk w hero */
  var mob=document.getElementById('mob'), cta=document.getElementById('heroCta'), kontakt=document.getElementById('kontakt');
  var zaCta=false, wKontakcie=false;
  function pokaz(){mob.classList.toggle('widac',zaCta&&!wKontakcie);}
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(w){var e=w[0];zaCta=!e.isIntersecting&&e.boundingClientRect.top<0;pokaz();}).observe(cta);
    new IntersectionObserver(function(w){wKontakcie=w[0].isIntersecting;pokaz();},{rootMargin:'0px 0px -40% 0px'}).observe(kontakt);
  }

  /* formularz w wizualizacji: przygotowuje wiadomosc e-mail */
  var f=document.getElementById('formularz'), blad=document.getElementById('formBlad');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var imie=f.imie.value.trim(), tel=f.tel.value.trim();
    if(!imie||tel.replace(/\D/g,'').length<9){blad.textContent='Proszę podać imię i numer telefonu (9 cyfr).';(imie?f.tel:f.imie).focus();return;}
    blad.textContent='';
    var linie=['Imię i nazwisko: '+imie,'Telefon: '+tel,'Program: '+f.program.value];
    if(f.metraz.value.trim())linie.push('Metraż: '+f.metraz.value.trim()+' m²');
    if(f.plus.checked)linie.push('Interesuje mnie też Pakiet Plus');
    if(f.wiad.value.trim())linie.push('','Wiadomość:',f.wiad.value.trim());
    location.href='mailto:kontakt@happyhouse.pl?subject='+encodeURIComponent('Zapytanie o wycenę wykończenia - '+f.program.value)+'&body='+encodeURIComponent(linie.join('\n'));
  });
})();
