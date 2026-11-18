import { useState } from 'react';
import ContactForm from '../components/ContactForm';
import { expertise, profile, workItems, skillDescriptions } from '../constants/portfolio';

// Decorative line sculpture: no photographs, external assets or extra dependencies.
function AboutLinework(){
  return <svg className="sa-about-linework" viewBox="0 0 480 320" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id="sa-about-ink" x1="0" y1="0" x2="480" y2="320" gradientUnits="userSpaceOnUse"><stop stopColor="#adf0d7" stopOpacity=".08"/><stop offset=".48" stopColor="#adf0d7" stopOpacity=".85"/><stop offset="1" stopColor="#adf0d7" stopOpacity=".12"/></linearGradient></defs>
    <g stroke="#35443d" strokeWidth=".7"><path d="M16 160H464M240 14V306" strokeDasharray="2 8"/><circle cx="240" cy="160" r="144" strokeDasharray="2 7"/><circle cx="240" cy="160" r="106" opacity=".5"/></g>
    <g className="sa-about-ribbon" stroke="url(#sa-about-ink)" strokeWidth="1.1">
      {Array.from({length:24},(_,i)=>{
        const t=i/23, points=Array.from({length:161},(_,j)=>{
          const a=j/160*Math.PI*2;
          const r=95+38*Math.cos(3*a+t*Math.PI*1.4);
          const x=240+(r*Math.cos(a))*1.26+22*Math.sin(2*a+t*2.8);
          const y=160+r*Math.sin(a)*.82+28*Math.cos(2*a+t*2.5);
          return `${j?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
        }).join(' ');
        return <path key={i} d={`${points}Z`}/>;
      })}
    </g>
    <g stroke="#adf0d7" strokeWidth="1"><path d="M32 160h12m-6-6v12M436 160h12m-6-6v12M240 18v10m-5-5h10"/><circle cx="240" cy="160" r="3" fill="#adf0d7"/></g>
    <circle className="sa-about-orbit-dot" cx="384" cy="160" r="4" fill="#adf0d7"/>
  </svg>;
}
export function About(){
  return <section className="sa-about" id="about" aria-labelledby="sa-about-heading">
    <div className="sa-stack-strip"><span>Tools of the trade</span><div className="sa-stack-clip" aria-label={profile.stackHighlights.join(", ")}><div className="sa-stack-marquee" aria-hidden="true">{[0,1].map(i=><div key={i}>{profile.stackHighlights.map(x=><span key={x}>{x}</span>)}</div>)}</div></div></div>
    <div className="sa-about-editorial sa-inset">
      <div className="sa-about-kicker"><h2 id="sa-about-heading">About me<span>.</span></h2></div>
      <div className="sa-about-statement">
        <h3>From interface<br/>to <em>infrastructure.</em></h3>
        <AboutLinework/>
      </div>
      <div className="sa-about-copy">
        <div className="sa-about-intro">
          <h3>{profile.role}<span>.</span></h3>
          <p>{profile.introduction}</p>
        </div>
        <div className="sa-about-approach">
          <h3>My approach</h3>
          <p>{profile.approach}</p>
          {profile.reportedResult&&<p className="sa-about-result">{profile.reportedResult}</p>}
        </div>
      </div>
    </div>
  </section>;
}
function SkillArt({index}){return <svg viewBox="0 0 360 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="sa-skill-art"><g fill="none" stroke="#c2f4df" strokeWidth=".8">{Array.from({length:12},(_,i)=><ellipse key={i} cx={275+Math.sin(i)*8} cy="50" rx={20+i*9} ry={10+i*4} transform={`rotate(${index*27+i*14} 275 50)`}/>)}</g></svg>;}
export function Expertise(){
  const [active,setActive]=useState(null);
  const [expanded,setExpanded]=useState(null);
  let number=0;
  return <section className="sa-expertise sa-paper" id="expertise" aria-labelledby="expertise-heading">
    <div className="sa-inset"><div className="sa-expertise-heading"><h2 id="expertise-heading">My <span aria-hidden="true">✳</span> Expertise</h2></div>
      <div className="sa-expertise-grid">{expertise.map((item,i)=><div key={item.id} className={`sa-expertise-item ${active===item.id?'is-active':''}`} onPointerEnter={()=>setActive(item.id)} onPointerLeave={()=>setActive(null)}><a href={`#${item.id}`}><span>{item.title}</span><SkillArt index={i}/></a><p>{item.caption}</p></div>)}</div>
    </div>
    <div className="sa-tech" id="technical-index"><div className="sa-inset"><div className="sa-tech-header"><p className="sa-label">The development stack</p><h2>Tools.<br/>Not trophies.</h2></div><div className="sa-tech-grid">{expertise.map(group=><section id={group.id} key={group.id} className="sa-skill-group"><h3>{group.title}</h3>{group.skills.map(skill=>{const id=++number;const open=expanded===skill;return <div key={skill} className={`sa-skill-row ${open?'is-open':''}`}><button type="button" aria-expanded={open} aria-controls={`sa-skill-${id}`} onClick={()=>setExpanded(open?null:skill)}><span className="sa-skill-number">{String(id).padStart(2,'0')}.</span><span>{skill}</span><span className="sa-skill-plus" aria-hidden="true">{open?'−':'+'}</span></button><p hidden={!open} id={`sa-skill-${id}`}>{skillDescriptions[skill] || group.caption}</p></div>;})}</section>)}</div></div></div>
  </section>;
}
export function Closing(){
  const socials = [['Fiverr',profile.fiverr],['GitHub',profile.github]].filter(([,url])=>url);
  const hasContact = Boolean(profile.email || socials.length);
  return <><section className="sa-closing" id="contact"><div className="sa-closing-band" aria-hidden="true"><div className="sa-name-track">{[0,1].map(i=><div className="sa-name-loop" key={i}><span>DESIGN / CODE / SYSTEMS&nbsp;</span></div>)}</div></div><div className="sa-inset sa-closing-main"><h2>Let's build<br/>something <em>real.</em></h2><p className="sa-contact-pending">{profile.contactIntro}</p><div className={`sa-contact-layout${hasContact?' has-direct-contact':''}`}><ContactForm/>{hasContact&&<aside className="sa-contact-direct" aria-label="Other ways to get in touch"><h3>Prefer to get in touch directly?</h3>{profile.email&&<a className="sa-closing-link" href={`mailto:${profile.email}`}>{profile.email}</a>}{socials.length>0&&<div className="sa-contact-socials">{socials.map(([label,url])=><a className="sa-underlink" key={label} href={url} target="_blank" rel="noopener noreferrer">{label}</a>)}</div>}</aside>}</div></div></section>
    <footer className="sa-footer sa-paper"><div className="sa-footer-top sa-inset"><div><h3>Shaurya Agnihotri</h3><p>{profile.role}</p>{socials.map(([label,url])=><a className="sa-underlink" key={label} href={url} target="_blank" rel="noopener noreferrer">{label}</a>)}</div><nav aria-label="Footer navigation"><a href="#home">Home</a><a href="#about">About</a><a href="#work">Solutions</a><a href="#expertise">Expertise</a></nav><nav aria-label="Solutions navigation">{workItems.map(x=><a href={`#${x.id}`} key={x.id}>{x.name}</a>)}</nav><nav aria-label="Technical navigation">{expertise.map(x=><a href={`#${x.id}`} key={x.id}>{x.title}</a>)}</nav></div><div className="sa-footer-bottom sa-inset"><span>© {new Date().getFullYear()} Shaurya Agnihotri</span><a href="#home">Back to top ↑</a></div></footer></>;
}
