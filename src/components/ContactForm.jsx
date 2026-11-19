import { useEffect, useRef, useState } from 'react';
import { profile } from '../constants/portfolio';

const services = ['Shopify store / theme', 'Conversion optimization', 'Business website / landing page', 'WordPress development', 'Full-stack application', 'Other'];

export default function ContactForm() {
  const accessKey = String(profile.web3formsAccessKey || '').trim();
  const configured = Boolean(accessKey);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const pending = useRef(null);
  useEffect(() => () => { pending.current?.abort(); }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (pending.current) return;
    if (!configured) {
      setStatus('error');
      setMessage(profile.fiverr ? 'The form is not connected yet. Please use my Fiverr link instead.' : 'The form is not connected yet. Please try again later.');
      return;
    }
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get('name') || '').trim();
    const email = String(values.get('email') || '').trim();
    const enquiry = String(values.get('message') || '').trim();
    if (!name || !email || !enquiry || values.get('botcheck')) {
      setStatus('error');
      setMessage('Please check your name, email and project details.');
      return;
    }
    const controller = new AbortController();
    pending.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    setStatus('sending');
    setMessage('Sending your enquiry…');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'New enquiry — Shaurya Agnihotri',
          from_name: 'Shaurya Portfolio',
          name, email, service: String(values.get('service') || 'Not specified'),
          message: enquiry,
          botcheck: false,
        }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) {
        setStatus('error');
        setMessage(response.status === 429 ? 'Too many requests. Please try again later.' : 'Your enquiry could not be confirmed. Please try again later.');
        return;
      }
      form.reset();
      setStatus('success');
      setMessage('Thank you. Your enquiry has been sent.');
    } catch (error) {
      setStatus('error');
      setMessage(error.name === 'AbortError' ? 'The request timed out. Delivery could not be confirmed. Please check before resending.' : 'Could not confirm delivery. Check your connection and try again later.');
    } finally {
      window.clearTimeout(timeout);
      pending.current = null;
    }
  }

  return <form className="sa-contact-form" onSubmit={handleSubmit} aria-labelledby="sa-form-title">
    <div className="sa-form-heading"><h3 id="sa-form-title">Tell me about your project.</h3><p>Share a few details to get the conversation started.</p></div>
    <fieldset className="sa-form-fields" disabled={status === 'sending'}>
      <div className="sa-form-row">
        <label className="sa-form-field"><span>Your name <span className="sa-required" aria-hidden="true">*</span></span><input name="name" type="text" autoComplete="name" placeholder="Your full name" required maxLength={100}/></label>
        <label className="sa-form-field"><span>Email address <span className="sa-required" aria-hidden="true">*</span></span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254}/></label>
      </div>
      <fieldset className="sa-form-services"><legend>I'm interested in <span className="sa-form-optional">Optional</span></legend><div className="sa-service-options">{services.map(service => <label className="sa-service-option" key={service}><input type="radio" name="service" value={service}/><span>{service}</span></label>)}</div></fieldset>
      <label className="sa-form-field"><span className="sa-field-label">Project details <span className="sa-required" aria-hidden="true">*</span></span><textarea name="message" placeholder="Tell me about your website, goals or timeline…" rows={4} required maxLength={3000}/></label>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" hidden/>
      <p className="sa-form-privacy">I use your name, email and project details to respond to your enquiry. Submissions are processed by <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">Web3Forms</a>. Please do not include passwords or confidential information.</p>
      <div className="sa-form-actions"><button type="submit" className="sa-form-submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button><p role="status" aria-live="polite" className={`sa-form-status is-${status}`}>{message}</p></div>
    </fieldset>
  </form>;
}
