"use client"

import { useEffect } from 'react';

export default function ColorModesClient() {
    useEffect(() => {
        // Ensure Bootstrap's JavaScript is available on the client side
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            require('@/public/js/color-modes.js');
        }
    }, []);

    return null;
}
