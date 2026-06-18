declare module 'gsap/SplitText' {
  export class SplitText {
    constructor(element: any, options?: any);
    chars: any[];
    words: any[];
    lines: any[];
    split(options?: any): SplitText;
    revert(): void;
  }
}