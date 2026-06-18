declare module 'gsap-trial/SplitText' {
  export class SplitText {
    constructor(element: any, options?: any);
    chars: any[];
    words: any[];
    lines: any[];
    split(options?: any): SplitText;
    revert(): void;
  }
}

declare module 'gsap-trial/ScrollSmoother' {
  export class ScrollSmoother {
    static create(options?: any): ScrollSmoother;
    static refresh(force?: boolean): void;
    scrollTo(target: any, smooth?: boolean, position?: string): void;
    scrollTop(value?: number): number | void;
    paused(value?: boolean): boolean | void;
    kill(): void;
  }
}