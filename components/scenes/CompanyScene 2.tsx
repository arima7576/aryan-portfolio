"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const capabilities = [
  ["Quantitative Research","Financial modelling, forecasting, statistical analysis, market microstructure and risk intelligence."],
  ["Algorithm Development","Trading algorithms, AI-powered financial systems, execution engines, automation and quantitative software."],
  ["Portfolio & Investment Management","Systematic portfolio construction, asset allocation, investment research, performance analysis and risk management."],
];

export function CompanyScene(){const root=useRef<HTMLElement>(null);useGSAP(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const cards=gsap.utils.toArray<HTMLElement>(".capability-node");cards.forEach((card,i)=>ScrollTrigger.create({trigger:card,start:"top 62%",end:"bottom 38%",onToggle:self=>card.classList.toggle("illuminated",self.isActive),onEnter:()=>gsap.to(".intelligence-pulse",{left:`${18+i*32}%`,duration:.7,ease:"power2.inOut"})}));},{scope:root});return <section ref={root} id="company" className="company-scene"><div className="company-intro"><p className="eyebrow">03 / COMPANY</p><h2>What is Arima Finance?</h2><div><p className="lead">Arima Finance is an independent quantitative finance and financial technology company developing intelligent solutions for financial markets.</p><p>We combine quantitative research, artificial intelligence, financial engineering and software development to build systems for investors, traders, institutions and financial professionals.</p></div></div><div id="capabilities" className="capability-system"><div className="capability-rail" aria-hidden="true"><span className="intelligence-pulse"/></div>{capabilities.map(([title,text],i)=><article className="capability-node" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p><div className="border-light"/></article>)}</div><div className="decision-chain" aria-label="Arima Finance intelligence sequence"><span>RESEARCH</span><i/> <span>ALGORITHM</span><i/> <span>PORTFOLIO</span><i/> <span>RISK</span><i/> <span>DECISION</span></div></section>}
