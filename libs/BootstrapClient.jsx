"use client"

import { useEffect } from 'react';

export default function BootstrapClient() {
    useEffect(() => {
        // Ensure Bootstrap's JavaScript is available on the client side
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

    return null;
}
