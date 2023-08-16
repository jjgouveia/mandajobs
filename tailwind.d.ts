// tailwind.d.ts
import 'tailwindcss/tailwind.css';

declare module 'tailwindcss/tailwind.css' {
    interface TailwindColors {
        dark: {
            background: string;
            text: string;
        };
        light: {
            background: string;
            text: string;
        };

    }

    interface TailwindColorVariants {
        dark: 'dark';
        light: 'light';
    }
}
