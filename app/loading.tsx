import React from "react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[8000] flex flex-col items-center justify-center bg-[#050505] text-white">
            {/* Subtle pulse animation for loading text */}
            <div className="z-10 text-xl font-share-tech tracking-widest text-[#2DE1FC] animate-pulse">
                Loading...
            </div>

            {/* Branding */}
            <div className="absolute bottom-10 font-contrail tracking-[0.3em] text-white/30 text-xs sm:text-sm uppercase">
                NOVAGRAPHY
            </div>
        </div>
    );
}
