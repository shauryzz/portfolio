import { useEffect, useRef, useState } from 'react';
import { workItems } from '../constants/portfolio';

const productOptions = [{name:'Sand',color:'#d6c7ad',price:1499},{name:'Graphite',color:'#414846',price:1599},{name:'Moss',color:'#8e9e7d',price:1499}];
function StoreDemo(){
  const [variant,setVariant]=useState(0);
  const [cart,setCart]=useState([0,0,0]);
  const option=productOptions[variant];
  const count=cart.reduce((a,b)=>a+b,0);
  const total=cart.reduce((sum,n,i)=>sum+n*productOptions[i].price,0);
  const money=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
  return <div className="sa-store-demo"><div className="sa-demo-top"><span>Storefront concept / Demo</span><span>Bag ({count})</span></div><div className="sa-store-body"><div className="sa-store-art" style={{'--product-color':option.color}}><svg viewBox="0 0 190 150" role="img" aria-label={`${option.name} sample bag`}><path d="M42 52Q40 43 51 43H139Q150 43 148 52L160 131H30Z" fill="var(--product-color)" stroke="#232b28" strokeWidth="1.2"/><path d="M69 48V31Q69 5 95 5Q121 5 121 31V48" fill="none" stroke="var(--product-color)" strokeWidth="10"/><path d="M45 62L145 62M70 58V120M120 58V120" fill="none" stroke="#232b28" strokeOpacity=".3"/><text x="95" y="95" textAnchor="middle" fontSize="10" fill="#e9e9df">FORM</text></svg></div><div className="sa-store-info"><p className="sa-label">Sample product</p><h3>Everyday tote</h3><p>{money(option.price)}</p><div className="sa-variant-row" aria-label="Color options">{productOptions.map((v,i)=><button key={v.name} type="button" aria-pressed={variant===i} onClick={()=>setVariant(i)} title={v.name} aria-label={v.name} style={{'--swatch':v.color}}/>)}</div><small>{option.name}</small><button type="button" className="sa-demo-action" onClick={()=>setCart(old=>old.map((n,i)=>i===variant?Math.min(n+1,99):n))}>Add to bag</button></div></div><div className="sa-store-total"><span aria-live="polite">{count} items · {money(total)}</span><button type="button" className="sa-underlink" disabled={!count} onClick={()=>setCart([0,0,0])}>Reset bag</button></div></div>;
}
function CroDemo(){
  const [streamlined,setStreamlined]=useState(true);
  return <div className="sa-cro-demo"><div className="sa-demo-top"><span>Checkout comparison</span><span>Illustrative only</span></div><div className="sa-demo-switch" role="group" aria-label="Checkout flow">{[false,true].map(v=><button key={String(v)} type="button" aria-pressed={streamlined===v} onClick={()=>setStreamlined(v)}>{v?'Streamlined':'Conventional'}</button>)}</div><h3>{streamlined?'A clearer path to purchase.':'More steps before purchase.'}</h3><div className="sa-flow-demo">{(streamlined?['Cart & total','Delivery & payment','Review order']:['Cart','Create account','Delivery','Payment','Review order']).map((label,i)=><div key={label}><span>{String(i+1).padStart(2,'0')}</span><strong>{label}</strong></div>)}</div><p>{streamlined?'Guest checkout, visible costs and grouped inputs.':'An example with a separate account step and more screens.'}</p></div>;
}
const records=[['ORD-1001','Paid'],['ORD-1002','Pending'],['ORD-1003','Shipped'],['ORD-1004','Paid'],['ORD-1005','Shipped']];
function DataDemo(){
  const [query,setQuery]=useState('');
  const filtered=records.filter(row=>row.join(' ').toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="sa-data-demo"><div className="sa-demo-top"><span>Order explorer</span><span>Sample data</span></div><label className="sa-search-label">Filter by order or status<input type="search" placeholder="Try Paid or Shipped" value={query} onChange={e=>setQuery(e.target.value)}/></label><div className="sa-demo-table" role="table" aria-label="Sample orders"><div role="row" className="sa-demo-head"><span role="columnheader">Order</span><span role="columnheader">Status</span></div>{filtered.map(row=><div role="row" key={row[0]}><span role="cell">{row[0]}</span><span role="cell">{row[1]}</span></div>)}</div><p aria-live="polite">{filtered.length} of {records.length} records</p></div>;
}
function ProjectVisual({item}){
  if(item.demo==='shopify')return <StoreDemo/>;
  if(item.demo==='cro')return <CroDemo/>;
  return <DataDemo/>;
}
export default function Works(){
  const track=useRef(null);
  const [current,setCurrent]=useState(0);
  const [hover,setHover]=useState(null);
  const [details,setDetails]=useState(false);
  const index=hover ?? current;
  const item=workItems[index];
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      frame=0;
      if(!track.current)return;
      const steps=Array.from(track.current.children);
      const line=window.innerHeight*.46;
      let next=0;
      steps.forEach((el,i)=>{if(el.getBoundingClientRect().top<=line)next=i;});
      setCurrent(next);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    schedule();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
    return()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);cancelAnimationFrame(frame);};
  },[]);
  useEffect(()=>{setDetails(false);},[index]);
  return <section id="work" className="sa-work sa-paper" aria-labelledby="sa-work-title">
    <div className="sa-work-intro sa-inset"><p>Explore how a storefront, a customer journey and an application interface can work. These are interactive concepts, not client projects.</p><div><h2 id="sa-work-title">Built for business.<br/>Designed to work.</h2><div className="sa-inline-links"><a href="#about">My story</a><a href="#expertise">My expertise</a></div></div></div>
    <div className="sa-work-scroll">
      <div className="sa-work-track" ref={track} aria-hidden="true">{workItems.map(x=><div id={x.id} key={x.id} className="sa-work-step" />)}</div>
      <div className="sa-work-sticky">
        <div className="sa-work-ghost" key={item.id} aria-hidden="true">{item.name} — {item.name}</div>
        <div className="sa-work-layout sa-inset">
          <div className="sa-work-list" onPointerLeave={()=>setHover(null)}>
            <p className="sa-label">Scroll or select a solution</p>
            {workItems.map((x,i)=><a href={`#${x.id}`} key={x.id} className={`sa-work-choice ${i===index?'is-current':''}`} aria-current={i===index?'true':undefined} onPointerEnter={e=>{if(e.pointerType==='mouse')setHover(i);}} onClick={()=>{setHover(null);setCurrent(i);}}><span>{x.name}</span><sup>[{x.year || String(i+1).padStart(2,'0')}]</sup></a>)}
          </div>
          <div className="sa-work-display">
            <div className="sa-project-frame" key={item.id} onPointerEnter={e=>{if(e.pointerType==='mouse' && item.image && !item.demo)setDetails(true);}} onPointerLeave={()=>{if(item.image && !item.demo)setDetails(false);}}>
              {details?<div className="sa-project-details"><p className="sa-label">{item.type || 'Concept'}</p><p>{item.description}</p><div>{(item.stack||[]).map(t=><span key={t}>[{t}] </span>)}</div>{item.url&&<a href={item.url} target="_blank" rel="noreferrer" className="sa-underlink">Open project</a>}</div>:<ProjectVisual item={item}/>} 
            </div>
            <div className="sa-project-caption"><span>{item.type || 'Concept'}</span><button type="button" className="sa-underlink" aria-pressed={details} onClick={()=>setDetails(v=>!v)}>{details?'Show visual':'Show details'} <span aria-hidden="true">{details?'−':'+'}</span></button></div>
          </div>
        </div>
        <div className="sa-work-progress sa-inset" aria-hidden="true"><span>{String(index+1).padStart(2,'0')}</span><div><i style={{width:`${(index+1)/workItems.length*100}%`}}/></div><span>{String(workItems.length).padStart(2,'0')}</span></div>
      </div>
    </div>
  </section>;
}
