import { useEffect, useRef, useState } from 'react';
import { expertise, workItems } from '../constants/portfolio';

export default function Navbar() {
  const [open,setOpen] = useState(null);
  const [scrolled,setScrolled] = useState(false);
  const header = useRef(null);
  const triggers = useRef({});
  const close = () => setOpen(null);
  useEffect(()=>{
    const update=()=>setScrolled(window.scrollY > 70);
    update(); window.addEventListener('scroll',update,{passive:true});
    return ()=>window.removeEventListener('scroll',update);
  },[]);
  useEffect(()=>{
    if (!open) return;
    const pointer=e=>{if(!header.current?.contains(e.target)) setOpen(null);};
    const key=e=>{if(e.key==='Escape'){setOpen(null); triggers.current[open]?.focus();}};
    const resize=()=>setOpen(null);
    const media=window.matchMedia('(max-width: 760px)');
    document.addEventListener('pointerdown',pointer); document.addEventListener('keydown',key); media.addEventListener('change',resize);
    return ()=>{document.removeEventListener('pointerdown',pointer);document.removeEventListener('keydown',key);media.removeEventListener('change',resize);};
  },[open]);
  const disclosure=(name,label)=><button type="button" ref={el=>{triggers.current[name]=el;}} className="sa-nav-item" aria-expanded={open===name} aria-controls={`sa-panel-${name}`} onClick={()=>setOpen(v=>v===name?null:name)}>{label}<span className="sa-plus" aria-hidden="true"/></button>;
  return <>
    <a href="#main-content" className="sa-skip">Skip to content</a>
    {open && <div className="sa-menu-shade" aria-hidden="true" onClick={close}/>}
    <header ref={header} className={`sa-header ${scrolled?'is-scrolled':''} ${open?'is-open':''}`}>
      <div className="sa-nav-shell">
        <a className="sa-wordmark" href="#home" aria-label="Shaurya — home" onClick={close}>shaurya<span>.</span></a>
        <nav className="sa-desktop-nav" aria-label="Main navigation">{disclosure('expertise','Expertise')}{disclosure('work','Solutions')}<a className="sa-nav-item" href="#about" onClick={close}>About</a><a className="sa-nav-item" href="#contact" onClick={close}>Contact</a></nav>
        <a className="sa-contact-link" href="#contact" onClick={close}>Get in touch</a>
        <button className="sa-mobile-toggle" ref={el=>{triggers.current.mobile=el;}} type="button" aria-expanded={open==='mobile'} aria-controls="sa-panel-mobile" onClick={()=>setOpen(v=>v==='mobile'?null:'mobile')}>{open==='mobile'?'Close':'Menu'}<span className="sa-plus" aria-hidden="true"/></button>
      </div>
      {['expertise','work'].map(name=><div className="sa-menu-panel" id={`sa-panel-${name}`} key={name} hidden={open!==name}>
        <div className="sa-menu-list"><p className="sa-label">{name==='expertise'?'Explore expertise':'Explore solutions'}</p><div className="sa-menu-links">{(name==='expertise'?expertise.map(x=>({id:x.id,name:x.title})):workItems).map(item=><a key={item.id} href={`#${item.id}`} onClick={close}>{item.name}</a>)}</div><a className="sa-underlink" href={name==='expertise'?'#expertise':'#work'} onClick={close}>View all {name==='expertise'?'capabilities':'solutions'}</a></div>
        <div className={`sa-menu-visual sa-menu-visual-${name}`} aria-hidden="true"><svg viewBox="0 0 240 180" fill="none"><g stroke="currentColor" strokeWidth=".8">{Array.from({length:12},(_,i)=><ellipse key={i} cx="120" cy="90" rx={20+i*6} ry={12+i*4} transform={`rotate(${i*15} 120 90)`}/>)}</g><circle cx="120" cy="90" r="3" fill="currentColor"/></svg><span>{name==='expertise'?`SYSTEMS / ${String(expertise.length).padStart(2,'0')}`:'SOLUTIONS / INTERACTIVE'}</span></div>
      </div>)}
      <nav id="sa-panel-mobile" className="sa-mobile-menu" aria-label="Mobile navigation" hidden={open!=='mobile'}>{[['#about','About'],['#work','Solutions'],['#expertise','Expertise'],['#contact','Contact']].map(([href,label])=><a href={href} key={href} onClick={close}>{label}</a>)}</nav>
    </header>
  </>;
}
