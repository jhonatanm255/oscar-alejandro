import React from 'react';

// Wave divider — smooth flowing wave pointing down into the next section
export const WaveDown = ({ fill = '#ffffff', topFill = 'transparent' }) => (
  <div className="w-full overflow-hidden" style={{ lineHeight: 0, background: topFill }}>
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '60px' }}>
      <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,30 L1440,80 L0,80 Z" fill={fill}/>
    </svg>
  </div>
);

// Torn/jagged paper edge — like the cut-paper aesthetic from the Pinterest reference
export const TornEdge = ({ fill = '#ffffff', topFill = '#f3f4f6' }) => (
  <div className="w-full overflow-hidden" style={{ lineHeight: 0, background: topFill }}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '50px' }}>
      <path d="M0,30 L24,18 L48,34 L72,15 L96,32 L120,10 L150,28 L180,8 L210,25 L240,12 L280,30 L310,5 L345,22 L380,10 L420,28 L460,8 L500,25 L540,12 L580,30 L620,8 L660,25 L700,14 L740,32 L780,8 L820,26 L860,10 L900,28 L940,5 L980,22 L1020,10 L1060,30 L1100,8 L1140,24 L1180,10 L1220,28 L1260,8 L1300,25 L1340,12 L1380,30 L1420,15 L1440,22 L1440,60 L0,60 Z" fill={fill}/>
    </svg>
  </div>
);

export default WaveDown;
