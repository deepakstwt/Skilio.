import React from 'react'
import Title from './Title'
import { BookUserIcon } from 'lucide-react'

const Testimonial = () => {


    const testimonials = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Sarah Johnson',
            role: 'Software Engineer',
            text: 'Skilio helped me create a stunning resume that landed me my dream job at a top tech company. The AI suggestions were incredibly helpful!'
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Michael Chen',
            role: 'Marketing Manager',
            text: 'I\'ve tried many resume builders, but Skilio is by far the best. The templates are professional and the interface is so intuitive.'
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Emily Rodriguez',
            role: 'Product Designer',
            text: 'The customization options are amazing! I was able to create a resume that truly reflects my personal brand. Highly recommend!'
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'David Kim',
            role: 'Data Analyst',
            text: 'Got multiple interview calls within a week of using Skilio. The AI-powered content suggestions made all the difference.'
        },
    ];

    const CreateCard = ({ card, index }) => (
        <div className="group p-6 rounded-2xl mx-4 bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 w-80 shrink-0 shadow-md hover:-translate-y-1">
            <div className="flex items-start gap-4 mb-4">
                <img className="size-14 rounded-full object-cover border-3 border-blue-100 shadow-sm group-hover:border-blue-300 transition-colors" src={card.image} alt={card.name} />
                <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                        <p className="font-bold text-slate-800">{card.name}</p>
                        <svg className="fill-blue-500" width="14" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" />
                        </svg>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{card.role}</span>
                </div>
            </div>
            <div className="flex gap-1 mb-3">
                {Array(5).fill(0).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 fill-yellow-400">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                ))}
            </div>
            <p className="text-sm text-slate-700 leading-relaxed italic">&ldquo;{card.text}&rdquo;</p>
        </div>
    );


  return (
    <>
    <div id='testimonials' className='flex flex-col items-center py-20 scroll-mt-12 bg-gradient-to-b from-white via-slate-50/50 to-white'>
    <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-100/50 rounded-full px-6 py-2 border border-blue-200 shadow-sm">
        <BookUserIcon className="size-4 stroke-blue-600"/>
        <span className="font-semibold">Testimonials</span>
    </div>
    <Title title="Don't Just Take Our Word For It" description="Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review."/>
    </div>
    <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative py-10">
        <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] gap-4">
            {[...testimonials, ...testimonials].map((card, index) => (
                <CreateCard key={index} card={card} index={index} />
            ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent"></div>
    </div>

    <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative pb-10">
        <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] gap-4">
            {[...testimonials].reverse().map((card, index) => (
                <CreateCard key={`reverse-${index}`} card={card} index={index} />
            ))}
            {[...testimonials].reverse().map((card, index) => (
                <CreateCard key={`reverse-dup-${index}`} card={card} index={index} />
            ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent"></div>
    </div>
    <style>{`
    @keyframes marqueeScroll {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
    }

    .marquee-inner {
        animation: marqueeScroll 30s linear infinite;
    }

    .marquee-reverse {
        animation-direction: reverse;
        animation-duration: 35s;
    }

    .marquee-row:hover .marquee-inner {
        animation-play-state: paused;
    }
`}</style>

 </>
  )
}

export default Testimonial

