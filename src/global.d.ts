// src/global.d.ts

interface TrelloPowerUp {
    iframe(): any;
    initialize(options: Record<string, unknown>): void;
}

interface Window {
    TrelloPowerUp: TrelloPowerUp;
}
