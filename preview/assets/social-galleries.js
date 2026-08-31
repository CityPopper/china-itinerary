(function(){
  const SOURCE_LABEL='Traveler photo · Trip.com Moments';
  const galleries={
    'Riad by the Theatre':{source:'https://www.trip.com/moments/detail/shenzhen-26-143049951/',images:[
      'https://ak-d.tripcdn.com/images/1mi1912000rsinznl4081_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi6012000rsia7fq8C04_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi2r12000rsi8r4r9398_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Huaqiangbei':{source:'https://us.trip.com/moments/detail/shenzhen-26-146555831/',images:[
      'https://ak-d.tripcdn.com/images/1mi2o12000sqiukxd50BB_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi5112000sqj177b5198_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi0s12000sqj7x2d4D94_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'BitCity 次元小镇 — Anime Mall':{source:'https://www.trip.com/moments/detail/shenzhen-26-143021909/',images:[
      'https://ak-d.tripcdn.com/images/1mi57224x98m51t6xB0B8_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi1v224x98m4qpfrB480_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi0c224x98m4ysf7BEBA_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Dongmen + NWH Dimension 9':{source:'https://www.trip.com/moments/detail/shenzhen-26-130964675/',images:[
      'https://ak-d.tripcdn.com/images/1mi4112000jofd41g30E0_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi5b12000jofmaymDB8A_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi1c12000jogbeg1E3F4_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'MOCAPE — Contemporary Art & Planning Museum':{source:'https://th.trip.com/moments/detail/shenzhen-26-122524579/',images:[
      'https://ak-d.tripcdn.com/images/1mi32224x8vdl6wx344FD_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi6i224x8vdm1i4329C8_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi67224x8vdl5o18D6DF_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Shenzhen Bay':{source:'https://www.trip.com/moments/detail/shenzhen-26-146727456/',images:[
      'https://ak-d.tripcdn.com/images/1mi0l12000srzmkp69E71_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi2z12000srzmt2s0853_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi6p12000srzmqlxE4C8_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Nantou Ancient City':{source:'https://www.trip.com/moments/detail/shenzhen-26-125096435/',images:[
      'https://ak-d.tripcdn.com/images/1mi0j224x8wt8v8x49856_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3k224x8wt8l5wo3C63_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi73224x8wtb685wD69D_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Zhongshuge Bookstore — Happy Harbor':{source:'https://www.trip.com/moments/detail/shenzhen-26-140333237/',images:[
      'https://ak-d.tripcdn.com/images/1mi5m224x97vfp7x40432_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3n224x97vfs7euC151_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi4h224x97vfe92t2E6B_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Tianhe / Taikoo Hui':{source:'https://www.trip.com/moments/detail/guangzhou-152-143387161/',images:[
      'https://ak-d.tripcdn.com/images/1mi3q12000rwedwuaE80B_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi5012000rwedta6C9C5_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi4312000rwedugc19D7_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Beijing Road':{source:'https://www.trip.com/moments/detail/guangzhou-152-145885805/',images:[
      'https://ak-d.tripcdn.com/images/1mi2l12000skdw48s397C_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3o12000skdo6y6EA97_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi7012000skdb54iBBC0_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Two Rivers & Four Lakes':{source:'https://us.trip.com/moments/detail/guilin-28-144151001/',images:[
      'https://ak-d.tripcdn.com/images/1mi5r12000s3q6yx064E1_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi1g12000s3q70rsE87F_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi4012000s3q6yx6E649_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Zhengyang Pedestrian Area':{source:'https://www.trip.com/moments/detail/guilin-28-140052495/',images:[
      'https://ak-d.tripcdn.com/images/1mi0z224x97py21pr2C45_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi2g224x97py30bi79AC_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi2a224x97pxqplxC758_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Xingping Ancient Town':{source:'https://www.trip.com/moments/detail/yangshuo-702-10681919/',images:[
      'https://ak-d.tripcdn.com/images/1i64p120008vqu79a61E2_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1i66x120008vqsb0qBF25_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1i657120008vqtazbD642_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Li River':{source:'https://www.trip.com/moments/detail/yangshuo-702-10681919/',images:[
      'https://ak-d.tripcdn.com/images/1i66x120008vqsb0qBF25_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1i64p120008vqu79a61E2_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1i657120008vqtazbD642_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    '20 RMB Viewpoint':{source:'https://www.trip.com/moments/detail/yangshuo-702-10681919/',images:[
      'https://ak-d.tripcdn.com/images/1i657120008vqtazbD642_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1i66x120008vqsb0qBF25_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1i64p120008vqu79a61E2_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Hanfu Photo Session':{source:'https://hk.trip.com/moments/detail/yangshuo-702-140859762/',images:[
      'https://ak-d.tripcdn.com/images/1mi2m12000r6yrkajB547_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi5p12000r6yrg2o4B86_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi0v12000r6yrkar4EEA_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Elephant Trunk Hill':{source:'https://us.trip.com/moments/detail/guilin-28-150147257/',images:[
      'https://ak-d.tripcdn.com/images/1mi3f12000tihnoqfE484_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi6612000tihnrqaC406_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi2y12000tihnk961685_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Reed Flute Cave':{source:'https://ca.trip.com/moments/detail/guilin-28-128781564/',images:[
      'https://ak-d.tripcdn.com/images/1mi6012000i67jjgl2EF9_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3v12000i64o83g2143_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi0y12000i66ix01953A_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Hongya Cave':{source:'https://www.trip.com/moments/detail/chongqing-158-140195568/',images:[
      'https://ak-d.tripcdn.com/images/1mi61424x97ss02ot4AA3_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi26424x97srjywa7995_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3k424x97ss02os233C_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Jiefangbei':{source:'https://www.trip.com/moments/detail/chongqing-158-143117256/',images:[
      'https://ak-d.tripcdn.com/images/1mi2j224x98msawvm9862_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi2k224x98msrpel6089_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi5f224x98msbfdcE9DB_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Liziba Monorail':{source:'https://www.trip.com/moments/detail/chongqing-158-143628375/',images:[
      'https://ak-d.tripcdn.com/images/1mi5s12000ryoyc6kBFC7_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi6e12000ryp3gc68971_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi1212000ryp4oph145A_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Shibati':{source:'https://www.trip.com/moments/detail/chongqing-158-140501958/',images:[
      'https://ak-d.tripcdn.com/images/1mi5e424x97xvs2skE901_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3z424x97xvwkc91BB8_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi5j424x97y0i2lb2A6D_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Yangtze River Cableway':{source:'https://www.trip.com/moments/detail/chongqing-158-142996891/',images:[
      'https://ak-d.tripcdn.com/images/1mi5v224x98lzt9h1E52A_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi55224x98lzf822E687_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3i224x98m0078c0F44_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Taikoo Li':{source:'https://www.trip.com/moments/detail/chengdu-104-128552993/',images:[
      'https://ak-d.tripcdn.com/images/1mi4v12000hzxj4ggE6A3_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3112000hzx4j7rF4F2_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi0t12000hzxccx2B903_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Chunxi Road':{source:'https://www.trip.com/moments/detail/chengdu-104-123772280/',images:[
      'https://ak-d.tripcdn.com/images/1mi6u224x8vzpv6x6FD2C_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3q224x8w0ekbbpF957_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi1t224x8vzpe68619F4_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Chengdu IFS Panda':{source:'https://www.trip.com/moments/detail/chengdu-104-123772280/',images:[
      'https://ak-d.tripcdn.com/images/1mi3q224x8w0ekbbpF957_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi1t224x8vzpe68619F4_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi6u224x8vzpv6x6FD2C_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Giant Panda Base':{source:'https://us.trip.com/moments/detail/chengdu-104-150076004/',images:[
      'https://ak-d.tripcdn.com/images/1mi5i12000tfx0kkeED78_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi2912000tfx0kcw4E7B_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi4i12000tfx0lc145AB_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Wenshu Monastery':{source:'https://www.trip.com/moments/detail/chengdu-104-146453008/',images:[
      'https://ak-d.tripcdn.com/images/1mi2f12000spozidw8907_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi1012000spoqy6p11A1_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3t12000spp9l60425E_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'People’s Park':{source:'https://www.trip.com/moments/detail/chengdu-104-147643231/',images:[
      'https://ak-d.tripcdn.com/images/1mi1r12000t06bhl76A59_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi0212000t06bbxk2450_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3e12000t06bg3dF537_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Traditional Teahouse':{source:'https://www.trip.com/moments/detail/chengdu-104-147643231/',images:[
      'https://ak-d.tripcdn.com/images/1mi0212000t06bbxk2450_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3e12000t06bg3dF537_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi1r12000t06bhl76A59_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Kuanzhai Alleys':{source:'https://www.trip.com/moments/detail/chengdu-104-143366995/',images:[
      'https://ak-d.tripcdn.com/images/1mi2u224x98q11n7n17A4_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi4z224x98q0748j6998_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi1m224x98q12ianB5AE_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Sichuan Opera':{source:'https://uk.trip.com/moments/detail/chengdu-104-147764115/',images:[
      'https://ak-d.tripcdn.com/images/1mi02224x99v3fu47B4F7_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi0r224x99v376htEA03_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi0p224x99v2kzr02B3F_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Urban Spa / Bathhouse':{source:'https://www.trip.com/moments/detail/chengdu-104-142483629/',images:[
      'https://ak-d.tripcdn.com/images/1mi6l12000ro8k2o44C57_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi1e12000ro8k6luED4D_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi3q12000ro8k8xp4D02_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']},
    'Qingchengshan option':{source:'https://us.trip.com/moments/detail/dujiangyan-911-149627605/',images:[
      'https://ak-d.tripcdn.com/images/1mi6612000td7n9cwC0F9_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi6912000td7na5a330E_W_640_0_R5_Q80.jpg?proc=source%2Ftrip',
      'https://ak-d.tripcdn.com/images/1mi1m12000td7nc0i0C28_W_640_0_R5_Q80.jpg?proc=source%2Ftrip']}
  };

  const lightbox=document.createElement('div');
  lightbox.className='social-lightbox';
  lightbox.setAttribute('role','dialog');
  lightbox.setAttribute('aria-modal','true');
  lightbox.setAttribute('aria-label','Photo viewer');
  lightbox.innerHTML='<div class="social-lightbox-inner"><button type="button" class="social-lightbox-close" aria-label="Close photo viewer">×</button><div class="social-lightbox-image-wrap"><button type="button" class="social-lightbox-arrow prev" aria-label="Previous photo">‹</button><img alt=""><button type="button" class="social-lightbox-arrow next" aria-label="Next photo">›</button></div><div class="social-lightbox-caption"><a class="social-lightbox-source" rel="noopener noreferrer">View traveler post ↗</a><span class="social-lightbox-count"></span></div></div>';
  document.body.appendChild(lightbox);
  const lbImg=lightbox.querySelector('img');
  const lbSource=lightbox.querySelector('.social-lightbox-source');
  const lbCount=lightbox.querySelector('.social-lightbox-count');
  let activeGallery=null,activeIndex=0;
  function showLightbox(gallery,index){
    activeGallery=gallery;activeIndex=index;
    const item=gallery.items[index];
    lbImg.src=item.src; lbImg.alt=item.alt;
    lbSource.href=item.source; lbSource.textContent='View traveler post ↗';
    lbCount.textContent=(index+1)+' / '+gallery.items.length;
    lightbox.classList.add('open');document.body.classList.add('lightbox-open');
    lightbox.querySelector('.social-lightbox-close').focus();
  }
  function stepLightbox(dir){if(!activeGallery)return;activeIndex=(activeIndex+dir+activeGallery.items.length)%activeGallery.items.length;showLightbox(activeGallery,activeIndex)}
  function closeLightbox(){lightbox.classList.remove('open');document.body.classList.remove('lightbox-open');activeGallery=null;}
  lightbox.querySelector('.social-lightbox-close').addEventListener('click',closeLightbox);
  lightbox.querySelector('.social-lightbox-arrow.prev').addEventListener('click',()=>stepLightbox(-1));
  lightbox.querySelector('.social-lightbox-arrow.next').addEventListener('click',()=>stepLightbox(1));
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
  document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')stepLightbox(-1);if(e.key==='ArrowRight')stepLightbox(1)});

  function makeGallery(title,data,fallback,hero){
    const wrap=document.createElement('div');wrap.className='social-gallery'+(hero?' social-gallery-hero':'');
    const track=document.createElement('div');track.className='social-gallery-track';track.tabIndex=0;track.setAttribute('aria-label',title+' photo gallery');
    const items=data.images.map((src,i)=>({src,source:data.source,alt:title+' traveler photo '+(i+1)}));
    items.forEach((item,i)=>{
      const fig=document.createElement('figure');fig.className='social-gallery-slide';
      const img=document.createElement('img');img.loading=i===0?'eager':'lazy';img.src=item.src;img.alt=item.alt;img.referrerPolicy='no-referrer';
      img.dataset.index=i;img.addEventListener('click',()=>showLightbox({items,title},i));
      img.addEventListener('error',()=>{if(i===0&&fallback&&!img.dataset.fallbackTried){img.dataset.fallbackTried='1';img.src=fallback}else{fig.style.display='none'}});
      const source=document.createElement('a');source.className='social-gallery-source';source.href=data.source;source.rel='noopener noreferrer';source.textContent=SOURCE_LABEL+' ↗';
      fig.append(img,source);track.appendChild(fig);
    });
    const prev=document.createElement('button');prev.type='button';prev.className='social-gallery-nav prev';prev.setAttribute('aria-label','Previous photo');prev.textContent='‹';
    const next=document.createElement('button');next.type='button';next.className='social-gallery-nav next';next.setAttribute('aria-label','Next photo');next.textContent='›';
    const counter=document.createElement('span');counter.className='social-gallery-counter';counter.textContent='1 / '+items.length;
    const dots=document.createElement('div');dots.className='social-gallery-dots';
    items.forEach((_,i)=>{const d=document.createElement('span');d.className='social-gallery-dot'+(i===0?' active':'');dots.appendChild(d)});
    function currentIndex(){return Math.max(0,Math.min(items.length-1,Math.round(track.scrollLeft/Math.max(1,track.clientWidth))))}
    function update(){const i=currentIndex();counter.textContent=(i+1)+' / '+items.length;[...dots.children].forEach((d,j)=>d.classList.toggle('active',i===j))}
    function go(dir){const i=(currentIndex()+dir+items.length)%items.length;track.scrollTo({left:i*track.clientWidth,behavior:'smooth'})}
    prev.addEventListener('click',e=>{e.stopPropagation();go(-1)});next.addEventListener('click',e=>{e.stopPropagation();go(1)});track.addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});
    wrap.append(track,prev,next,counter,dots);
    if(hero){
      const meta=document.createElement('div');meta.className='social-gallery-meta';
      meta.innerHTML='<a class="social-gallery-credit" href="'+data.source+'" rel="noopener noreferrer">Traveler photos · Trip.com Moments ↗</a><span class="social-gallery-hint">Swipe / click to browse</span>';
      wrap.appendChild(meta);
    }
    return wrap;
  }

  const cards=[...document.querySelectorAll('.place-card')];
  cards.forEach(card=>{
    const h=card.querySelector('h3');if(!h)return;const title=h.textContent.trim();const data=galleries[title];if(!data)return;
    const old=card.querySelector(':scope > img');const fallback=old?old.getAttribute('src'):'';
    const gallery=makeGallery(title,data,fallback,false);
    if(old)old.replaceWith(gallery);else card.prepend(gallery);
    card.querySelectorAll('.photo-credit').forEach(n=>n.remove());
  });

  const firstTitle=cards.map(c=>c.querySelector('h3')?.textContent.trim()).find(t=>galleries[t]);
  const hero=document.querySelector('.day-visuals');
  if(hero&&firstTitle){
    const oldHero=hero.querySelector('img');const fallback=oldHero?oldHero.getAttribute('src'):'';
    hero.replaceChildren(makeGallery(firstTitle,galleries[firstTitle],fallback,true));
  }
})();
