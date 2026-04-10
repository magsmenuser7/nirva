import { useState, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';

const goldRates = [
  { label: '9 KT Gold Rate (375)', rate: '₹5,220.00/g' },
  { label: '14 KT Gold Rate (585)', rate: '₹8,150.00/g' },
  { label: '18 KT Gold Rate (750)', rate: '₹11,418.00/g' },
  { label: '22 KT Gold Rate (916)', rate: '₹13,918.00/g' },
  { label: '24 KT Gold Rate (999)', rate: '₹15,790.00/g' },
];

export const GoldRateTicker = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    );
  }, []);

  const tickerContent = goldRates
    .map((g) => `${g.label} : ${g.rate}`)
    .join('     •     ');

  return (
    <div className="bg-navy-dark text-primary-foreground text-[11px] font-medium relative z-[51] overflow-hidden">
      <div className="flex items-center h-8">
        {/* Marquee */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap inline-block">
            <span className="inline-block px-4">
              {tickerContent}
              {'     •     '}
              {tickerContent}
            </span>
          </div>
        </div>

        {/* Contact */}
        <div className="hidden md:flex items-center gap-4 px-4 border-l border-primary-foreground/20 shrink-0">
          <span className="text-gold-light text-[10px]">{currentDate}</span>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1 hover:text-gold-light transition-colors"
          >
            <Phone className="w-3 h-3" />
          </a>
          <a
            href="mailto:info@nirva.in"
            className="flex items-center gap-1 hover:text-gold-light transition-colors"
          >
            <Mail className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
