import Image from 'next/image';
import React from 'react';

const FrameBottom = () => {
  return (
    <div className="fixed left-0 bottom-0 w-full pointer-events-none z-50">
      <Image src='/frame-bottom.png' width={375} height={28} alt='Zirolu' className='w-full' priority />
    </div>
  );
};

export default FrameBottom;
